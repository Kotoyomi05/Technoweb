import React, { useMemo, useState } from 'react';

const MAX_EQUIPOS_POR_TECNICO = 3;

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

function formatFechaHora(fecha) {
  if (!fecha) return '—';
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return String(fecha);
  return d.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function normalizarNombre(valor = '') {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function esOrdenFinalizada(orden) {
  if (!orden) return false;
  if (orden.cerrada === true) return true;

  const estado = normalizarNombre(orden?.estado);
  const estadoFinal = normalizarNombre(orden?.estadoFinal);
  const combinado = `${estado} ${estadoFinal}`.trim();

  if (!combinado) return false;

  const tieneSeguimientoCierre = Array.isArray(orden?.seguimiento)
    ? orden.seguimiento.some((paso) =>
        normalizarNombre(paso?.titulo || paso?.accion).includes('orden cerrada')
      )
    : false;

  const coincideEstadoCerrado =
    combinado.includes('finaliz') ||
    combinado.includes('entregad') ||
    combinado.includes('cancel') ||
    combinado.includes('cerrad') ||
    combinado.includes('complet') ||
    combinado.includes('termin') ||
    combinado.includes('factur') ||
    combinado.includes('resuelt');

  return coincideEstadoCerrado || (tieneSeguimientoCierre && combinado.includes('finaliz'));
}

function esOrdenActiva(orden) {
  return !esOrdenFinalizada(orden);
}

function quitarCargoSiExiste(nombreRaw = '') {
  const texto = String(nombreRaw || '').trim();
  if (!texto) return 'Usuario';
  const sinParentesis = texto.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const partesGuion = sinParentesis.split(/\s+[-–—|]\s+/);
  return partesGuion[0]?.trim() || 'Usuario';
}

function getOrdenIdentificador(orden) {
  return String(orden?._id || orden?.idOrden || orden?.id || '').trim();
}

function construirEnlaceSeguimientoCliente(orden) {
  const id = String(orden?.idOrden || orden?._id || orden?.id || '').trim();
  if (!id) return '';
  try {
    const url = new URL(window.location.href);
    url.searchParams.set('orden', id);
    return url.toString();
  } catch {
    return `?orden=${encodeURIComponent(id)}`;
  }
}

export default function DetalleOrdenView({
  orden,
  currentUser,
  users = [],
  ordenes = [],
  onAssignTecnico,
  onBack,
  onOpenDiagnostico,
  onOpenGestionarRepuestos,
  onRegistrarCierre,
}) {
  const [showClienteModal, setShowClienteModal] = useState(false);
  const [showTecnicoModal, setShowTecnicoModal] = useState(false);
  const [selectedTecnicoId, setSelectedTecnicoId] = useState('');
  const [assignFeedback, setAssignFeedback] = useState('');
  const [enlaceCopiado, setEnlaceCopiado] = useState(false);

  const ordenData = orden || {};
  const ordenFinalizada = esOrdenFinalizada(ordenData);
  const rolActualNorm = normalizarNombre(currentUser?.rol);
  const esAdmin = !rolActualNorm || rolActualNorm.includes('admin');
  const esTecnico = rolActualNorm.includes('tecn');
  const esCliente = rolActualNorm.includes('client');

  const idOrdenDisplay = ordenData.idOrden || ordenData._id || '—';
  const fechaCreacionDisplay = formatFechaCorta(ordenData.fechaCreacion || ordenData.createdAt);
  const estadoLimpioTexto = String(ordenData.estado || 'EN PROCESO - Ingresado')
    .replace(/^\[|\]$/g, '')
    .trim();
  const estadoDisplay = ordenFinalizada
    ? estadoLimpioTexto || 'FINALIZADO - ENTREGADO'
    : estadoLimpioTexto;

  const nombreClienteDisplay =
    ordenData.cliente || ordenData.nombreCliente || 'Cliente no especificado';
  const telefonoClienteDisplay =
    ordenData.telefonoCliente || ordenData.telefono || 'No registrado';
  const correoClienteDisplay =
    ordenData.correoCliente || ordenData.emailCliente || ordenData.correo || 'No registrado';
  const idRegistroOrdenDisplay = ordenData._id || ordenData.idOrden || '—';

  const tecnicoRaw = ordenData.tecnicoAsignado || '';
  const tecnicoNorm = normalizarNombre(tecnicoRaw);
  const tieneTecnicoAsignado =
    Boolean(tecnicoNorm) &&
    tecnicoNorm !== '[sin asignar]' &&
    tecnicoNorm !== 'sin asignar';

  const tecnicoAsignadoNombre = tieneTecnicoAsignado ? String(tecnicoRaw).trim() : '[Sin Asignar]';

  const esOrdenDeEsteTecnico =
    esTecnico &&
    Boolean(normalizarNombre(currentUser?.nombre)) &&
    tecnicoNorm === normalizarNombre(currentUser?.nombre);

  const esOrdenDeEsteCliente =
    esCliente &&
    ((Boolean(normalizarNombre(currentUser?.email)) &&
      normalizarNombre(
        ordenData.correoCliente || ordenData.emailCliente || ordenData.correo
      ) === normalizarNombre(currentUser?.email)) ||
      (Boolean(normalizarNombre(currentUser?.nombre)) &&
        normalizarNombre(nombreClienteDisplay) === normalizarNombre(currentUser?.nombre)));

  const puedeGestionarOrden = esAdmin || esOrdenDeEsteTecnico;

  const enlaceCliente = construirEnlaceSeguimientoCliente(ordenData);

  const handleCopiarEnlaceCliente = async () => {
    if (!enlaceCliente) return;
    try {
      await navigator.clipboard.writeText(enlaceCliente);
      setEnlaceCopiado(true);
      setTimeout(() => setEnlaceCopiado(false), 2500);
    } catch {
      setEnlaceCopiado(false);
    }
  };

  const tecnicosDisponibles = useMemo(() => {
    return (Array.isArray(users) ? users : []).filter((u) => {
      const rolLower = normalizarNombre(u?.rol);
      return rolLower.includes('tecn');
    });
  }, [users]);

  const getOrdenesActivasTecnico = (tecnicoNombre) => {
    const cleanTarget = normalizarNombre(tecnicoNombre);
    if (!cleanTarget) return [];

    const vistas = new Set();
    return (Array.isArray(ordenes) ? ordenes : []).filter((item) => {
      const asignado = normalizarNombre(item?.tecnicoAsignado);
      if (asignado !== cleanTarget || !esOrdenActiva(item)) return false;
      const key = getOrdenIdentificador(item);
      if (key) {
        if (vistas.has(key)) return false;
        vistas.add(key);
      }
      return true;
    });
  };

  const perfilTecnicoActual = useMemo(() => {
    if (!tieneTecnicoAsignado) return null;

    const matchUser = tecnicosDisponibles.find(
      (t) => normalizarNombre(t?.nombre) === normalizarNombre(tecnicoAsignadoNombre)
    );

    const ordenesACargo = getOrdenesActivasTecnico(tecnicoAsignadoNombre);
    const estaLleno = ordenesACargo.length >= MAX_EQUIPOS_POR_TECNICO;

    return {
      nombre: matchUser?.nombre || tecnicoAsignadoNombre,
      computadoresACargo: ordenesACargo.map((o) => ({
        id: o.idOrden || o._id,
        equipo: [o.tipoEquipo, o.marca, o.modelo].filter(Boolean).join(' ') || 'Equipo',
        estado: String(o.estado || 'En Proceso').replace(/^\[|\]$/g, '').trim(),
      })),
      cantidadACargo: ordenesACargo.length,
      estadoDisponibilidad: estaLleno
        ? `Ocupado (${ordenesACargo.length}/${MAX_EQUIPOS_POR_TECNICO})`
        : `Disponible (${ordenesACargo.length}/${MAX_EQUIPOS_POR_TECNICO})`,
      sede: matchUser?.direccion || matchUser?.sede || matchUser?.taller || 'No especificada',
    };
  }, [tieneTecnicoAsignado, tecnicoAsignadoNombre, tecnicosDisponibles, ordenes]);

  const handleConfirmarAsignacion = (e) => {
    e.preventDefault();
    setAssignFeedback('');

    if (!esAdmin) {
      setAssignFeedback('Solo un Administrador puede asignar técnicos a una orden.');
      return;
    }

    if (ordenFinalizada) {
      setAssignFeedback('Esta orden ya está finalizada y no admite nuevas asignaciones.');
      return;
    }

    if (tieneTecnicoAsignado) {
      setAssignFeedback(
        `Este computador ya tiene asignado a ${tecnicoAsignadoNombre}. No se puede asignar otro técnico.`
      );
      return;
    }

    if (!selectedTecnicoId) {
      setAssignFeedback('Selecciona un técnico disponible para asignar.');
      return;
    }

    const tecnicoElegido = tecnicosDisponibles.find(
      (t) => String(t.id || t._id) === String(selectedTecnicoId)
    );
    if (!tecnicoElegido) return;

    const activasTecnico = getOrdenesActivasTecnico(tecnicoElegido.nombre);
    if (activasTecnico.length >= MAX_EQUIPOS_POR_TECNICO) {
      setAssignFeedback(
        `${tecnicoElegido.nombre} ya alcanzó el máximo de ${MAX_EQUIPOS_POR_TECNICO} equipos activos a la vez. Podrá recibir otro cuando finalice alguno.`
      );
      return;
    }

    const nuevaCarga = activasTecnico.length + 1;
    const seguimientoPrevio = Array.isArray(ordenData.seguimiento) ? ordenData.seguimiento : [];
    const nuevoEventoAsignacion = {
      id: `asig-${Date.now()}`,
      fecha: new Date().toISOString(),
      titulo: `Técnico asignado: ${tecnicoElegido.nombre}`,
      responsable: quitarCargoSiExiste(currentUser?.nombre || 'Usuario'),
    };

    const ordenConSeguimiento = {
      ...ordenData,
      tecnicoAsignado: tecnicoElegido.nombre,
      seguimiento: [...seguimientoPrevio, nuevoEventoAsignacion],
    };

    if (onAssignTecnico) {
      onAssignTecnico(ordenConSeguimiento, tecnicoElegido.nombre);
    }
    setSelectedTecnicoId('');
    setAssignFeedback(
      `Técnico ${tecnicoElegido.nombre} asignado (${nuevaCarga}/${MAX_EQUIPOS_POR_TECNICO} equipos activos).`
    );
  };

  const partesEquipo = [
    ordenData.tipoEquipo,
    ordenData.marca ? `Marca: ${ordenData.marca}` : '',
    ordenData.modelo ? `Modelo: ${ordenData.modelo}` : '',
    ordenData.numeroSerie ? `S/N: ${ordenData.numeroSerie}` : '',
  ].filter(Boolean);

  const datosEquipoDisplay =
    partesEquipo.length > 0 ? partesEquipo.join(' | ') : 'Datos del equipo no registrados';

  const fallaReportadaDisplay =
    ordenData.descripcionFalla || ordenData.fallaReportada || 'Sin descripción de falla registrada.';

  const creadorOrdenNombre = quitarCargoSiExiste(
    ordenData.creadoPor ||
      ordenData.usuarioCreador ||
      ordenData.creador ||
      currentUser?.nombre ||
      'Usuario'
  );

  const fechaEventoCreacion = formatFechaHora(
    ordenData.fechaCreacion || ordenData.createdAt || new Date()
  );

  const pasosAdicionales = Array.isArray(ordenData.seguimiento)
    ? ordenData.seguimiento.filter((paso) => {
        const titulo = normalizarNombre(paso?.titulo || paso?.accion);
        return !titulo.includes('orden creada');
      })
    : [];

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver a Órdenes</span>
      </button>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
          DETALLE COMPLETO DE ORDEN DE SERVICIO
        </h1>

        {!esCliente && enlaceCliente && (
          <button
            type="button"
            onClick={handleCopiarEnlaceCliente}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition cursor-pointer"
          >
            {enlaceCopiado ? '✓ Enlace del cliente copiado' : 'Copiar enlace cliente'}
          </button>
        )}
      </div>

      {esCliente && !esOrdenDeEsteCliente && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-xs font-medium">
          Solo puedes consultar el seguimiento de tus propios dispositivos registrados.
        </div>
      )}

      {esTecnico && !esOrdenDeEsteTecnico && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-xs font-medium">
          Esta orden no está asignada a tu cargo. Como técnico, solo puedes modificar las órdenes
          asignadas a ti.
        </div>
      )}

      <div className="space-y-6">
        {/* Card 1: Información General y Estado */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <h3 className="font-semibold text-gray-900 text-base">
              Información General y Estado
            </h3>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium self-start sm:self-auto ${
                ordenFinalizada
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-800 text-white'
              }`}
            >
              {estadoDisplay}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-500 font-semibold uppercase block">ID Orden:</span>
              <p className="text-gray-900 font-bold text-sm mt-0.5">{idOrdenDisplay}</p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold uppercase block">Fecha Creación:</span>
              <p className="text-gray-800 font-medium mt-0.5">{fechaCreacionDisplay}</p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold uppercase block">Cliente:</span>
              <p className="text-gray-900 font-semibold mt-0.5">
                {nombreClienteDisplay}{' '}
                {!esCliente && (
                  <button
                    type="button"
                    onClick={() => setShowClienteModal(true)}
                    className="text-blue-600 hover:underline font-normal text-[11px] cursor-pointer ml-0.5"
                  >
                    (ver detalle)
                  </button>
                )}
              </p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold uppercase block">
                Técnico Asignado:
              </span>
              <p className="text-gray-900 font-semibold mt-0.5">
                {tecnicoAsignadoNombre}{' '}
                {tieneTecnicoAsignado && !esCliente && (
                  <button
                    type="button"
                    onClick={() => setShowTecnicoModal(true)}
                    className="text-blue-600 hover:underline font-normal text-[11px] cursor-pointer ml-0.5"
                  >
                    (ver perfil)
                  </button>
                )}
              </p>
            </div>
          </div>

          {esAdmin && !tieneTecnicoAsignado && !ordenFinalizada ? (
            <div className="pt-3 border-t border-gray-100">
              <form
                onSubmit={handleConfirmarAsignacion}
                className="flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs"
              >
                <label className="font-semibold text-gray-700">Asignar Técnico:</label>
                <select
                  value={selectedTecnicoId}
                  onChange={(e) => {
                    setSelectedTecnicoId(e.target.value);
                    setAssignFeedback('');
                  }}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar técnico disponible...</option>
                  {tecnicosDisponibles.map((tec) => {
                    const cargaActual = getOrdenesActivasTecnico(tec.nombre).length;
                    const estaLleno = cargaActual >= MAX_EQUIPOS_POR_TECNICO;
                    return (
                      <option
                        key={tec.id || tec._id}
                        value={tec.id || tec._id}
                        disabled={estaLleno}
                      >
                        {tec.nombre} —{' '}
                        {estaLleno
                          ? `Ocupado (${cargaActual}/${MAX_EQUIPOS_POR_TECNICO})`
                          : `Disponible (${cargaActual}/${MAX_EQUIPOS_POR_TECNICO})`}
                      </option>
                    );
                  })}
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3.5 py-1.5 rounded-lg transition cursor-pointer"
                >
                  Asignar
                </button>
              </form>
              {assignFeedback && (
                <p className="text-[11px] font-medium text-gray-700 mt-2">{assignFeedback}</p>
              )}
            </div>
          ) : (
            esAdmin &&
            tieneTecnicoAsignado && (
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-800">Supervisión de asignación:</span>{' '}
                  Equipo asignado a{' '}
                  <span className="font-semibold text-gray-900">{tecnicoAsignadoNombre}</span> (
                  {perfilTecnicoActual?.estadoDisponibilidad ||
                    `Disponible (0/${MAX_EQUIPOS_POR_TECNICO})`}
                  ).
                </p>
                <button
                  type="button"
                  onClick={() => setShowTecnicoModal(true)}
                  className="text-blue-600 hover:underline font-semibold cursor-pointer"
                >
                  Ver estado del técnico
                </button>
              </div>
            )
          )}
        </div>

        {/* Card 2: Grid Datos del Equipo y Falla Reportada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">
              Datos del Equipo
            </h3>
            <p className="text-xs text-gray-800 font-medium leading-relaxed pt-1">
              {datosEquipoDisplay}
            </p>
            {ordenData.observacionesAccesorios && (
              <p className="text-[11px] text-gray-600 pt-1">
                <span className="font-semibold text-gray-700">Observaciones / Accesorios:</span>{' '}
                {ordenData.observacionesAccesorios}
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">
              Falla Reportada
            </h3>
            <p className="text-xs text-gray-800 font-medium leading-relaxed pt-1">
              {fallaReportadaDisplay}
            </p>
          </div>
        </div>

        {/* Card 3: Seguimiento y Acciones */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Seguimiento y Acciones
          </h3>

          <div className="relative pl-6 space-y-4 text-xs border-l-2 border-gray-200 ml-2">
            <div className="relative">
              <span className="absolute -left-[31px] top-0.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-500 font-medium">1</span>
                <span className="text-gray-600 font-medium">{fechaEventoCreacion}</span>
                <span className="text-gray-900 font-semibold">
- Orden creada ({creadorOrdenNombre})
                </span>
              </div>
            </div>

            {pasosAdicionales.map((paso, idx) => (
              <div key={paso._id || paso.id || idx} className="relative">
                <span className="absolute -left-[31px] top-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500 font-medium">{idx + 2}</span>
                  <span className="text-gray-600 font-medium">
                    {formatFechaHora(paso.fecha)}
                  </span>
                  <span className="text-gray-900 font-semibold">
- {String(paso.titulo || paso.accion || '').replace(/\[|\]/g, '')}
                    {paso.responsable ? ` (${quitarCargoSiExiste(paso.responsable)})` : ''}
                  </span>
                </div>
                {paso.notaTecnica && (
                  <p className="text-gray-700 font-medium mt-1 pl-4 text-[11px] italic">
                    <span className="font-bold not-italic text-gray-900">*Nota Técnica:</span>{' '}
                    {paso.notaTecnica}
                  </p>
                )}
              </div>
            ))}
          </div>

          {!esCliente && (
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase">Acciones Disponibles</h4>

              {ordenFinalizada ? (
                <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3.5 py-2 font-medium">
                  Esta orden ya se encuentra finalizada/cerrada. No se permiten nuevos diagnósticos,
                  repuestos ni cierres.
                </p>
              ) : !puedeGestionarOrden ? (
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3.5 py-2 font-medium">
                  No tienes permisos para modificar esta orden porque no está asignada a tu cargo.
                </p>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenDiagnostico}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer uppercase tracking-wider"
                  >
                    PF-04: REGISTRAR DIAGNÓSTICO / AVANCE
                  </button>

                  <button
                    type="button"
                    onClick={onOpenGestionarRepuestos}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer uppercase tracking-wider"
                  >
                    PF-05: SOLICITAR REPUESTOS / PRESUPUESTO
                  </button>

                  <button
                    type="button"
                    onClick={onRegistrarCierre}
                    className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer uppercase tracking-wider"
                  >
                    PF-14: CERRAR ORDEN Y FACTURAR
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showClienteModal && !esCliente && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <h4 className="font-bold text-gray-900 text-sm">Detalle del Cliente</h4>
              <button
                type="button"
                onClick={() => setShowClienteModal(false)}
                className="text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  ID Registro:
                </span>
                <p className="text-gray-900 font-medium mt-0.5">{idRegistroOrdenDisplay}</p>
              </div>
              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  Nombre Completo:
                </span>
                <p className="text-gray-900 font-semibold mt-0.5">{nombreClienteDisplay}</p>
              </div>
              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  Teléfono:
                </span>
                <p className="text-gray-800 font-medium mt-0.5">{telefonoClienteDisplay}</p>
              </div>
              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  Correo Electrónico:
                </span>
                <p className="text-gray-800 font-medium mt-0.5">{correoClienteDisplay}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowClienteModal(false)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {showTecnicoModal && perfilTecnicoActual && !esCliente && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <h4 className="font-bold text-gray-900 text-sm">Perfil del Técnico</h4>
              <button
                type="button"
                onClick={() => setShowTecnicoModal(false)}
                className="text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  Nombre:
                </span>
                <p className="text-gray-900 font-semibold mt-0.5">{perfilTecnicoActual.nombre}</p>
              </div>

              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  Estado:
                </span>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                    perfilTecnicoActual.cantidadACargo >= MAX_EQUIPOS_POR_TECNICO
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {perfilTecnicoActual.estadoDisponibilidad}
                </span>
              </div>

              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  Sede:
                </span>
                <p className="text-gray-800 font-medium mt-0.5">{perfilTecnicoActual.sede}</p>
              </div>

              <div>
                <span className="text-gray-500 font-semibold uppercase block text-[10px]">
                  Computadores a cargo ({perfilTecnicoActual.cantidadACargo}/
                  {MAX_EQUIPOS_POR_TECNICO}):
                </span>
                {perfilTecnicoActual.computadoresACargo.length === 0 ? (
                  <p className="text-gray-600 mt-0.5">Ninguno asignado actualmente</p>
                ) : (
                  <ul className="mt-1 space-y-1 list-disc list-inside text-gray-800">
                    {perfilTecnicoActual.computadoresACargo.map((item) => (
                      <li key={item.id}>
                        <span className="font-semibold">{item.id}</span> — {item.equipo} ({item.estado})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTecnicoModal(false)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}