import React, { useRef, useState } from 'react';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';

export default function NuevaOrdenView({ onBack, onSaveSuccess }) {
  const nombreInputRef = useRef(null);

  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  const [cedulaCliente, setCedulaCliente] = useState('');
  const [telefonoCliente, setTelefonoCliente] = useState('');
  const [correoCliente, setCorreoCliente] = useState('');

  const [tipoEquipo, setTipoEquipo] = useState('Laptop');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [descripcionFalla, setDescripcionFalla] = useState('');
  const [observacionesAccesorios, setObservacionesAccesorios] = useState('');
  const [estadoInicial] = useState('EN PROCESO - Ingresado');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const limpiarCamposCliente = () => {
    setBusquedaCliente('');
    setNombreCliente('');
    setCedulaCliente('');
    setTelefonoCliente('');
    setCorreoCliente('');
    nombreInputRef.current?.focus();
  };

  const resetearFormularioCompleto = () => {
    setBusquedaCliente('');
    setNombreCliente('');
    setCedulaCliente('');
    setTelefonoCliente('');
    setCorreoCliente('');
    setTipoEquipo('Laptop');
    setMarca('');
    setModelo('');
    setNumeroSerie('');
    setDescripcionFalla('');
    setObservacionesAccesorios('');
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg('');

    const clienteLimpio = nombreCliente.trim();
    if (!clienteLimpio) {
      setErrorMsg(
        'Ingresa el nombre completo del cliente antes de crear la orden.'
      );
      nombreInputRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        cliente: clienteLimpio,
        cedulaCliente: cedulaCliente.trim(),
        telefonoCliente: telefonoCliente.trim(),
        correoCliente: correoCliente.trim().toLowerCase(),
        tipoEquipo,
        marca: marca.trim(),
        modelo: modelo.trim(),
        numeroSerie: numeroSerie.trim(),
        descripcionFalla: descripcionFalla.trim(),
        observacionesAccesorios: observacionesAccesorios.trim(),
        estado: estadoInicial,
        tecnicoAsignado: '[Sin Asignar]',
      };

      const res = await fetch(`${API_URL}/ordenes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'No se pudo guardar la orden en MongoDB');
      }

      resetearFormularioCompleto();

      if (onSaveSuccess) {
        onSaveSuccess(data);
      }
    } catch (err) {
      console.error(err);
      const esErrorRed =
        err instanceof TypeError || /failed to fetch|network/i.test(err?.message || '');
      setErrorMsg(
        esErrorRed
          ? `No se pudo conectar con ${API_URL}/ordenes. Revisa que el backend esté corriendo.`
          : err.message || 'Error al guardar la orden.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight uppercase">
          REGISTRO DE NUEVA ORDEN DE SERVICIO
        </h1>
      </div>

      {errorMsg && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-7"
      >
        <div className="border-b border-gray-100 pb-3">
          <h2 className="text-base font-bold text-gray-900">
            Datos del Cliente y del Equipo
          </h2>
        </div>

        {/* DATOS DEL CLIENTE */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
            DATOS DEL CLIENTE
          </h3>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Cliente
            </label>
            <input
              type="text"
              value={busquedaCliente}
              onChange={(e) => setBusquedaCliente(e.target.value)}
              placeholder="Buscar por nombre, cédula o teléfono"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <input
              ref={nombreInputRef}
              type="text"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
              placeholder="Nombre Completo"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={cedulaCliente}
              onChange={(e) => setCedulaCliente(e.target.value)}
              placeholder="Cédula/NIT"
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={telefonoCliente}
              onChange={(e) => setTelefonoCliente(e.target.value)}
              placeholder="Teléfono"
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={correoCliente}
              onChange={(e) => setCorreoCliente(e.target.value)}
              placeholder="Correo Electrónico"
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="button"
              onClick={limpiarCamposCliente}
              className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
            >
              + Crear Nuevo Cliente
            </button>
          </div>
        </div>

        {/* DATOS DEL EQUIPO */}
        <div className="space-y-4 pt-2 border-t border-gray-100">
          <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
            DATOS DEL EQUIPO
          </h3>

          <div className="text-xs">
            <label className="block font-semibold text-gray-700 mb-1">
              Tipo de Equipo
            </label>
            <select
              value={tipoEquipo}
              onChange={(e) => setTipoEquipo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Laptop">Laptop</option>
              <option value="Impresora">Impresora</option>
              <option value="PC de Escritorio">PC de Escritorio</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Marca"
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Modelo"
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={numeroSerie}
              onChange={(e) => setNumeroSerie(e.target.value)}
              placeholder="Número de Serie"
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-gray-700 mb-1">
              Descripción de la Falla
            </label>
            <textarea
              rows={3}
              value={descripcionFalla}
              onChange={(e) => setDescripcionFalla(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-gray-700 mb-1">
              Observaciones / Accesorios Entregados
            </label>
            <textarea
              rows={3}
              value={observacionesAccesorios}
              onChange={(e) => setObservacionesAccesorios(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ESTADO INICIAL */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <h3 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
            ESTADO INICIAL
          </h3>
          <div className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs font-medium text-gray-700">
            {estadoInicial}
          </div>
        </div>

        {/* BOTONES */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white shadow-sm transition uppercase cursor-pointer"
          >
            {submitting
              ? 'Guardando en MongoDB...'
              : 'PF-02: CREAR ORDEN Y ASIGNAR TÉCNICO'}
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 rounded-lg text-xs font-bold bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 transition uppercase cursor-pointer"
            >
              CANCELAR Y VOLVER
            </button>
          )}
        </div>
      </form>
    </main>
  );
}