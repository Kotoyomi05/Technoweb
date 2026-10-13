import React, { useState } from 'react';

export default function InventarioView({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('Laptop HP Pavilion Battery...');

  const repuestos = [
    {
      codigo: '[REP-BAT-HP01]',
      nombre: 'Batería HP Pavilion 15-cs',
      stockActual: '[8]',
      stockMinimo: '[10]',
      ubicacion: '[Estantería A-3]',
      estado: 'Bajo Stock',
      estadoTipo: 'warning', // Bajo Stock
    },
    {
      codigo: '[REP-SSD-MX500]',
      nombre: 'Crucial MX500 500GB SSD',
      stockActual: '[25]',
      stockMinimo: '[15]',
      ubicacion: '[Estantería B-1]',
      estado: 'Disponible',
      estadoTipo: 'success', // Disponible
    },
    {
      codigo: '[REP-FAN-G15]',
      nombre: 'Ventilador Dell G15',
      stockActual: '[2]',
      stockMinimo: '[5]',
      ubicacion: '[Estantería C-2]',
      estado: 'Crítico',
      estadoTipo: 'danger', // Crítico
    },
    {
      codigo: '[TOOL-MULT-FLU]',
      nombre: 'Multímetro Fluke 117',
      stockActual: '[5]',
      stockMinimo: '[3]',
      ubicacion: '[Almacén Herramientas]',
      estado: 'Disponible',
      estadoTipo: 'success', // Disponible
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Botón Volver al Dashboard opcional */}
      {onBack && (
        <button 
          onClick={onBack} 
          className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Volver al Dashboard</span>
        </button>
      )}

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">
          GESTIÓN INTEGRAL DE RECURSOS Y MATERIALES - TALLER CENTRAL
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Tabla de Inventario de Repuestos Críticos (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Inventario de Repuestos Críticos
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
                placeholder="Buscar repuesto..." 
                className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          {/* Tabla de Repuestos */}
          <div className="overflow-x-auto border-t border-gray-100 pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Nombre de Repuesto</th>
                  <th className="py-2.5 px-3">Stock Actual</th>
                  <th className="py-2.5 px-3">Stock Mínimo</th>
                  <th className="py-2.5 px-3">Ubicación</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {repuestos.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 font-semibold text-gray-700">{item.codigo}</td>
                    <td className="py-3 px-3 font-medium text-gray-900">{item.nombre}</td>
                    <td className="py-3 px-3 font-semibold text-gray-800">{item.stockActual}</td>
                    <td className="py-3 px-3 text-gray-600">{item.stockMinimo}</td>
                    <td className="py-3 px-3 text-gray-700">{item.ubicacion}</td>
                    <td className="py-3 px-3 font-semibold">
                      {item.estadoTipo === 'warning' && (
                        <span className="inline-flex items-center space-x-1 text-amber-700">
                          <span>⚠️</span>
                          <span>{item.estado}</span>
                        </span>
                      )}
                      {item.estadoTipo === 'success' && (
                        <span className="inline-flex items-center space-x-1 text-emerald-600">
                          <span className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                          <span>{item.estado}</span>
                        </span>
                      )}
                      {item.estadoTipo === 'danger' && (
                        <span className="inline-flex items-center space-x-1 text-rose-600">
                          <span className="w-3 h-3 bg-rose-600 rounded-full inline-block" />
                          <span>{item.estado}</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 space-y-1">
                      <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                        Botón: Solicitar
                      </button>
                      <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                        Botón: Detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Lateral: Resumen de Logística (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen de Logística
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-gray-600 font-medium">Solicitudes Pendientes:</span>
              <span className="font-bold text-gray-900 ml-1.5">[7]</span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium">Repuestos en Tránsito:</span>
              <span className="font-bold text-gray-900 ml-1.5">[15]</span>
            </div>

            <div className="pt-2 border-t border-gray-100 p-2 bg-rose-50/50 rounded-lg border border-rose-100">
              <span className="text-rose-700 font-medium">Alertas de Stock:</span>
              <span className="font-bold text-rose-800 ml-1.5">[3]</span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block mb-1">Próxima Entrega Proveedor:</span>
              <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">[12/09/2024]</span>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PF-08: GENERAR NUEVA SOLICITUD DE COMPRA
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          VER HISTORIAL DE PEDIDOS
        </button>
      </div>
    </main>
  );
}