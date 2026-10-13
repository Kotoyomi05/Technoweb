import React, { useState } from 'react';

export default function OrdenesView({ onViewDetail, onNewOrder, cancelMessage, onDismissMessage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('Todas');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const ordenes = [
    {
      id: '1042',
      fecha: '09/09/2024',
      cliente: 'Ana García',
      estado: 'En Proceso',
      tecnico: 'Jack Rowe',
      acciones: ['Ver Detalle', 'Editar', 'Facturar'],
    },
    {
      id: '1041',
      fecha: '09/09/2024',
      cliente: 'Carlos Ruiz',
      estado: 'Finalizada',
      tecnico: 'Ana García',
      acciones: ['Ver Detalle', 'Facturar'],
    },
    {
      id: '1040',
      fecha: '08/09/2024',
      cliente: 'María Díaz',
      estado: 'Pendiente',
      tecnico: '[Sin Asignar]',
      acciones: ['Asignar', 'Editar'],
    },
    {
      id: '1039',
      fecha: '08/09/2024',
      cliente: 'Pedro López',
      estado: 'En Proceso',
      tecnico: 'Jack Rowe',
      acciones: ['Ver Detalle', 'Editar'],
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Mensaje de aviso de cancelación si aplica */}
      {cancelMessage && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs flex justify-between items-center">
          <span>Proceso cancelado. No se generó ninguna orden nueva.</span>
          <button 
            onClick={onDismissMessage}
            className="text-amber-600 hover:text-amber-900 font-bold ml-2 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">
          CONSULTA DE ÓRDENES DE SERVICIO
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        
        {/* Listado General de Órdenes (3 Columnas) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Listado General de Órdenes
          </h3>

          {/* Filtros de Búsqueda */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Buscar por ID o Cliente */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Buscar por ID o Cliente</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg pl-3 pr-8 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-gray-400">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
              </div>
            </div>

            {/* Filtrar por Estado */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Filtrar por Estado</label>
              <select 
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="Todas">Todas</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>

            {/* Rango de Fecha */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Rango de Fecha</label>
              <div className="flex items-center space-x-1">
                <input 
                  type="text" 
                  placeholder="00/00/0000" 
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-1/2 bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-[11px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center shadow-sm"
                />
                <span className="text-xs text-gray-400">a</span>
                <input 
                  type="text" 
                  placeholder="00/00/0000" 
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-1/2 bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-[11px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center shadow-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition shadow-sm cursor-pointer ml-1">
                  Filtrar
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de Órdenes */}
          <div className="overflow-x-auto border-t border-gray-100 pt-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">ID Orden</th>
                  <th className="py-2.5 px-3">Fecha Creación</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3">Técnico Asignado</th>
                  <th className="py-2.5 px-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {ordenes.map((orden) => (
                  <tr key={orden.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 font-semibold text-gray-900">{orden.id}</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{orden.fecha}</td>
                    <td className="py-3 px-3 font-semibold text-gray-800">{orden.cliente}</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{orden.estado}</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{orden.tecnico}</td>
                    <td className="py-3 px-3 space-x-1.5">
                      {orden.acciones.map((acc, idx) => (
                        <button 
                          key={idx}
                          onClick={() => {
                            if (acc === 'Ver Detalle') onViewDetail();
                          }}
                          className="text-blue-600 hover:underline font-medium cursor-pointer"
                        >
                          [{acc}]
                        </button>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen de Órdenes (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen de Órdenes
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Total Órdenes (últimos 30d)</span>
              <span className="text-sm font-bold text-gray-900">50</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium">Órdenes en Proceso</span>
              <span className="text-sm font-bold text-gray-900">15</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium">Órdenes Finalizadas</span>
              <span className="text-sm font-bold text-gray-900">30</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium">Órdenes Pendientes</span>
              <span className="text-sm font-bold text-gray-900">5</span>
            </div>

            <div className="pt-3">
              <button 
                onClick={onNewOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition shadow-sm cursor-pointer text-center"
              >
                Crear Nueva Orden
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Exportación Inferiores */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer">
          Exportar Reporte (PDF)
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer">
          Exportar a CSV
        </button>
      </div>
    </main>
  );
}