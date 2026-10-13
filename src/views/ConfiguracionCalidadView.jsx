import React, { useState } from 'react';

export default function ConfiguracionCalidadView({ onBack }) {
  const [habilitarAuditorias, setHabilitarAuditorias] = useState(true);
  const [puntuacionMinima, setPuntuacionMinima] = useState(4.5);
  const [enviarEncuesta, setEnviarEncuesta] = useState(true);

  const [metricas, setMetricas] = useState({
    tasaReingresos: true,
    tiempoPromedio: true,
  });

  const [checklist, setChecklist] = useState([
    { id: 'hw', nombre: 'Hardware', icono: '🔧' },
    { id: 'sw', nombre: 'Software', icono: '💻' },
    { id: 'limp', nombre: 'Limpieza', icono: '🧼' },
    { id: 'doc', nombre: 'Documentación', icono: '📄' },
  ]);

  const handleMetricaChange = (key) => {
    setMetricas(prev => ({ ...prev, [key]: !prev[key] }));
  };

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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - MÓDULO DE CALIDAD (PA-05)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Configuración de Estándares de Calidad (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Configuración de Estándares de Calidad
          </h3>

          {/* Auditorías de Proceso (Checklist) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-800">Auditorías de Proceso (Checklist):</h4>
            
            <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={habilitarAuditorias}
                onChange={() => setHabilitarAuditorias(!habilitarAuditorias)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Habilitar auditorías de calidad en control de calidad.</span>
            </label>

            <div className="pt-2 space-y-2">
              <span className="text-xs font-medium text-gray-600 block">
                Lista de Verificación:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {checklist.map((item) => (
                  <span 
                    key={item.id} 
                    className="bg-gray-100 border border-gray-200 text-gray-800 font-medium px-3 py-1 rounded-lg text-xs flex items-center space-x-1.5 shadow-2xs"
                  >
                    <span>{item.icono}</span>
                    <span>{item.nombre}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Editar Checklist]
              </button>
            </div>
          </div>

          {/* Umbrales de Satisfacción del Cliente */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800">Umbrales de Satisfacción del Cliente:</h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700">
                  Puntuación Mínima Aceptable: <strong className="text-gray-900">[{puntuacionMinima} / 5]</strong>
                </span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.1"
                value={puntuacionMinima}
                onChange={(e) => setPuntuacionMinima(parseFloat(e.target.value))}
                className="w-full sm:w-80 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={enviarEncuesta}
                onChange={() => setEnviarEncuesta(!enviarEncuesta)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Enviar encuesta de satisfacción automática al finalizar.</span>
            </label>
          </div>

          {/* Métricas de Calidad del Taller */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800">Métricas de Calidad del Taller:</h4>

            <div className="space-y-2 text-xs text-gray-700">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={metricas.tasaReingresos}
                  onChange={() => handleMetricaChange('tasaReingresos')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Tasa de reingresos (máx. 5%)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={metricas.tiempoPromedio}
                  onChange={() => handleMetricaChange('tiempoPromedio')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Tiempo promedio de control de calidad (máx. 2h)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Calidad PA-05 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Calidad PA-05
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Auditorías Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Tasa de Satisfacción Actual:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4.8 / 5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Tasa de Reingresos Mensual:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[2.1%]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Modificación:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Alertas de Calidad (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Alertas de Calidad (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-800">
              <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-lg">
                <p className="font-bold text-rose-900">Alerta #Q-001:</p>
                <p className="text-rose-800 text-[11px] mt-0.5">Baja satisfacción en Orden</p>
              </div>

              <div className="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg">
                <p className="font-bold text-amber-900">Alerta #Q-002:</p>
                <p className="text-amber-800 text-[11px] mt-0.5">Tasa de Hardware supera el 5% (Sucursal Norte).</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-20: GUARDAR CONFIGURACIÓN PA-05
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-05)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR ENCUESTAS Y ALERTAS
        </button>
      </div>
    </main>
  );
}