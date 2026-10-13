import React, { useState } from 'react';

export default function ConfiguracionIntegracionesView({ onBack }) {
  const [formatos, setFormatos] = useState({
    csv: true,
    pdf: true,
    json: true,
  });

  const [habilitarAuto, setHabilitarAuto] = useState(true);
  const [frecuencia, setFrecuencia] = useState('Semanal - Lunes 06:00');
  const [enmascararGdpr, setEnmascararGdpr] = useState(true);

  const [integraciones, setIntegraciones] = useState({
    stripe: true,
    servientrega: true,
    dian: true,
    apiPublica: true,
  });

  const handleFormatoChange = (key) => {
    setFormatos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleIntegracionChange = (key) => {
    setIntegraciones(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - INTEGRACIONES Y EXPORTACIÓN (PA-07)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Exportación e Integraciones (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Exportación de Datos */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Exportación de Datos
            </h3>

            {/* Formatos de Exportación Predeterminados */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Formatos de Exportación Predeterminados:</h4>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatos.csv}
                    onChange={() => handleFormatoChange('csv')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>CSV (Informes Generales)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatos.pdf}
                    onChange={() => handleFormatoChange('pdf')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>PDF (Facturas y Garantías)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatos.json}
                    onChange={() => handleFormatoChange('json')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>JSON (Integración API)</span>
                </label>
              </div>

              <div className="pt-1">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Gestionar Formatos]
                </button>
              </div>
            </div>

            {/* Programación de Exportación Automática */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Programación de Exportación Automática:</h4>
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={habilitarAuto}
                    onChange={() => setHabilitarAuto(!habilitarAuto)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar reportes automáticos.</span>
                </label>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-medium text-gray-700">Frecuencia:</span>
                  <select
                    value={frecuencia}
                    onChange={(e) => setFrecuencia(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Diario - 00:00">Diario - 00:00</option>
                    <option value="Semanal - Lunes 06:00">Semanal - Lunes 06:00</option>
                    <option value="Mensual - Día 1">Mensual - Día 1</option>
                  </select>
                </div>
              </div>

              <div className="text-xs text-gray-600 pt-1">
                <span className="font-medium">Destino: </span>
                <span className="font-semibold text-gray-800">[Correo Electrónico Admin], [Servidor FTP]</span>
              </div>
            </div>

            {/* Preferencias de Datos Sensibles */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Preferencias de Datos Sensibles en Exportación:</h4>
              <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enmascararGdpr}
                  onChange={() => setEnmascararGdpr(!enmascararGdpr)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Enmascarar datos personales (GDPR) en reportes públicos.</span>
              </label>
            </div>
          </div>

          {/* Card 2: Configuración de Integraciones Externas */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Integraciones Externas
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Integraciones Activas:</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.stripe}
                    onChange={() => handleIntegracionChange('stripe')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Pasarela de Pagos (Stripe)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.servientrega}
                    onChange={() => handleIntegracionChange('servientrega')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Proveedor de Envío (Servientrega)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.dian}
                    onChange={() => handleIntegracionChange('dian')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Servicio de Facturación Electrónica (DIAN)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.apiPublica}
                    onChange={() => handleIntegracionChange('apiPublica')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>API Pública [Clave API: ... Ocultar]</span>
                </label>
              </div>

              <div className="pt-2">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Gestionar Proveedores]
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Integraciones PA-07 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Integraciones PA-07
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Integraciones Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Formatos de Exportación:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[3]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Reportes Programados:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[2]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Exportación:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024 06:00]</span>
              </div>
            </div>
          </div>

          {/* Estado de Conexiones (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado de Conexiones (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-800">
              <div className="flex justify-between items-center">
                <span>Stripe:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>En línea</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span>DIAN:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Sincronizado</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span>Servientrega:</span>
                <span className="inline-flex items-center space-x-1 text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                  <span>🟡</span>
                  <span>Latencia alta</span>
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
            PF-22: GUARDAR CONFIGURACIÓN PA-07
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-07)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          VER REGISTRO DE INTEGRACIONES
        </button>
      </div>
    </main>
  );
}