import React, { useState } from 'react';

export default function GestionGarantiasView({ onBack, onViewDetail }) {
  const [searchTerm, setSearchTerm] = useState('Laptop HP Pavilion ...');

  const garantias = [
    {
      orden: '[1040]',
      cliente: '[María González]',
      equipo: '[Laptop HP Pavilion 15]',
      fechaFin: '[15/12/2024]',
      diasRestantes: '[98 días]',
      estadoDian: 'Vigente',
      estadoTipo: 'vigente',
      estadoReclamo: null,
      accion: 'Ver Detalles'
    },
    {
      orden: '[1035]',
      cliente: '[Carlos Ruiz]',
      equipo: '[PC Escritorio Custom]',
      fechaFin: '[01/10/2024]',
      diasRestantes: '[53 días]',
      estadoDian: 'Próxima a vencer',
      estadoTipo: 'proxima',
      estadoReclamo: null,
      accion: 'Ver Detalles'
    },
    {
      orden: '[1022]',
      cliente: '[Ana Beltrán]',
      equipo: '[Smartphone iPhone 13]',
      fechaFin: '[12/08/2024]',
      diasRestantes: 'Vencida',
      estadoDian: 'Vencida',
      estadoTipo: 'vencida',
      estadoReclamo: 'Cerrado',
      accion: 'Historial'
    },
    {
      orden: '[1045]',
      cliente: '[Roberto Díaz]',
      equipo: '[Monitor Dell 27"]',
      fechaFin: '[10/01/2025]',
      diasRestantes: '[154 días]',
      estadoDian: 'Vigente',
      estadoTipo: 'vigente',
      estadoReclamo: null,
      accion: 'Ver Detalles'
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
          GESTIÓN DE GARANTÍAS Y SEGUIMIENTO DE CALIDAD
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Tabla de Resumen de Garantías Activas (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Resumen de Garantías Activas
          </h3>

          {/* Buscador */}
          <div className="pt-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Buscar:</label>
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar garantía..." 
                className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto border-t border-gray-100 pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">Orden #</th>
                  <th className="py-2.5 px-3">Cliente</th>
                  <th className="py-2.5 px-3">Equipo</th>
                  <th className="py-2.5 px-3">Fecha Fin Garantía</th>
                  <th className="py-2.5 px-3">Días Restantes</th>
                  <th className="py-2.5 px-3">Estado Reclamo</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {garantias.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 font-semibold text-gray-800">{item.orden}</td>
                    <td className="py-3 px-3 font-medium text-gray-900">{item.cliente}</td>
                    <td className="py-3 px-3 text-gray-700">{item.equipo}</td>
                    <td className="py-3 px-3 text-gray-700">{item.fechaFin}</td>
                    <td className="py-3 px-3 font-medium">
                      {item.estadoTipo === 'vencida' ? (
                        <span className="inline-flex items-center space-x-1 text-rose-600 font-semibold">
                          <span className="w-3 h-3 bg-rose-600 rounded-full inline-block" />
                          <span>Vencida</span>
                        </span>
                      ) : (
                        <span className="text-gray-800">{item.diasRestantes}</span>
                      )}
                    </td>
                    <td className="py-3 px-3 font-semibold">
                      {item.estadoTipo === 'vigente' && (
                        <span className="inline-flex items-center space-x-1 text-emerald-600">
                          <span className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                          <span>Vigente</span>
                        </span>
                      )}
                      {item.estadoTipo === 'proxima' && (
                        <span className="inline-flex items-center space-x-1 text-amber-600">
                          <span>⚠️</span>
                          <span>Próxima a vencer</span>
                        </span>
                      )}
                      {item.estadoTipo === 'vencida' && (
                        <span className="inline-flex items-center space-x-1 text-rose-600">
                          <span>❌</span>
                          <span>Cerrado</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button 
                        onClick={onViewDetail}
                        className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2.5 py-1 rounded text-[11px] font-medium transition cursor-pointer"
                      >
                        Botón: {item.accion}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Lateral: Métricas de Calidad (SLA) (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Métricas de Calidad (SLA)
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-gray-600 font-medium block">Promedio de Resolución (Garantía):</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[3.5 días]</p>
            </div>

            <div className="pt-2 border-t border-gray-100 p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-100">
              <span className="text-emerald-800 font-medium block">Tasa de Reingresos (30 días):</span>
              <p className="text-sm font-bold text-emerald-900 mt-0.5">[1.2%]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Satisfacción del Cliente (Promedio):</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5 flex items-center space-x-1">
                <span>[4.8 / 5]</span>
                <span className="text-amber-400">⭐⭐⭐⭐</span>
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Reclamos Abiertos:</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[2]</p>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PF-09: GESTIONAR NUEVO RECLAMO DE GARANTÍA
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GENERAR INFORME DE CALIDAD (PDF)
        </button>
      </div>
    </main>
  );
}