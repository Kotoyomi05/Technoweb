import React from 'react';

export default function CentroAnaliticaView({ onBack }) {
  const topRepuestos = [
    { nombre: 'REP-FAN-G15', porcentaje: '35%' },
    { nombre: 'REP-SSD-MX500', porcentaje: '25%' },
    { nombre: 'REP-BAT-HP01', porcentaje: '20%' },
    { nombre: 'REP-RAM-DDR4', porcentaje: '15%' },
    { nombre: 'OTROS', porcentaje: '5%' },
  ];

  const causasFalla = [
    { causa: 'Falla de Hardware', porcentaje: '45%' },
    { causa: 'Software/SO', porcentaje: '30%' },
    { causa: 'Daño por Líquidos', porcentaje: '10%' },
    { causa: 'Mantenimiento Preventivo', porcentaje: '10%' },
    { causa: 'Otro', porcentaje: '5%' },
  ];

  const ordenesMensuales = [
    { mes: 'Ene', valor: 120 },
    { mes: 'Feb', valor: 135 },
    { mes: 'Mar', valor: 150 },
    { mes: 'Abr', valor: 145 },
    { mes: 'May', valor: 160 },
    { mes: 'Jun', valor: 180 },
  ];

  const tiemposPromedio = [
    { mes: 'Ene', valor: '3.2' },
    { mes: 'Feb', valor: '3.0' },
    { mes: 'Mar', valor: '2.8' },
    { mes: 'Abr', valor: '2.9' },
    { mes: 'May', valor: '2.9' },
    { mes: 'May', valor: '2.7' },
    { mes: 'Jun', valor: '2.5' },
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
          CENTRO DE REPORTES INTELIGENTES Y ANALÍTICA (BI)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Dashboard de Rendimiento Global (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Dashboard de Rendimiento Global
          </h3>

          {/* Gráfico 1: Órdenes de Servicio por Mes (Barras) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-700 uppercase">
              Órdenes de Servicio por Mes (Barras)
            </h4>
            
            <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100">
              <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-gray-300 relative">
                {/* Líneas de escala visuales */}
                <span className="absolute left-0 top-0 text-[10px] text-gray-400 font-mono">180</span>
                <span className="absolute left-0 top-1/2 text-[10px] text-gray-400 font-mono">100</span>
                <span className="absolute left-0 bottom-1 text-[10px] text-gray-400 font-mono">0</span>

                {ordenesMensuales.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end z-10">
                    <span className="text-[11px] font-bold text-gray-700">{item.valor}</span>
                    <div 
                      className="w-full max-w-[42px] bg-blue-600 rounded-t-sm transition-all hover:bg-blue-700" 
                      style={{ height: `${(item.valor / 180) * 100}%` }}
                    />
                    <span className="text-xs font-semibold text-gray-600 mt-1">{item.mes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gráfico 2: Tiempos de Reparación Promedio (Línea) */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-gray-700 uppercase">
              Tiempos de Reparación Promedio (Línea)
            </h4>

            <div className="bg-gray-50/60 p-4 rounded-xl border border-gray-100">
              <div className="h-28 flex items-center justify-between px-3 border-b border-gray-300 relative">
                {tiemposPromedio.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 z-10">
                    <span className="text-[11px] font-bold text-gray-800">{item.valor}</span>
                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white shadow-xs" />
                    <span className="text-xs font-semibold text-gray-600 mt-2">{item.mes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Top 5 Repuestos Más Utilizados */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Top 5 Repuestos Más Utilizados
            </h3>

            <ol className="space-y-2.5 text-xs font-medium text-gray-800 list-decimal list-inside">
              {topRepuestos.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{idx + 1}. {item.nombre}</span>
                  <span className="font-bold text-gray-900">({item.porcentaje})</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Distribución de Causas de Falla */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Distribución de Causas de Falla
            </h3>

            <ol className="space-y-2.5 text-xs font-medium text-gray-800 list-decimal list-inside">
              {causasFalla.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{idx + 1}. {item.causa}</span>
                  <span className="font-bold text-gray-900">({item.porcentaje})</span>
                </li>
              ))}
            </ol>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-12: GENERAR REPORTE EJECUTIVO (PDF)
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            CONFIGURAR NUEVO REPORTE PERSONALIZADO
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PROGRAMAR ENVÍO DE REPORTES
        </button>
      </div>
    </main>
  );
}