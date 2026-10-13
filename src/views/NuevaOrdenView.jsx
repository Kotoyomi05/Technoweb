import React, { useState } from 'react';

export default function NuevaOrdenView({ onBack, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    clienteSearch: '',
    nombreCompleto: '',
    cedulaNit: '',
    telefono: '',
    email: '',
    tipoEquipo: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    descripcionFalla: '',
    observaciones: '',
    estado: 'EN PROCESO - Ingresado'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para guardar en la BD más adelante
    if (onSaveSuccess) onSaveSuccess();
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
          REGISTRO DE NUEVA ORDEN DE SERVICIO
        </h1>
      </div>

      {/* Tarjeta Principal del Formulario */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">
            Datos del Cliente y del Equipo
          </h3>

          {/* SECCIÓN 1: DATOS DEL CLIENTE */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Datos del Cliente
            </h4>

            {/* Buscador de Cliente */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Cliente</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  name="clienteSearch"
                  value={formData.clienteSearch}
                  onChange={handleChange}
                  placeholder="Buscar por nombre, cédula o teléfono"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Campos de Información del Cliente */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                placeholder="Nombre Completo"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="cedulaNit"
                value={formData.cedulaNit}
                onChange={handleChange}
                placeholder="Cédula/NIT"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Correo Electrónico"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer flex items-center space-x-1"
            >
              <span>+ Crear Nuevo Cliente</span>
            </button>
          </div>

          {/* SECCIÓN 2: DATOS DEL EQUIPO */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Datos del Equipo
            </h4>

            {/* Tipo de Equipo */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tipo de Equipo</label>
              <select
                name="tipoEquipo"
                value={formData.tipoEquipo}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="">(Laptop, Impresora, PC de Escritorio)</option>
                <option value="Laptop">Laptop</option>
                <option value="PC de Escritorio">PC de Escritorio</option>
                <option value="Impresora">Impresora</option>
                <option value="Servidor">Servidor</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Marca, Modelo y Serial */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Marca"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Modelo"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="numeroSerie"
                value={formData.numeroSerie}
                onChange={handleChange}
                placeholder="Número de Serie"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Descripción de la Falla */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Descripción de la Falla</label>
              <textarea
                name="descripcionFalla"
                rows="3"
                value={formData.descripcionFalla}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              ></textarea>
            </div>

            {/* Observaciones / Accesorios Entregados */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Observaciones / Accesorios Entregados</label>
              <textarea
                name="observaciones"
                rows="3"
                value={formData.observaciones}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              ></textarea>
            </div>
          </div>

          {/* SECCIÓN 3: ESTADO INICIAL */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Estado Inicial</label>
            <input
              type="text"
              readOnly
              value={formData.estado}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 cursor-not-allowed"
            />
          </div>

          {/* SECCIÓN 4: BOTONES DE ACCIÓN */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              PF-02: CREAR ORDEN Y ASIGNAR TÉCNICO
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              CANCELAR Y VOLVER
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}