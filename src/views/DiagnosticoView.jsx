import React, { useState } from 'react';

export default function DiagnosticoView({ onBack }) {
  const [formData, setFormData] = useState({
    detalleDiagnostico: '',
    estadoActualizado: 'En Proceso',
    proximosPasos: '',
    archivoAdjunto: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onBack) onBack();
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Encabezado Principal */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
          REGISTRO DE DIAGNÓSTICO Y AVANCE DE ORDEN
        </h1>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        
        {/* Título de la sección y estado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Actualización de Orden #1042
          </h2>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium self-start sm:self-auto">
            EN PROCESO - Diagnóstico
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECCIÓN 1: INFORMACIÓN BÁSICA (NO EDITABLE) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Información Básica (No editable):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  type="text"
                  readOnly
                  value="Ana García"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Equipo</label>
                <input
                  type="text"
                  readOnly
                  value="Laptop HP Pavilion"
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: FORMULARIO DE AVANCE */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Formulario de Avance:
            </h3>

            {/* Detalle del Diagnóstico Técnico */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Detalle del Diagnóstico Técnico
              </label>
              <textarea
                name="detalleDiagnostico"
                rows="3"
                value={formData.detalleDiagnostico}
                onChange={handleChange}
                placeholder="Describa detalladamente los hallazgos técnicos...&#10;Ejemplo: Se desarma el equipo y se encuentra corto circuito en la etapa de alimentación de la placa madre..."
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              ></textarea>
            </div>

            {/* Estado Actualizado de la Orden */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Estado Actualizado de la Orden
              </label>
              <select
                name="estadoActualizado"
                value={formData.estadoActualizado}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="En Proceso">En Proceso</option>
                <option value="Pendiente de Aprobación">Pendiente de Aprobación</option>
                <option value="Esperando Repuestos">Esperando Repuestos</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>

            {/* Próximos Pasos / Acciones a Seguir */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Próximos Pasos / Acciones a Seguir
              </label>
              <textarea
                name="proximosPasos"
                rows="2"
                value={formData.proximosPasos}
                onChange={handleChange}
                placeholder="Indique las siguientes acciones...&#10;Ejemplo: Solicitar cotización de repuestos al cliente..."
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              ></textarea>
            </div>

            {/* Adjuntos (Opcional) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Adjuntos (Opcional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    <span className="text-xs font-semibold">Subir Imagen/Documento de Diagnóstico</span>
                  </div>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

          </div>

          {/* SECCIÓN 3: BOTONES DE ACCIÓN */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              PF-04: GUARDAR DIAGNÓSTICO Y ACTUALIZAR ORDEN
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