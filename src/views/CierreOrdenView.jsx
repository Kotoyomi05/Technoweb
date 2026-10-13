import React from 'react';

export default function CierreOrdenView({ onBack, onGenerarFactura }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <button 
        onClick={onBack} 
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver al Detalle de Orden</span>
      </button>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          REGISTRO DE CIERRE Y FINALIZACIÓN DE ORDEN
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen de la Orden #1042
          </h3>
          
          <div className="space-y-3 text-sm">
            <div>
              <span className="text-gray-500 font-medium block text-xs">Cliente</span>
              <span className="text-gray-900 font-semibold">Ana García</span>
            </div>

            <div>
              <span className="text-gray-500 font-medium block text-xs">Dispositivo</span>
              <span className="text-gray-800 font-medium">Laptop HP Pavilion 15-cs</span>
            </div>

            <div>
              <span className="text-gray-500 font-medium block text-xs mb-1">Estado Anterior</span>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                EN REPARACIÓN
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-500 font-medium block text-xs mb-1.5">
                Servicios y Materiales Aplicados
              </span>
              <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 font-medium">
                <li>Reparación DC Jack</li>
                <li>Batería Nueva</li>
                <li>Mantenimiento</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Datos de Cierre
          </h3>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Comentarios Finales del Técnico
            </label>
            <textarea 
              rows="3" 
              className="w-full bg-white border border-gray-300 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none"
              defaultValue="Equipo reparado exitosamente. Se reemplazó el Jack DC y se realizó limpieza profunda. Funcionando correctamente bajo pruebas de estrés."
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Estado Final
            </label>
            <select className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer">
              <option value="FINALIZADO - ENTREGADO">[FINALIZADO - ENTREGADO]</option>
              <option value="FINALIZADO - NO REPARADO">[FINALIZADO - NO REPARADO]</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Garantía Aplicable
            </label>
            <select className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer">
              <option value="3 Meses">[3 Meses]</option>
              <option value="6 Meses">[6 Meses]</option>
              <option value="Sin Garantía">[Sin Garantía]</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
              Monto Total a Cobrar
            </label>
            <input 
              type="text" 
              disabled 
              readOnly 
              value="$ 550.000 COP" 
              className="w-full bg-gray-100 border border-gray-200 rounded-lg p-2.5 text-sm font-bold text-gray-800 focus:outline-none shadow-inner"
            />
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button 
              onClick={onGenerarFactura}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer"
            >
              PF-14: Generar Factura y Cerrar Orden
            </button>
            <button 
              onClick={onBack}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer"
            >
              PF-12: Volver al Detalle
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}