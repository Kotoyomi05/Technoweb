import React, { useState } from 'react';

export default function ConfiguracionCalidadQAView({ onBack }) {
  const [checklists, setChecklists] = useState({
    recepcion: true,
    reparacion: true,
    calidadFinal: true,
    entregaCliente: true,
  });

  const [csatMinimo, setCsatMinimo] = useState('4.8');
  const [tasaMaxReingreso, setTasaMaxReingreso] = useState('5');

  const [auditoriaAleatoria, setAuditoriaAleatoria] = useState(true);
  const [frecuenciaAuditoria, setFrecuenciaAuditoria] = useState('Semanal');
  const [aprobacionAltoValor, setAprobacionAltoValor] = useState(true);

  const [pruebasRendimiento, setPruebasRendimiento] = useState({
    estresPlacaBase: false,
    registrarTempVoltaje: true,
  });

  const handleChecklistChange = (key) => {
    setChecklists(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePruebasChange = (key) => {
    setPruebasRendimiento(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - CONTROL DE CALIDAD Y QA (PS-05)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Listas de Verificación (Checklists) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Listas de Verificación (Checklists)
            </h3>

            {/* Checklists Predeterminados */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Checklists Predeterminados:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklists.recepcion}
                    onChange={() => handleChecklistChange('recepcion')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Checklist de Recepción de Equipos</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklists.reparacion}
                    onChange={() => handleChecklistChange('reparacion')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Checklist de Reparación de Hardware</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklists.calidadFinal}
                    onChange={() => handleChecklistChange('calidadFinal')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Checklist de Control de Calidad Final</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklists.entregaCliente}
                    onChange={() => handleChecklistChange('entregaCliente')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Checklist de Entrega al Cliente</span>
                </label>
              </div>
            </div>

            {/* Personalización de Checklists */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <h4 className="text-xs font-bold text-gray-800">Personalización de Checklists:</h4>
              <div className="flex flex-wrap gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Editar Checklist de Calidad Final]
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Crear Nuevo Checklist]
                </button>
              </div>
            </div>

            {/* Umbrales de Calidad */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Umbrales de Calidad:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Umbral Mínimo de Satisfacción del Cliente (CSAT):</span>
                  <input
                    type="text"
                    value={csatMinimo}
                    onChange={(e) => setCsatMinimo(e.target.value)}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>/ 5.0</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span>Tasa Máxima de Reingreso por Garantía:</span>
                  <input
                    type="number"
                    value={tasaMaxReingreso}
                    onChange={(e) => setTasaMaxReingreso(e.target.value)}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Auditorías y Pruebas */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Auditorías y Pruebas
            </h3>

            {/* Políticas de Auditoría */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Políticas de Auditoría:</h4>

              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={auditoriaAleatoria}
                    onChange={() => setAuditoriaAleatoria(!auditoriaAleatoria)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar auditoría aleatoria de reparaciones (10%).</span>
                </label>

                <div className="flex items-center space-x-2">
                  <span>Frecuencia de Auditoría Interna:</span>
                  <select
                    value={frecuenciaAuditoria}
                    onChange={(e) => setFrecuenciaAuditoria(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Diario">Diario</option>
                    <option value="Semanal">Semanal</option>
                    <option value="Quincenal">Quincenal</option>
                    <option value="Mensual">Mensual</option>
                  </select>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={aprobacionAltoValor}
                    onChange={() => setAprobacionAltoValor(!aprobacionAltoValor)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Requerir aprobación de QA para equipos de alto valor.</span>
                </label>
              </div>
            </div>

            {/* Pruebas de Rendimiento */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Pruebas de Rendimiento:</h4>

              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pruebasRendimiento.estresPlacaBase}
                    onChange={() => handlePruebasChange('estresPlacaBase')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Ejecutar pruebas de estrés automáticas en reparaciones de placa base.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pruebasRendimiento.registrarTempVoltaje}
                    onChange={() => handlePruebasChange('registrarTempVoltaje')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Registrar temperatura y voltaje tras reparación.</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de QA PS-05 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de QA PS-05:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Checklists Activos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Auditorías (Mes):</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[15]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Auditoría:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Estado de Calidad (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado de Calidad (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">CSAT Promedio:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>[4.9/5.0]</span>
                  <span>🟢</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Reingresos:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>[2.1%]</span>
                  <span>🟢</span>
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
            PF-20: GUARDAR CONFIGURACIÓN PS-05
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-05)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          VER REGISTRO DE AUDITORÍAS
        </button>
      </div>
    </main>
  );
}