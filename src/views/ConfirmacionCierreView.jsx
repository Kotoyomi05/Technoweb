import React from 'react';

export default function ConfirmacionCierreView({ onGoToOrders }) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          CONFIRMACIÓN DE CIERRE Y FACTURACIÓN
        </span>
      </div>

      {/* Tarjeta de Confirmación */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center max-w-xl mx-auto space-y-6">
        
        {/* Ícono de Éxito / Done */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex flex-col items-center justify-center border-2 border-emerald-500 text-emerald-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider -mt-1">Done</span>
          </div>
        </div>

        {/* Encabezado Principal */}
        <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase leading-snug">
          ORDEN #1042 FINALIZADA Y FACTURA GENERADA
        </h2>

        {/* Datos Resumidos de Facturación */}
        <div className="space-y-2 text-sm text-gray-700 pt-2">
          <p><span className="font-semibold text-gray-900">Factura Nº:</span> F-009845</p>
          <p><span className="font-semibold text-gray-900">Cliente:</span> Ana García</p>
          
          <p className="text-2xl font-extrabold text-emerald-600 pt-2">
            Monto Total: $ 550.000 COP
          </p>

          <p className="pt-2">
            <span className="font-semibold text-gray-900">Estado Final:</span>{' '}
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              FINALIZADO - ENTREGADO
            </span>
          </p>
        </div>

        {/* Acciones Siguientes */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Acciones Siguientes
          </p>
          <div className="flex flex-col items-center space-y-3">
            <button 
              onClick={onGoToOrders}
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer"
            >
              PF-02: Volver al Listado de Órdenes
            </button>
            
            <button className="w-full max-w-xs bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm cursor-pointer">
              PF-16: Enviar Factura por Correo
            </button>

            <button className="w-full max-w-xs bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm cursor-pointer">
              Imprimir Factura en PDF
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}