import React, { useState } from 'react';

export default function ConfiguracionIntegracionesExportacionView({ onBack }) {
  const [integraciones, setIntegraciones] = useState({
    stripe: true,
    twilio: true,
    sendgrid: true,
    quickbooks: true,
  });

  const [apiKey, setApiKey] = useState('sk_test_51Mz...••••••••');
  const [webhookEnabled, setWebhookEnabled] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState('https://api.techserviceweb.com/webhook');

  const [formatosExportacion, setFormatosExportacion] = useState({
    pdf: true,
    csv: true,
    json: true,
    xml: true,
  });

  const [backupNocturno, setBackupNocturno] = useState(true);
  const [frecuenciaExport, setFrecuenciaExport] = useState('Diario - 03:00 AM');

  const handleIntegracionChange = (key) => {
    setIntegraciones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFormatoChange = (key) => {
    setFormatosExportacion(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - INTEGRACIONES Y EXPORTACIÓN (PS-07)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Integraciones de Terceros */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Integraciones de Terceros
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.stripe}
                    onChange={() => handleIntegracionChange('stripe')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Pasarela de Pago (Stripe - Configurado)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.twilio}
                    onChange={() => handleIntegracionChange('twilio')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Proveedor de SMS (Twilio - Configurado)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.sendgrid}
                    onChange={() => handleIntegracionChange('sendgrid')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Servicio de Email Transaccional (SendGrid - Configurado)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integraciones.quickbooks}
                    onChange={() => handleIntegracionChange('quickbooks')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Contabilidad (QuickBooks Online - Enlazado)</span>
                </label>
              </div>
            </div>

            {/* Configuración de API Key Global */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Configuración de API Key Global:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex flex-wrap items-center gap-2">
                  <span>Clave API del Sistema:</span>
                  <input
                    type="text"
                    value={apiKey}
                    readOnly
                    className="w-52 bg-gray-50 border border-gray-300 rounded px-2 py-1 text-xs font-mono font-bold text-gray-800 focus:outline-none"
                  />
                  <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-2.5 py-1 rounded text-[11px] font-semibold transition cursor-pointer">
                    [Botón: Regenerar Clave API]
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-2.5 py-1 rounded text-[11px] font-semibold transition cursor-pointer">
                    [Botón: Copiar]
                  </button>
                </div>
              </div>
            </div>

            {/* Webhooks */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Webhooks:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={webhookEnabled}
                    onChange={() => setWebhookEnabled(!webhookEnabled)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar notificaciones por Webhook para eventos críticos.</span>
                </label>

                <div className="flex items-center space-x-2 pt-1">
                  <span>URL de Endpoint:</span>
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full sm:w-80 bg-white border border-gray-300 rounded px-3 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Exportación de Datos */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Exportación de Datos
            </h3>

            {/* Formatos de Exportación Permitidos */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Formatos de Exportación Permitidos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatosExportacion.pdf}
                    onChange={() => handleFormatoChange('pdf')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>PDF (Informes)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatosExportacion.csv}
                    onChange={() => handleFormatoChange('csv')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>CSV (Datos de Clientes, Órdenes)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatosExportacion.json}
                    onChange={() => handleFormatoChange('json')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>JSON (Copia de Seguridad)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formatosExportacion.xml}
                    onChange={() => handleFormatoChange('xml')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>XML (Integración Legacy)</span>
                </label>
              </div>
            </div>

            {/* Programación de Exportación Automática */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Programación de Exportación Automática:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={backupNocturno}
                    onChange={() => setBackupNocturno(!backupNocturno)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar copias de seguridad automáticas nocturnas.</span>
                </label>

                <div className="flex items-center space-x-2 pt-1">
                  <span>Frecuencia:</span>
                  <select
                    value={frecuenciaExport}
                    onChange={(e) => setFrecuenciaExport(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Diario - 03:00 AM">Diario - 03:00 AM</option>
                    <option value="Semanal - Lunes 03:00 AM">Semanal - Lunes 03:00 AM</option>
                    <option value="Mensual - Día 1">Mensual - Día 1</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Integraciones PS-07 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Integraciones PS-07:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Integraciones Habilitadas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Claves API Generadas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[2]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Webhooks Configurados:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[1]</span>
              </div>
            </div>
          </div>

          {/* Estado de Servicios (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado de Servicios (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Stripe:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Operativo</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Twilio:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Operativo</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">QuickBooks:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Operativo</span>
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
            PF-22: GUARDAR CONFIGURACIÓN PS-07
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-07)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PROBAR CONEXIONES DE INTEGRACIÓN
        </button>
      </div>
    </main>
  );
}