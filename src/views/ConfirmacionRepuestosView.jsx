import React from 'react';

export default function ConfirmacionRepuestosView({ onGoToDetail, onAssignMore }) {
  const repuestosDescontados = [
    { id: 'REP-0098', nombre: 'Jack DC HP Pavilion', cantidad: 1, stockAnterior: '28', stockNuevo: '27' },
    { id: 'INS-0010', nombre: 'Pasta Térmica', cantidad: 1, stockAnterior: '50+', stockNuevo: '50+' },
  ];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          CONFIRMACIÓN DE ASIGNACIÓN Y DESCUENTO DE STOCK
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

        {/* Encabezado */}
        <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
          REPUESTOS ASIGNADOS Y STOCK ACTUALIZADO
        </h2>

        {/* Tabla / Lista de resumen de descuento */}
        <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden divide-y divide-gray-200 text-xs text-gray-700">
          {repuestosDescontados.map((item) => (
            <div key={item.id} className="p-3.5 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-gray-900 w-20 text-left">{item.id}</span>
              <span className="text-gray-800 font-medium flex-1 text-left">{item.nombre}</span>
              <span className="text-gray-600">Cantidad: {item.cantidad}</span>
              <span className="text-gray-500">Stock Anterior: {item.stockAnterior}</span>
              <span className="font-bold text-gray-900">Stock Nuevo: {item.stockNuevo}</span>
            </div>
          ))}
        </div>

        {/* Acciones Siguientes */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Acciones Siguientes
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={onGoToDetail}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-lg text-xs transition shadow-sm cursor-pointer"
            >
              PF-12: Volver a la Ficha de la Orden
            </button>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2.5 rounded-lg text-xs transition shadow-sm cursor-pointer">
              Imprimir Comprobante de Salida
            </button>
          </div>
          <div className="mt-3">
            <button 
              onClick={onAssignMore}
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer"
            >
              Asignar Otro Repuesto
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}