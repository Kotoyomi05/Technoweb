import React from 'react';

export default function ConfirmacionView({ onGoToOrders, onCreateAnother }) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          CONFIRMACIÓN DE REGISTRO
        </span>
      </div>

      {/* Tarjeta de Confirmación */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center max-w-2xl mx-auto space-y-6">
        
        {/* Icono de éxito */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-500 text-emerald-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Textos principales */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
            Orden de trabajo creada exitosamente
          </h2>
          <p className="text-2xl font-extrabold text-blue-600 mt-2">
            Código de Seguimiento: #1043
          </p>
        </div>

        {/* Resumen del cliente y dispositivo */}
        <div className="text-sm text-gray-700 space-y-1 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <p><span className="font-semibold text-gray-900">Cliente:</span> Ana García</p>
          <p><span className="font-semibold text-gray-900">Dispositivo:</span> Laptop HP Pavilion 15-cs</p>
          <p className="pt-1">
            <span className="font-semibold text-gray-900">Estado Inicial:</span>{' '}
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
              En Cola de Diagnóstico
            </span>
          </p>
        </div>

        {/* Acciones Siguientes */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Acciones Siguientes
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={onGoToOrders}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer"
            >
              PF-02: Ver Listado de Órdenes
            </button>
            <button 
              onClick={onCreateAnother}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer"
            >
              PF-05: Crear Otra Orden
            </button>
          </div>
          <div className="mt-3">
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm cursor-pointer">
              Imprimir Etiqueta de Servicio
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}