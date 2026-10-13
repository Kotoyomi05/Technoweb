import React, { useState } from 'react';

export default function ConfiguracionMensajesExportacionView({ onBack }) {
  const [formatos, setFormatos] = useState({
    pdf: true,
    csv: true,
    json: true,
    xml: true,
  });

  const [enmascararGdpr, setEnmascararGdpr] = useState(true);
  const [mostrarErroresConsola, setMostrarErroresConsola] = useState(true);
  const [nivelRegistro, setNivelRegistro] = useState('Advertencias y Errores Críticos');

  const handleFormatoChange = (key) => {
    setFormatos(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - MENSAJES DE ERROR / INTEGRACIONES Y EXPORTACIÓN (PS-08)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Formatos y Privacidad (GDPR / Ley 1581) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Exportación y Enmascaramiento de Datos
            </h3>

            {/* Formatos de Exportación Permitidos */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Formatos de Exportación Permitidos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatos.pdf}
                    onChange={() => handleFormatoChange('pdf')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>PDF (Informes)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatos.csv}
                    onChange={() => handleFormatoChange('csv')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>CSV (Datos de Clientes, Órdenes)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatos.json}
                    onChange={() => handleFormatoChange('json')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>JSON (Copia de Seguridad)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatos.xml}
                    onChange={() => handleFormatoChange('xml')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>XML (Integración Legacy)</span>
                </label>
              </div>
            </div>

            {/* Preferencias de Datos Sensibles (GDPR / Ley 1581) */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Preferencias de Privacidad y Cumplimiento (Ley 1581 / GDPR):</h4>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2">
                <label className="flex items-center space-x-2 text-xs text-emerald-900 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={enmascararGdpr}
                    onChange={() => setEnmascararGdpr(!enmascararGdpr)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Enmascarar datos personales (GDPR) en reportes públicos.</span>
                </label>
                <p className="text-[11px] text-emerald-800 pl-5">
                  Los mensajes y salidas de exportación no revelan información personal o sensible innecesaria.
                </p>
              </div>
            </div>

            {/* Mensajes de Error y Gestión de Logs */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Mensajes de Error y Auditoría de Exportación:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mostrarErroresConsola}
                    onChange={() => setMostrarErroresConsola(!mostrarErroresConsola)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mostrar notificaciones de errores detalladas en consola de administración.</span>
                </label>

                <div className="flex items-center space-x-2 pt-1">
                  <span className="font-medium text-gray-700">Nivel de Registro:</span>
                  <select
                    value={nivelRegistro}
                    onChange={(e) => setNivelRegistro(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Solo Errores Críticos">Solo Errores Críticos</option>
                    <option value="Advertencias y Errores Críticos">Advertencias y Errores Críticos</option>
                    <option value="Depuración Completa (Debug)">Depuración Completa (Debug)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Exportación PS-08 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Exportación PS-08:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Formatos Activos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Enmascaramiento GDPR:</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">[Activado]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Modificación:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Estado del Sistema (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado del Sistema (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Cumplimiento:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Óptimo (GDPR)</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Exportaciones (Mes):</span>
                <span className="font-bold text-gray-900 text-sm">[142]</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-23: GUARDAR CONFIGURACIÓN PS-08
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-08)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PROBAR EXPORTACIÓN Y ENMASCARAMIENTO
        </button>
      </div>
    </main>
  );
}