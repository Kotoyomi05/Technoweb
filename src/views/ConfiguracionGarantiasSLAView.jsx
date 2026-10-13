import React, { useState } from 'react';

export default function ConfiguracionGarantiasSLAView({ onBack }) {
  const [garantiaServicio, setGarantiaServicio] = useState('90');
  const [garantiaPiezas, setGarantiaPiezas] = useState('180');
  const [extensionGarantia, setExtensionGarantia] = useState(true);

  const [terminos, setTerminos] = useState({
    cubreManoObraPiezas: true,
    cubreDanosAccidentales: false,
    garantiaNulaTerceros: true,
  });

  const [sla, setSla] = useState({
    tiempoDiagnostico: '24',
    tiempoReparacion: '72',
    notificarIncumplimiento: true,
    prioridadCritico: '4',
    prioridadEstandard: '72',
  });

  const handleTerminoChange = (key) => {
    setTerminos(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - PARÁMETROS DE GARANTÍA Y SLA (PS-04)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Garantía */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Garantía
            </h3>

            {/* Políticas de Garantía Predeterminadas */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Políticas de Garantía Predeterminadas:</h4>
              
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                  <span>Garantía General (Servicio):</span>
                  <input
                    type="number"
                    value={garantiaServicio}
                    onChange={(e) => setGarantiaServicio(e.target.value)}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>Días</span>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                  <span>Garantía de Piezas (Repuestos):</span>
                  <input
                    type="number"
                    value={garantiaPiezas}
                    onChange={(e) => setGarantiaPiezas(e.target.value)}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>Días</span>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={extensionGarantia}
                    onChange={() => setExtensionGarantia(!extensionGarantia)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar extensión de garantía opcional.</span>
                </label>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Términos y Condiciones:</h4>
              
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={terminos.cubreManoObraPiezas}
                    onChange={() => handleTerminoChange('cubreManoObraPiezas')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cubre mano de obra y piezas.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={terminos.cubreDanosAccidentales}
                    onChange={() => handleTerminoChange('cubreDanosAccidentales')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cubre daños accidentales.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={terminos.garantiaNulaTerceros}
                    onChange={() => handleTerminoChange('garantiaNulaTerceros')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Garantía nula si hay manipulación por terceros.</span>
                </label>
              </div>
            </div>

            {/* Documentación */}
            <div className="pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800 mb-2">Documentación:</h4>
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Ver Plantilla de Certificado de Garantía]
              </button>
            </div>
          </div>

          {/* Card 2: Configuración de Acuerdos de Nivel de Servicio (SLA) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Acuerdos de Nivel de Servicio (SLA)
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Tiempos de Respuesta y Resolución (SLA):</h4>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Tiempo Objetivo de Diagnóstico (SLA):</span>
                  <input
                    type="number"
                    value={sla.tiempoDiagnostico}
                    onChange={(e) => setSla({ ...sla, tiempoDiagnostico: e.target.value })}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>Horas</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span>Tiempo Objetivo de Reparación (SLA - Estándar):</span>
                  <input
                    type="number"
                    value={sla.tiempoReparacion}
                    onChange={(e) => setSla({ ...sla, tiempoReparacion: e.target.value })}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>Horas</span>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={sla.notificarIncumplimiento}
                    onChange={() => setSla(prev => ({ ...prev, notificarIncumplimiento: !prev.notificarIncumplimiento }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar notificaciones de incumplimiento de SLA a gerentes.</span>
                </label>
              </div>
            </div>

            {/* Prioridades */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Prioridades:</h4>

              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Crítico (Empresarial):</span>
                  <input
                    type="number"
                    value={sla.prioridadCritico}
                    onChange={(e) => setSla({ ...sla, prioridadCritico: e.target.value })}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>Horas Resolución</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Estándar (Personal):</span>
                  <input
                    type="number"
                    value={sla.prioridadEstandard}
                    onChange={(e) => setSla({ ...sla, prioridadEstandard: e.target.value })}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>Horas Resolución</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Garantía PS-04 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Garantía PS-04:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Políticas Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[3]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Reclamaciones (Mes):</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[2]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Actualización:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Estado de SLA (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado de SLA (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Reparación Estándar:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>72h</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Diagnóstico Exprés:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>24h</span>
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-19: GUARDAR CONFIGURACIÓN PS-04
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-04)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR POLÍTICAS DE RECLAMACIÓN
        </button>
      </div>
    </main>
  );
}