import React, { useState } from 'react';

const ALMACEN_BASE_NOMBRES = [
  'Batería para Laptop',
  'Pantalla / Display',
  'Jack de Carga DC',
  'Pasta Térmica',
  'Ventilador / Cooler',
  'Unidad SSD / Memoria RAM',
  'Cargador / Fuente de Poder',
  'Teclado / Bisagras',
  'Estaño / Flux / Componentes SMD',
];

export default function SolicitudCompraView({
  currentUser,
  inventario = [],
  itemInicial = null,
  onSaveSolicitud,
  onBack,
}) {
  const rolLower = String(currentUser?.rol || '').toLowerCase();
  const tienePermiso =
    rolLower.includes('admin') || rolLower.includes('tecn') || rolLower.includes('técn');

  const nombresAlmacen = Array.from(
    new Set([
      ...(Array.isArray(inventario) ? inventario.map((i) => i?.nombre).filter(Boolean) : []),
      ...ALMACEN_BASE_NOMBRES,
    ])
  );

  const [nombreRepuesto, setNombreRepuesto] = useState(
    itemInicial?.nombre || nombresAlmacen[0] || ''
  );
  const [cantidadFaltante, setCantidadFaltante] = useState(1);
  const [prioridad, setPrioridad] = useState('Media');
  const [proveedorSugerido, setProveedorSugerido] = useState('');
  const [fechaEntregaEstimada, setFechaEntregaEstimada] = useState('');
  const [descripcionFaltantes, setDescripcionFaltantes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!tienePermiso) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Volver a Inventario</span>
        </button>

        <div className="bg-white p-8 rounded-xl border border-rose-200 shadow-sm space-y-3 text-center">
          <h1 className="text-xl font-bold text-rose-700 uppercase">Acceso Restringido</h1>
          <p className="text-xs text-gray-700">
            Solo los cargos <span className="font-bold">Técnico</span> y{' '}
            <span className="font-bold">Administrador</span> pueden generar solicitudes de compra.
          </p>
        </div>
      </main>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const nombreLimpio = nombreRepuesto.trim();
    const descLimpia = descripcionFaltantes.trim();
    const cantNum = parseInt(cantidadFaltante, 10);

    if (!nombreLimpio) {
      setErrorMsg('Selecciona o escribe el nombre del repuesto o material que falta.');
      return;
    }
    if (!Number.isFinite(cantNum) || cantNum <= 0) {
      setErrorMsg('Ingresa una cantidad válida mayor a 0.');
      return;
    }
    if (!descLimpia) {
      setErrorMsg('Describe qué cosas se necesitan, cuáles faltan y para qué se requieren.');
      return;
    }

    const nuevaSolicitud = {
      id: `SOL-${Date.now().toString().slice(-5)}`,
      codigoRepuesto: itemInicial?.codigo || itemInicial?.id || '',
      nombre: nombreLimpio,
      cantidad: cantNum,
      prioridad,
      proveedor: proveedorSugerido.trim() || 'Por definir',
      fechaEntregaEstimada: fechaEntregaEstimada || 'Por confirmar',
      descripcion: descLimpia,
      solicitadoPor: currentUser?.nombre || 'Usuario',
      rolSolicitante: currentUser?.rol || '',
      estado: 'Pendiente',
      fecha: new Date().toLocaleDateString('es-CO'),
    };

    if (onSaveSolicitud) {
      onSaveSolicitud(nuevaSolicitud);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver a Inventario</span>
      </button>

      <div className="mb-8">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          PF-08 • LOGÍSTICA Y COMPRAS
        </span>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1 uppercase">
          GENERAR NUEVA SOLICITUD DE COMPRA
        </h1>
        <p className="text-xs text-gray-600 mt-1">
          Disponible únicamente para cargos Técnico y Administrador. Indica qué repuestos o
          insumos hacen falta para ir agregándolos luego al almacén.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6 text-xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Repuesto / Material del Almacén o Requerido
            </label>
            <input
              list="almacen-sugerencias"
              type="text"
              value={nombreRepuesto}
              onChange={(e) => setNombreRepuesto(e.target.value)}
              placeholder="Elige del almacén o escribe el nombre..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="almacen-sugerencias">
              {nombresAlmacen.map((nom) => (
                <option key={nom} value={nom} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Cantidad Necesaria / Faltante
            </label>
            <input
              type="number"
              min="1"
              value={cantidadFaltante}
              onChange={(e) => setCantidadFaltante(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Prioridad</label>
            <select
              value={prioridad}
              onChange={(e) => setPrioridad(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Proveedor Sugerido (Opcional)
            </label>
            <input
              type="text"
              value={proveedorSugerido}
              onChange={(e) => setProveedorSugerido(e.target.value)}
              placeholder="Ej. Distribuidora Central"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Entrega Estimada (Opcional)
            </label>
            <input
              type="date"
              value={fechaEntregaEstimada}
              onChange={(e) => setFechaEntregaEstimada(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Descripción de lo que se necesita y qué hace falta
          </label>
          <textarea
            rows="4"
            value={descripcionFaltantes}
            onChange={(e) => setDescripcionFaltantes(e.target.value)}
            placeholder="Detalla qué repuestos o insumos faltan en el almacén, modelos compatibles y urgencia..."
            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg uppercase tracking-wider transition cursor-pointer"
          >
            Guardar Solicitud de Compra
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg uppercase tracking-wider transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}