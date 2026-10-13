import React, { useState } from 'react';

export default function RegistroAuditoriaView({ onBack }) {
  const [filtroUsuario, setFiltroUsuario] = useState('Todos');
  const [filtroModulo, setFiltroModulo] = useState('Todos');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const eventos = [
    {
      id: 1,
      fechaHora: '09/09/2024 14:35:22',
      usuario: 'Jack Rowe',
      modulo: 'Ordenes',
      evento: 'Creación de Orden #1042',
    },
    {
      id: 2,
      fechaHora: '09/09/2024 14:36:15',
      usuario: 'Ana García',
      modulo: 'Inventario',
      evento: 'Ajuste de Stock REP-0098',
    },
    {
      id: 3,
      fechaHora: '09/09/2024 15:00:45',
      usuario: 'Jack Rowe',
      modulo: 'Ordenes',
      evento: 'Cambio de Estado Orden #1042 (En Reparación)',
    },
    {
      id: 4,
      fechaHora: '09/09/2024 15:15:10',
      usuario: 'Jack Rowe',
      modulo: 'Ordenes',
      evento: 'Asignación de Repuesto (REP-0098)',
    },
    {
      id: 5,
      fechaHora: '09/09/2024 16:30:00',
      usuario: 'Sistema',
      modulo: 'Respaldo',
      evento: 'Respaldo Automático Diario',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Botón Volver */}
      <button 
        onClick={onBack} 
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver al Dashboard</span>
      </button>

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">
          REGISTRO DE AUDITORÍA DEL SISTEMA
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Tabla y Filtros de Eventos Recientes (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Eventos Recientes
          </h3>

          {/* Filtros */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Filtrar por Usuario</label>
              <select 
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="Todos">[Todos]</option>
                <option value="Jack Rowe">Jack Rowe</option>
                <option value="Ana García">Ana García</option>
                <option value="Sistema">Sistema</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Filtrar por Módulo</label>
              <select 
                value={filtroModulo}
                onChange={(e) => setFiltroModulo(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="Todos">[Todos]</option>
                <option value="Ordenes">Ordenes</option>
                <option value="Inventario">Inventario</option>
                <option value="Respaldo">Respaldo</option>
              </select>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Rango de Fecha</label>
              <div className="flex items-center space-x-1">
                <input 
                  type="text" 
                  placeholder="[00/00/0000]" 
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-1/2 bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-[11px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center shadow-sm"
                />
                <span className="text-xs text-gray-400">a</span>
                <input 
                  type="text" 
                  placeholder="[00/00/0000]" 
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-1/2 bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-[11px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-xs transition shadow-sm cursor-pointer">
              Buscar / Filtrar
            </button>
          </div>

          {/* Tabla de Eventos */}
          <div className="overflow-x-auto border-t border-gray-100 pt-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Filtrar</th>
                  <th className="py-2.5 px-3">Usuario</th>
                  <th className="py-2.5 px-3">Módulo</th>
                  <th className="py-2.5 px-3">Events</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {eventos.map((e) => (
                  <tr key={e.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 font-semibold text-gray-500">{e.id}</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{e.fechaHora}</td>
                    <td className="py-3 px-3 text-gray-800 font-semibold">{e.usuario}</td>
                    <td className="py-3 px-3 text-gray-600">{e.modulo}</td>
                    <td className="py-3 px-3 font-medium text-gray-900">{e.evento}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen de Actividad (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen de Actividad
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Total Eventos (últimas 24h)</span>
              <p className="text-lg font-bold text-gray-900 mt-0.5">25</p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="text-gray-500 font-medium block">Eventos Críticos</span>
              <p className="text-lg font-bold text-gray-900 mt-0.5">0</p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="text-gray-500 font-medium block">Usuario Más Activo</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">Jack Rowe (15 acciones)</p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="text-gray-500 font-medium block">Módulo Más Activo</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">Ordenes (18 acciones)</p>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Exportación Inferiores */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer">
          Generar Reporte Detallado (PDF)
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer">
          Exportar a CSV
        </button>
      </div>
    </main>
  );
}