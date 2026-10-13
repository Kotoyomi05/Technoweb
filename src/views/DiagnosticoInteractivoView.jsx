import React from 'react';

export default function DiagnosticoInteractivoView({ onBack, onRegistrarResultado }) {
  const pasos = [
    {
      id: 1,
      titulo: 'Inspección Visual',
      detalle: 'Carcasa rayada, tornillos faltantes',
      estado: 'completado',
    },
    {
      id: 2,
      titulo: 'Pruebas de Encendido (POST)',
      detalle: 'Pasa OK, sin códigos de error',
      estado: 'completado',
    },
    {
      id: 3,
      titulo: 'Verificación de BIOS/UEFI',
      detalle: 'Versión F.20, configuraciones por defecto',
      estado: 'completado',
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
        <span>Volver al Detalle de la Orden</span>
      </button>

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
          MÓDULO DE DIAGNÓSTICO INTERACTIVO - ORDEN #1042
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Pasos de Diagnóstico (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Pasos de Diagnóstico
          </h3>

          <div className="space-y-3">
            {/* Pasos Completados */}
            {pasos.map((paso) => (
              <div 
                key={paso.id} 
                className="flex items-center justify-between p-3 bg-gray-50/70 border border-gray-200 rounded-lg text-xs"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span className="font-semibold text-gray-800">{paso.titulo}:</span>
                  <span className="text-gray-600">[{paso.detalle}]</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold">✓</span>
                  <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Paso en Progreso */}
            <div className="border border-amber-200 bg-amber-50/40 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between text-amber-800 font-medium">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{'>'}</span>
                  <span className="font-bold">Pruebas de Memoria (RAM):</span>
                  <span className="italic text-amber-700">[En Progreso...]</span>
                </div>
                <span className="animate-spin text-amber-600">⚙</span>
              </div>

              {/* Sub-pasos */}
              <div className="pl-4 space-y-1 text-[11px] text-gray-700 pt-1 border-t border-amber-100">
                <p><span className="font-medium text-gray-500">Sub-paso: Módulo 1 (8GB):</span> <span className="font-bold text-emerald-600">[PASSED]</span></p>
                <p><span className="font-medium text-gray-500">Sub-paso: Módulo 2 (8GB):</span> <span className="font-bold text-amber-600">[Testing...]</span></p>
              </div>
            </div>

            {/* Pasos Pendientes */}
            <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-lg text-xs text-gray-500 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-400">]</span> <span className="font-medium text-gray-700">Pruebas de Almacenamiento (SSD):</span> <span>[Pendiente]</span>
              </div>
            </div>

            <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-lg text-xs text-gray-500 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-400">]</span> <span className="font-medium text-gray-700">Pruebas de Rendimiento (CPU/GPU):</span> <span>[Pendiente]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen del Diagnóstico (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen del Diagnóstico
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Equipo:</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">Laptop HP Pavilion</p>
            </div>

            <div>
              <span className="text-gray-500 font-medium block">Técnico:</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">Jack Rowe</p>
            </div>

            <div>
              <span className="text-gray-500 font-medium block">Estado Actual:</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">Diagnóstico en curso</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500 font-medium">Progreso:</span>
                <span className="font-bold text-gray-900">55%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-slate-800 h-2.5 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-500 font-medium block">Tiempo transcurrido:</span>
              <p className="text-sm font-mono font-bold text-gray-800 mt-0.5">01:35:42</p>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={onRegistrarResultado}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
          >
            PF-06: REGISTRAR RESULTADO DE PRUEBA
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            GENERAR REPORTE PRELIMINAR
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          AGREGAR PASO ADICIONAL
        </button>
      </div>
    </main>
  );
}