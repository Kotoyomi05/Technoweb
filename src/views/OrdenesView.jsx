import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';
const ORDENES_STORAGE_KEY = 'techservice_ordenes';

function normalizarTexto(valor = '') {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function formatFechaCorta(fecha) {
  if (!fecha) return '—';
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return String(fecha);
  return d.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function esOrdenFinalizadaLocal(orden) {
  if (!orden) return false;
  if (orden.cerrada === true) return true;
  const val = `${orden?.estado || ''} ${orden?.estadoFinal || ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return (
    val.includes('finaliz') ||
    val.includes('entregad') ||
    val.includes('cerrad') ||
    val.includes('complet') ||
    val.includes('termin') ||
    val.includes('factur') ||
    val.includes('resuelt')
  );
}

function normalizarCategoriaEstado(ordenOrEstado) {
  const ordenObj =
    typeof ordenOrEstado === 'object' && ordenOrEstado !== null ? ordenOrEstado : null;
  if (ordenObj && esOrdenFinalizadaLocal(ordenObj)) {
    return 'Finalizada';
  }

  const estadoRaw = ordenObj ? ordenObj.estado : ordenOrEstado;
  const val = String(estadoRaw || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (val.includes('pendiente')) return 'Pendiente';
  if (val.includes('proceso') || val.includes('ingresado') || val.includes('diagn')) {
    return 'En Proceso';
  }
  if (
    val.includes('finaliz') ||
    val.includes('reparado') ||
    val.includes('entregad') ||
    val.includes('cerrad')
  ) {
    return 'Finalizada';
  }
  if (val.includes('cancel')) return 'Cancelada';
  return estadoRaw || 'Sin Estado';
}

function puedeVerOrden(orden, currentUser) {
  const rol = normalizarTexto(currentUser?.rol);
  if (!rol || rol.includes('admin')) return true;

  if (rol.includes('tecn')) {
    const miNombre = normalizarTexto(currentUser?.nombre);
    const asignado = normalizarTexto(orden?.tecnicoAsignado);
    return Boolean(miNombre) && asignado === miNombre;
  }

  if (rol.includes('client')) {
    const miCorreo = normalizarTexto(currentUser?.email);
    const miNombre = normalizarTexto(currentUser?.nombre);
    const correoOrden = normalizarTexto(
      orden?.correoCliente || orden?.emailCliente || orden?.correo
    );
    const clienteOrden = normalizarTexto(orden?.cliente || orden?.nombreCliente);
    return (
      (Boolean(miCorreo) && correoOrden === miCorreo) ||
      (Boolean(miNombre) && clienteOrden === miNombre)
    );
  }

  return false;
}

function leerOrdenesLocal() {
  try {
    const saved = localStorage.getItem(ORDENES_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function aplicarFiltrosLocales(
  lista,
  { search = '', estado = 'Todas', desde = '', hasta = '', currentUser = null }
) {
  const q = String(search || '').trim().toLowerCase();
  const timeDesde = desde ? new Date(`${desde}T00:00:00`).getTime() : null;
  const timeHasta = hasta ? new Date(`${hasta}T23:59:59`).getTime() : null;

  return (Array.isArray(lista) ? lista : []).filter((o) => {
    if (!puedeVerOrden(o, currentUser)) return false;

    const categoria = normalizarCategoriaEstado(o);

    if ((!estado || estado === 'Todas') && categoria === 'Finalizada') {
      return false;
    }

    if (q) {
      const idStr = String(o?.idOrden || o?._id || '').toLowerCase();
      const clienteStr = String(o?.cliente || o?.nombreCliente || '').toLowerCase();
      if (!idStr.includes(q) && !clienteStr.includes(q)) return false;
    }

    if (estado && estado !== 'Todas') {
      if (categoria !== estado) return false;
    }

    if (timeDesde || timeHasta) {
      const f = o?.fechaCreacion ? new Date(o.fechaCreacion).getTime() : NaN;
      if (!Number.isNaN(f)) {
        if (timeDesde && f < timeDesde) return false;
        if (timeHasta && f > timeHasta) return false;
      }
    }

    return true;
  });
}

export default function OrdenesView({
  currentUser = null,
  ordenes: ordenesProp = [],
  onSyncOrdenes,
  onViewDetail,
  onNewOrder,
  cancelMessage = false,
  onDismissMessage,
}) {
  const fuenteBase = useMemo(() => {
    if (Array.isArray(ordenesProp) && ordenesProp.length > 0) return ordenesProp;
    return leerOrdenesLocal();
  }, [ordenesProp]);

  const fuenteBaseRef = useRef(fuenteBase);
  fuenteBaseRef.current = fuenteBase;

  const onSyncRef = useRef(onSyncOrdenes);
  onSyncRef.current = onSyncOrdenes;

  const ordenesPermitidasBase = useMemo(
    () => fuenteBase.filter((o) => puedeVerOrden(o, currentUser)),
    [fuenteBase, currentUser]
  );

  const [ordenes, setOrdenes] = useState(() =>
    aplicarFiltrosLocales(fuenteBase, { estado: 'Todas', currentUser })
  );
  const [loading, setLoading] = useState(false);
  const [dbError, setDbError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('Todas');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  const rolNorm = normalizarTexto(currentUser?.rol);
  const esTecnico = rolNorm.includes('tecn');
  const esCliente = rolNorm.includes('client');

  const resumen = useMemo(() => {
    return {
      total: ordenesPermitidasBase.length,
      pendientes: ordenesPermitidasBase.filter(
        (o) => normalizarCategoriaEstado(o) === 'Pendiente'
      ).length,
      enProceso: ordenesPermitidasBase.filter(
        (o) => normalizarCategoriaEstado(o) === 'En Proceso'
      ).length,
      finalizadas: ordenesPermitidasBase.filter(
        (o) => normalizarCategoriaEstado(o) === 'Finalizada'
      ).length,
    };
  }, [ordenesPermitidasBase]);

  useEffect(() => {
    setOrdenes(
      aplicarFiltrosLocales(fuenteBase, {
        search: searchTerm,
        estado: estadoFilter,
        desde: fechaDesde,
        hasta: fechaHasta,
        currentUser,
      })
    );
  }, [fuenteBase, searchTerm, estadoFilter, fechaDesde, fechaHasta, currentUser]);

  const consultarBackend = useCallback(async ({ search, estado, desde, hasta }, mostrarSpinner = false) => {
    if (mostrarSpinner) setLoading(true);
    setDbError('');

    try {
      const params = new URLSearchParams();
      if (search && search.trim()) params.set('search', search.trim());
      if (estado && estado !== 'Todas') params.set('estado', estado);
      if (desde) params.set('desde', desde);
      if (hasta) params.set('hasta', hasta);

      const queryString = params.toString();
      const url = queryString ? `${API_URL}/ordenes?${queryString}` : `${API_URL}/ordenes`;

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const remotas = Array.isArray(data) ? data : data.ordenes || [];
      if (remotas.length > 0) {
        const mapa = new Map();
        (fuenteBaseRef.current || []).forEach((o) => mapa.set(String(o._id || o.idOrden), o));
        remotas.forEach((o) => {
          const k = String(o._id || o.idOrden);
          const previa = mapa.get(k);
          const yaCerradaLocal = previa && esOrdenFinalizadaLocal(previa);
          const tecnicoPrevio = String(previa?.tecnicoAsignado || '').trim();
          const tecnicoRemoto = String(o?.tecnicoAsignado || '').trim();
          const tieneTecnicoRemoto =
            Boolean(tecnicoRemoto) &&
            tecnicoRemoto.toLowerCase() !== '[sin asignar]' &&
            tecnicoRemoto.toLowerCase() !== 'sin asignar';

          mapa.set(k, {
            ...o,
            ...previa,
            estado: yaCerradaLocal ? previa.estado : o.estado || previa?.estado,
            estadoFinal: yaCerradaLocal
              ? previa.estadoFinal || previa.estado
              : o.estadoFinal || previa?.estadoFinal,
            cerrada: yaCerradaLocal ? true : Boolean(o.cerrada),
            tecnicoAsignado: tieneTecnicoRemoto
              ? tecnicoRemoto
              : tecnicoPrevio || o.tecnicoAsignado || '',
          });
        });
        const combinadas = Array.from(mapa.values());
        if (onSyncRef.current) onSyncRef.current(combinadas);
      }
    } catch {
      // Si falla la red o el backend, se mantienen los datos locales
    } finally {
      if (mostrarSpinner) setLoading(false);
    }
  }, []);

  useEffect(() => {
    consultarBackend({ search: '', estado: 'Todas', desde: '', hasta: '' }, false);
  }, [consultarBackend]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    consultarBackend(
      { search: searchTerm, estado: estadoFilter, desde: fechaDesde, hasta: fechaHasta },
      true
    );
  };

  const handleClearFilters = () => {
    const reset = { search: '', estado: 'Todas', desde: '', hasta: '' };
    setSearchTerm('');
    setEstadoFilter('Todas');
    setFechaDesde('');
    setFechaHasta('');
    consultarBackend(reset, false);
  };

  const filteredSummary = useMemo(() => {
    return {
      mostradas: ordenes.length,
      pendientes: ordenes.filter((o) => normalizarCategoriaEstado(o) === 'Pendiente').length,
      enProceso: ordenes.filter((o) => normalizarCategoriaEstado(o) === 'En Proceso').length,
      finalizadas: ordenes.filter((o) => normalizarCategoriaEstado(o) === 'Finalizada').length,
    };
  }, [ordenes]);

  const handleExportCSV = () => {
    if (ordenes.length === 0) return;

    const headers = [
      'ID Orden',
      'Fecha Creacion',
      'Cliente',
      'Estado',
      'Tecnico Asignado',
    ];

    const escapeCell = (val) => {
      const str = String(val ?? '');
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = ordenes.map((o) =>
      [
        escapeCell(o.idOrden || o._id || ''),
        escapeCell(formatFechaCorta(o.fechaCreacion)),
        escapeCell(o.cliente || ''),
        escapeCell(o.estado || ''),
        escapeCell(o.tecnicoAsignado || '[Sin Asignar]'),
      ].join(',')
    );

    const csvContent = '\uFEFF' + [headers.map(escapeCell).join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reporte-ordenes-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    if (ordenes.length === 0) return;

    const printWindow = window.open('', '_blank', 'width=900,height=650');
    if (!printWindow) return;

    const rowsHtml = ordenes
      .map(
        (o) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb;">${o.idOrden || o._id || '—'}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${formatFechaCorta(o.fechaCreacion)}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${o.cliente || '—'}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${o.estado || '—'}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${o.tecnicoAsignado || '[Sin Asignar]'}</td>
        </tr>
      `
      )
      .join('');

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Reporte de Órdenes - TechService Web</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #111827; }
            h1 { font-size: 18px; margin-bottom: 4px; }
            p { font-size: 12px; color: #4b5563; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
            th { background: #f3f4f6; text-align: left; padding: 8px; border: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <h1>Reporte de Órdenes — TechService Web</h1>
          <p>Generado el ${new Date().toLocaleString('es-CO')} • Total registros: ${ordenes.length}</p>
          <table>
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Fecha Creación</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Técnico Asignado</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase block">
            OPERACIÓN DEL TALLER • MONGODB
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">
            {esTecnico
              ? 'MIS ÓRDENES ASIGNADAS'
              : esCliente
              ? 'SEGUIMIENTO DE MIS EQUIPOS'
              : 'GESTIÓN DE ÓRDENES'}
          </h1>
        </div>

        {onNewOrder && !esCliente && (
          <button
            type="button"
            onClick={onNewOrder}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition cursor-pointer"
          >
            + Nueva Orden
          </button>
        )}
      </div>

      {cancelMessage && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-xs font-medium flex items-center justify-between">
          <span>La creación de la orden fue cancelada.</span>
          {onDismissMessage && (
            <button
              type="button"
              onClick={onDismissMessage}
              className="text-amber-900 font-bold ml-4 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {dbError && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
          {dbError}
        </div>
      )}

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            Resumen de Órdenes
          </h2>
          <span className="text-[11px] text-gray-500">
            Mostrando {filteredSummary.mostradas} de {resumen.total}{' '}
            {esTecnico ? 'asignadas a ti' : esCliente ? 'tuyas' : 'registradas'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
            <span className="text-[11px] font-bold text-gray-500 uppercase">Total General</span>
            <p className="text-lg font-extrabold text-gray-900 mt-0.5">{resumen.total}</p>
          </div>
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3">
            <span className="text-[11px] font-bold text-amber-700 uppercase">Pendientes</span>
            <p className="text-lg font-extrabold text-amber-800 mt-0.5">{resumen.pendientes}</p>
          </div>
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3">
            <span className="text-[11px] font-bold text-blue-700 uppercase">En Proceso</span>
            <p className="text-lg font-extrabold text-blue-800 mt-0.5">{resumen.enProceso}</p>
          </div>
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3">
            <span className="text-[11px] font-bold text-emerald-700 uppercase">Finalizadas</span>
            <p className="text-lg font-extrabold text-emerald-800 mt-0.5">{resumen.finalizadas}</p>
          </div>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
        <h2 className="text-base font-bold text-gray-900">
          {esTecnico
            ? 'Órdenes a tu cargo'
            : esCliente
            ? 'Mis Órdenes de Servicio'
            : 'Listado General de Órdenes'}
        </h2>

        <form
          onSubmit={handleFilterSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end text-xs"
        >
          <div className="md:col-span-4">
            <label className="block font-semibold text-gray-700 mb-1">
              Buscar por ID o Cliente
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej. 3807 o Ana García"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block font-semibold text-gray-700 mb-1">Filtrar por Estado</label>
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todas">Todas (activas)</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block font-semibold text-gray-700 mb-1">Rango de Fecha</label>
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-[11px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-gray-400">a</span>
              <input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-[11px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition cursor-pointer"
            >
              Filtrar
            </button>
            <button
              type="button"
              onClick={handleClearFilters}
              title="Limpiar filtros"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-2.5 rounded-lg transition cursor-pointer"
            >
              ↺
            </button>
          </div>
        </form>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase">
                <th className="py-2.5 px-3">ID Orden</th>
                <th className="py-2.5 px-3">Fecha Creación</th>
                <th className="py-2.5 px-3">Cliente</th>
                <th className="py-2.5 px-3">Estado</th>
                <th className="py-2.5 px-3">Técnico Asignado</th>
                <th className="py-2.5 px-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && ordenes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Cargando órdenes...
                  </td>
                </tr>
              ) : ordenes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    {esTecnico
                      ? 'No tienes órdenes activas asignadas en este momento.'
                      : esCliente
                      ? 'No tienes dispositivos/órdenes registradas a tu nombre.'
                      : resumen.finalizadas > 0 && estadoFilter === 'Todas'
                      ? `No hay órdenes activas en este momento (${resumen.finalizadas} finalizada). Cambia el filtro a "Finalizada" para ver el historial.`
                      : 'Aún no hay órdenes registradas para este filtro. Crea una desde "+ Nueva Orden".'}
                  </td>
                </tr>
              ) : (
                ordenes.map((orden) => {
                  const autorizado = puedeVerOrden(orden, currentUser);
                  return (
                    <tr key={orden._id || orden.idOrden} className="hover:bg-gray-50/70">
                      <td className="py-3 px-3 font-semibold text-gray-900">
                        {orden.idOrden || orden._id}
                      </td>
                      <td className="py-3 px-3 text-gray-700">
                        {formatFechaCorta(orden.fechaCreacion)}
                      </td>
                      <td className="py-3 px-3 text-gray-800 font-medium">{orden.cliente}</td>
                      <td className="py-3 px-3 text-gray-700">{orden.estado}</td>
                      <td className="py-3 px-3 text-gray-600">
                        {orden.tecnicoAsignado || '[Sin Asignar]'}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap space-x-2 text-xs font-medium">
                        {onViewDetail && autorizado ? (
                          <button
                            type="button"
                            onClick={() => onViewDetail(orden)}
                            className="text-blue-600 hover:underline cursor-pointer"
                          >
                            {esCliente ? '[Ver Seguimiento]' : '[Ver Detalle]'}
                          </button>
                        ) : (
                          <span className="text-gray-400 italic">Restringido</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleExportPDF}
          disabled={ordenes.length === 0}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white shadow-sm transition cursor-pointer disabled:cursor-not-allowed"
        >
          Exportar Reporte (PDF)
        </button>

        <button
          type="button"
          onClick={handleExportCSV}
          disabled={ordenes.length === 0}
          className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-800 border border-gray-300 transition cursor-pointer disabled:cursor-not-allowed"
        >
          Exportar a CSV
        </button>
      </section>
    </main>
  );
}