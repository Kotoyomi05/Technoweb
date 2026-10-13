import React, { useState } from 'react';

export default function GestionAsignacionView({ onBack, onViewDetail }) {
  const [filtroTecnico, setFiltroTecnico] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');

  const ordenes = [
    {
      id: '1042',
      cliente: 'Ana García',
      equipo: 'Laptop HP Pavilion',
      tecnicoActual: 'Jack Rowe',
      carga: 'Alta',
      cargaColor: 'bg-amber-500',
      estado: 'En Diagnóstico',
      accionPrincipal: 'Reasignar'
    },
    {
      id: '1043',
      cliente: 'Roberto Díaz',
      equipo: 'PC Escritorio Custom',
      tecnicoActual: 'Ana García',
      carga: 'Media',
      cargaColor: 'bg-emerald-500',
      estado: 'Esperando Repuestos',
      accionPrincipal: 'Reasignar'
    },
    {
      id: '1044',
      cliente: 'María Torres',
      equipo: 'Smartphone iPhone 12',
      tecnicoActual: 'Sin Asignar',
      carga: 'N/A',
      cargaColor: 'bg-gray-400',
      estado: 'Nuevo Ingreso',
      accionPrincipal: 'Asignar'
    }
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
          GESTIÓN AVANZADA DE ASIGNACIÓN DE ÓRDENES
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Reasignación de Órdenes (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Panel de Reasignación de Órdenes
          </h3>

          {/* Filtros de Búsqueda */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Técnico Asignado</label>
              <select 
                value={filtroTecnico}
                onChange={(e) => setFiltroTecnico(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="Todos">Todos</option>
                <option value="Jack Rowe">Jack Rowe</option>
                <option value="Ana García">Ana García</option>
                <option value="Carlos Ruiz">Carlos Ruiz</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Técnico Asignado</label>
              <select 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="Ana García">Ana García</option>
                <option value="Carlos Ruiz">Carlos Ruiz</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Estado del Equipo</label>
              <select 
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="Esperando Repuestos">Esperando Repuestos</option>
                <option value="Listo para Entrega">Listo para Entrega</option>
                <option value="En Diagnóstico">En Diagnóstico</option>
              </select>
            </div>
          </div>

          {/* Tabla de Reasignación */}
          <div className="overflow-x-auto border-t border-gray-100 pt-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">Orden #</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Equipo</th>
                  <th className="py-2.5 px-3">Técnico Actual</th>
                  <th className="py-2.5 px-3">Carga de Trabajo del Técnico</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {ordenes.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 font-semibold text-gray-900">[{item.id}]</td>
                    <td className="py-3 px-3 font-medium text-gray-800">{item.cliente}</td>
                    <td className="py-3 px-3 text-gray-700">{item.equipo}</td>
                    <td className="py-3 px-3 font-medium text-gray-800">{item.tecnicoActual}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${item.cargaColor}`} />
                        <span className="font-medium text-gray-700">{item.carga}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-gray-700 font-medium">{item.estado}</td>
                    <td className="py-3 px-3 space-y-1">
                      <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                        Botón: {item.accionPrincipal}
                      </button>
                      <button 
                        onClick={onViewDetail}
                        className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center"
                      >
                        Botón: Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Lateral: Carga de Trabajo de Técnicos (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Carga de Trabajo de Técnicos
          </h3>

          <div className="space-y-4 text-xs">
            {/* Jack Rowe */}
            <div className="space-y-1">
              <div className="flex justify-between items-center font-medium text-gray-800">
                <span>Jack Rowe</span>
                <span className="font-bold text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Ana García */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between items-center font-medium text-gray-800">
                <span>Ana García</span>
                <span className="font-bold text-gray-900">65%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Carlos Ruiz */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between items-center font-medium text-gray-800">
                <span>Carlos Ruiz</span>
                <span className="font-bold text-gray-900">45%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PF-07: CONFIRMAR REASIGNACIÓN MASIVA
        </button>
        <button 
          onClick={onBack}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          CANCELAR Y VOLVER
        </button>
      </div>
    </main>
  );
}