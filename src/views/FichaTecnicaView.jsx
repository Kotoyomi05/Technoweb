import React from 'react';

export default function FichaTecnicaView({ onBack, onSolicitarRepuestos }) {
  const lecturas = [
    { parametro: 'Voltaje de Entrada (AC)', valor: '[120.5 V]' },
    { parametro: 'Voltaje de Salida (DC - Carril 1)', valor: '[12.1 V]' },
    { parametro: 'Voltaje de Salida (DC - Carril 2)', valor: '[5.0 V]' },
    { parametro: 'Voltaje de Referencia (RAM)', valor: '[1.35 V]' },
    { parametro: 'Voltaje de Batería (CMOS)', valor: '[3.05 V]' },
  ];

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
        <span>Volver a Detalle de Orden</span>
      </button>

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
          FICHA TÉCNICA DEL EQUIPO - ORDEN #1042
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Parámetros Eléctricos (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Parámetros Eléctricos
          </h3>

          {/* Tabla de Lecturas */}
          <div className="overflow-x-auto border border-gray-100 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-4">Parámetro</th>
                  <th className="py-2.5 px-4">Valor Lecturado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {lecturas.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-4 font-medium text-gray-700">{item.parametro}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">{item.valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Estado de Lecturas y Fecha */}
          <div className="pt-2 space-y-2 text-xs">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-gray-800">Estado de las Lecturas:</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold text-[11px] flex items-center space-x-1">
                <span>✓</span>
                <span>Todas dentro de rango</span>
              </span>
            </div>

            <div className="flex items-center space-x-3 pt-1">
              <span className="font-bold text-gray-800">Última Actualización:</span>
              <span className="text-gray-600 font-medium">09/09/2024 14:35:22</span>
            </div>
          </div>
        </div>

        {/* Información del Equipo (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Información del Equipo
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Equipo:</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">Laptop HP Pavilion</p>
            </div>

            <div>
              <span className="text-gray-500 font-medium block">S/N:</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">CND945723X</p>
            </div>

            <div>
              <span className="text-gray-500 font-medium block">Técnico:</span>
              <p className="text-sm font-semibold text-gray-900 mt-0.5">Jack Rowe</p>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center gap-3">
        <button 
          onClick={onSolicitarRepuestos}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          PF-05: SOLICITAR REPUESTOS / PRESUPUESTO
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GENERAR REPORTE DE VOLTAJE (PDF)
        </button>
      </div>
    </main>
  );
}