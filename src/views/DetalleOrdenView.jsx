import React from 'react';

export default function DetalleOrdenView({ 
  onBack, 
  onOpenDiagnostico, 
  onOpenGestionarRepuestos, 
  onRegistrarCierre 
}) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Botón Volver */}
      <button 
        onClick={onBack} 
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver a Órdenes</span>
      </button>

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
          DETALLE COMPLETO DE ORDEN DE SERVICIO
        </h1>
      </div>

      <div className="space-y-6">
        {/* Card 1: Información General y Estado */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
            <h3 className="font-semibold text-gray-900 text-base">
              Información General y Estado
            </h3>
            <span className="bg-slate-800 text-white text-xs px-3 py-1 rounded-full font-medium self-start sm:self-auto">
              EN PROCESO - Diagnóstico
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-gray-500 font-semibold uppercase block">ID Orden:</span>
              <p className="text-gray-900 font-bold text-sm mt-0.5">#1042</p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold uppercase block">Fecha Creación:</span>
              <p className="text-gray-800 font-medium mt-0.5">09/09/2024</p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold uppercase block">Cliente:</span>
              <p className="text-gray-900 font-semibold mt-0.5">
                Ana García{' '}
                <button className="text-blue-600 hover:underline font-normal text-[11px] cursor-pointer ml-0.5">
                  (ver detalle)
                </button>
              </p>
            </div>

            <div>
              <span className="text-gray-500 font-semibold uppercase block">Técnico Asignado:</span>
              <p className="text-gray-900 font-semibold mt-0.5">
                Jack Rowe{' '}
                <button className="text-blue-600 hover:underline font-normal text-[11px] cursor-pointer ml-0.5">
                  (ver perfil)
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Grid Datos del Equipo y Falla Reportada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Datos del Equipo */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">
              Datos del Equipo
            </h3>
            <p className="text-xs text-gray-800 font-medium leading-relaxed pt-1">
              Laptop HP Pavilion | Marca: HP | Modelo: 15-cs3000la | S/N: CND945723X
            </p>
          </div>

          {/* Falla Reportada */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-2">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-2">
              Falla Reportada
            </h3>
            <p className="text-xs text-gray-800 font-medium leading-relaxed pt-1">
              El equipo no enciende. Se queda en el logo de HP.
            </p>
          </div>
        </div>

        {/* Card 3: Seguimiento y Acciones */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Seguimiento y Acciones
          </h3>

          {/* Timeline de Seguimiento */}
          <div className="relative pl-6 space-y-4 text-xs border-l-2 border-gray-200 ml-2">
            {/* Evento 1 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-medium">1</span>
                <span className="text-gray-600 font-medium">09/09/2024 14:35</span>
                <span className="text-gray-900 font-semibold">• Orden Creada (Jack Rowe)</span>
              </div>
            </div>

            {/* Evento 2 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white" />
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-medium">2</span>
                <span className="text-gray-600 font-medium">09/09/2024 15:00</span>
                <span className="text-gray-900 font-semibold">• Equipo Recepcionado (Ana García)</span>
              </div>
            </div>

            {/* Evento 3 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-0.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white" />
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 font-medium">3</span>
                <span className="text-gray-600 font-medium">09/09/2024 16:30</span>
                <span className="text-gray-900 font-semibold">• En Diagnóstico (Jack Rowe)</span>
              </div>
              <p className="text-gray-700 font-medium mt-1 pl-4 text-[11px] italic">
                <span className="font-bold not-italic text-gray-900">*Nota Técnica:</span> Se sospecha falla en la placa madre. Se requieren pruebas adicionales.
              </p>
            </div>
          </div>

          {/* Sección Botones Acciones Disponibles */}
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <h4 className="text-xs font-bold text-gray-900 uppercase">
              Acciones Disponibles
            </h4>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenDiagnostico}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer uppercase tracking-wider"
              >
                PF-04: REGISTRAR DIAGNÓSTICO / AVANCE
              </button>

              <button
                onClick={onOpenGestionarRepuestos}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer uppercase tracking-wider"
              >
                PF-05: SOLICITAR REPUESTOS / PRESUPUESTO
              </button>

              <button
                onClick={onRegistrarCierre}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg text-xs transition shadow-sm cursor-pointer uppercase tracking-wider"
              >
                PF-14: CERRAR ORDEN Y FACTURAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}