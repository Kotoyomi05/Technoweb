import React, { useState, useMemo } from 'react';
import { usersList } from '../data/userData';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';

function normalizarTexto(valor = '') {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function construirEnlaceSeguimiento(idOrden) {
  const cleanId = String(idOrden || '').trim();
  if (!cleanId) return '';
  try {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('orden', cleanId);
    return url.toString();
  } catch {
    return `${window.location.origin}/?orden=${encodeURIComponent(cleanId)}`;
  }
}

export default function NuevaOrdenView({
  currentUser,
  users = usersList,
  onRegistrarCliente,
  onBack,
  onSaveSuccess,
}) {
  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');
  const [ubicacionCliente, setUbicacionCliente] = useState('');

  const [tipoEquipo, setTipoEquipo] = useState('Laptop');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [descripcionFalla, setDescripcionFalla] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [estadoInicial] = useState('EN PROCESO - Ingresado');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const clientesRegistrados = useMemo(() => {
    return (Array.isArray(users) ? users : []).filter((u) =>
      normalizarTexto(u?.rol).includes('client')
    );
  }, [users]);

  const sugerenciasClientes = useMemo(() => {
    const q = normalizarTexto(busquedaCliente);
    if (!q) return [];
    return clientesRegistrados
      .filter((c) => {
        const matchNombre = normalizarTexto(c?.nombre).includes(q);
        const matchCorreo = normalizarTexto(c?.email).includes(q);
        const matchTel = normalizarTexto(c?.telefono || c?.celular).includes(q);
        const matchCedula = normalizarTexto(c?.cedula || c?.documento).includes(q);
        return matchNombre || matchCorreo || matchTel || matchCedula;
      })
      .slice(0, 5);
  }, [busquedaCliente, clientesRegistrados]);

  const seleccionarClienteExistente = (cliente) => {
    setErrorMsg('');
    setNombreCliente(cliente?.nombre || '');
    setCedulaCliente(cliente?.cedula || cliente?.documento || '');
    setTelefonoCliente(cliente?.telefono || cliente?.celular || '');
    setCorreoCliente(cliente?.email || '');
    setUbicacionCliente(cliente?.direccion || cliente?.ubicacion || '');
    setBusquedaCliente(cliente?.nombre || '');
  };

  const enviarCorreoInvitacionCliente = async (ordenCreada) => {
    const idOrdenFinal = ordenCreada?.idOrden || ordenCreada?._id;
    const correoDestino = ordenCreada?.correoCliente || correoCliente.trim().toLowerCase();
    if (!idOrdenFinal || !correoDestino) return;

    const enlaceSeguimiento = construirEnlaceSeguimiento(idOrdenFinal);

    try {
      await fetch(`${API_URL}/notificaciones/invitacion-seguimiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: correoDestino,
          nombreCliente: ordenCreada?.cliente || nombreCliente.trim(),
          idOrden: idOrdenFinal,
          equipo: [ordenCreada?.tipoEquipo, ordenCreada?.marca, ordenCreada?.modelo]
            .filter(Boolean)
            .join(' '),
          descripcionFalla: ordenCreada?.descripcionFalla || descripcionFalla.trim(),
          fechaIngreso: ordenCreada?.fechaCreacion || new Date().toISOString(),
          enlaceSeguimiento,
        }),
      });
    } catch {
      // No interrumpe el flujo si el servidor SMTP está offline
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const nombreLimpio = nombreCliente.trim();
    const cedulaLimpia = cedulaCliente.trim();
    const telefonoLimpio = telefonoCliente.trim();
    const correoLimpio = correoCliente.trim().toLowerCase();
    const ubicacionLimpia = ubicacionCliente.trim();

    if (!nombreLimpio) {
      setErrorMsg('Por favor ingresa el nombre completo del cliente.');
      return;
    }

    if (!telefonoLimpio) {
      setErrorMsg('Por favor ingresa el teléfono del cliente.');
      return;
    }

    if (!correoLimpio) {
      setErrorMsg('Por favor ingresa el correo electrónico del cliente.');
      return;
    }

    if (!marca.trim() || !modelo.trim() || !descripcionFalla.trim()) {
      setErrorMsg('Completa la marca, el modelo y la descripción de la falla del equipo.');
      return;
    }

    setSubmitting(true);

    const datosCliente = {
      nombre: nombreLimpio,
      cedula: cedulaLimpia,
      telefono: telefonoLimpio,
      email: correoLimpio,
      correo: correoLimpio,
      direccion: ubicacionLimpia,
      ubicacion: ubicacionLimpia,
      rol: 'Cliente',
    };

    if (onRegistrarCliente) {
      onRegistrarCliente(datosCliente);
    }

    const ahoraIso = new Date().toISOString();
    const ordenLocal = {
      idOrden: String(Math.floor(1000 + Math.random() * 9000)),
      cliente: nombreLimpio,
      nombreCliente: nombreLimpio,
      cedulaCliente: cedulaLimpia,
      telefonoCliente: telefonoLimpio,
      correoCliente: correoLimpio,
      ubicacionCliente: ubicacionLimpia,
      direccionCliente: ubicacionLimpia,
      tipoEquipo,
      marca: marca.trim(),
      modelo: modelo.trim(),
      numeroSerie: numeroSerie.trim(),
      descripcionFalla: descripcionFalla.trim(),
      observaciones: observaciones.trim(),
      estado: estadoInicial,
      cerrada: false,
      entregado: false,
      fechaCreacion: ahoraIso,
      createdAt: ahoraIso,
      creadoPor: currentUser?.nombre || 'Administrador',
    };

    let ordenFinal = ordenLocal;

    try {
      const res = await fetch(`${API_URL}/ordenes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ordenLocal),
      });

      if (res.ok) {
        const data = await res.json().catch(() => null);
        ordenFinal = data?.orden || data || ordenLocal;
      }
    } catch {
      // Si el backend está apagado, guarda localmente de todos modos
    }

    await enviarCorreoInvitacionCliente(ordenFinal);

    setSubmitting(false);
    if (onSaveSuccess) {
      onSaveSuccess(ordenFinal);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">
          REGISTRO DE NUEVA ORDEN DE SERVICIO
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-7"
      >
        <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
          Datos del Cliente y del Equipo
        </h2>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl px-4 py-3">
            {errorMsg}
          </div>
        )}

        {/* DATOS DEL CLIENTE */}
        <section className="space-y-4">
          <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
            DATOS DEL CLIENTE
          </h3>

          <div className="relative">
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Cliente
            </label>
            <input
              type="text"
              value={busquedaCliente}
              onChange={(e) => setBusquedaCliente(e.target.value)}
              placeholder="Buscar por nombre, cédula o teléfono"
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {sugerenciasClientes.length > 0 && (
              <div className="mt-1 bg-white border border-gray-200 rounded-xl shadow-md divide-y divide-gray-100">
                {sugerenciasClientes.map((cli) => (
                  <button
                    key={cli.id || cli.email}
                    type="button"
                    onClick={() => seleccionarClienteExistente(cli)}
                    className="w-full text-left px-3.5 py-2 hover:bg-blue-50 transition flex items-center justify-between gap-2 text-xs cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-gray-900">{cli.nombre}</span>
                      {cli.email && (
                        <span className="text-gray-500 ml-2">({cli.email})</span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-600">
                      {cli.telefono || 'Sin teléfono'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              type="text"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              placeholder="Nombre Completo *"
              required
              className="border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={cedulaCliente}
              onChange={(e) => setCedulaCliente(e.target.value)}
              placeholder="Cédula/NIT"
              className="border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={telefonoCliente}
              onChange={(e) => setTelefonoCliente(e.target.value)}
              placeholder="Teléfono *"
              required
              className="border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={correoCliente}
              onChange={(e) => setCorreoCliente(e.target.value)}
              placeholder="Correo Electrónico *"
              required
              className="border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Ubicación (Dirección de la casa)
            </label>
            <input
              type="text"
              value={ubicacionCliente}
              onChange={(e) => setUbicacionCliente(e.target.value)}
              placeholder="Ej: Cra 15 # 24-18, Barrio Quirinal"
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* DATOS DEL EQUIPO */}
        <section className="space-y-4">
          <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
            DATOS DEL EQUIPO
          </h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Tipo de Equipo
            </label>
            <select
              value={tipoEquipo}
              onChange={(e) => setTipoEquipo(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Laptop">Laptop</option>
              <option value="PC de Escritorio">PC de Escritorio</option>
              <option value="Impresora">Impresora</option>
              <option value="Tablet">Tablet</option>
              <option value="Monitor">Monitor</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Marca *"
              required
              className="border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Modelo *"
              required
              className="border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={numeroSerie}
              onChange={(e) => setNumeroSerie(e.target.value)}
              placeholder="Número de Serie"
              className="border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Descripción de la Falla *
            </label>
            <textarea
              rows={3}
              value={descripcionFalla}
              onChange={(e) => setDescripcionFalla(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Observaciones / Accesorios Entregados
            </label>
            <textarea
              rows={3}
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* ESTADO INICIAL */}
        <section className="space-y-2">
          <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
            ESTADO INICIAL
          </h3>
          <div className="bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold text-gray-800">
            {estadoInicial}
          </div>
        </section>

        {/* BOTONES */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-extrabold uppercase tracking-wide transition cursor-pointer"
          >
            {submitting ? 'GUARDANDO Y ENVIANDO CORREO...' : 'PF-02: CREAR ORDEN Y ASIGNAR TÉCNICO'}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 text-xs font-extrabold uppercase tracking-wide transition cursor-pointer"
          >
            CANCELAR Y VOLVER
          </button>
        </div>
      </form>
    </main>
  );
}