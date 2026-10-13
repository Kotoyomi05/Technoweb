import React, { useState } from 'react';

export default function ConfiguracionAuditoriaCumplimientoView({ onBack }) {
  const [habilitarAuditoria, setHabilitarAuditoria] = useState(true);
  const [nivelDetalle, setNivelDetalle] = useState('Detallado (Acciones, Datos Antiguos/Nuevos)');
  const [retencionLogs, setRetencionLogs] = useState('2 Años');
  const [alertasCriticas, setAlertasCriticas] = useState(true);

  const [eventosAuditables, setEventosAuditables] = useState({
    loginLogout: true,
    modificacionCliente: true,
    ordenesServicio: true,
    cambiosConfiguracion: true,
    cambiosConfigSistema: true,
    exportacionDatos: true,
    accesoDatosSensibles: true,
  });

  const [cumplimientoPrivacidad, setCumplimientoPrivacidad] = useState({
    anonimizacionInactivos: true,
    requerirConsentimiento: true,
    auditoriaAccesoDatos: true,
  });

  const handleEventoChange = (key) => {
    setEventosAuditables(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCumplimientoChange = (key) => {
    setCumplimientoPrivacidad(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - AUDITORÍA Y CUMPLIMIENTO (PA-08)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Registro y Cumplimiento (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Registro de Auditoría */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Registro de Auditoría
            </h3>

            {/* Políticas de Auditoría Global */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Políticas de Auditoría Global:</h4>

              <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={habilitarAuditoria}
                  onChange={() => setHabilitarAuditoria(!habilitarAuditoria)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Habilitar registro de auditoría completo.</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Nivel de Detalle:
                  </label>
                  <select
                    value={nivelDetalle}
                    onChange={(e) => setNivelDetalle(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Básico (Solo Acciones)">Básico (Solo Acciones)</option>
                    <option value="Detallado (Acciones, Datos Antiguos/Nuevos)">Detallado (Acciones, Datos Antiguos/Nuevos)</option>
                    <option value="Avanzado (Completo + Headers IP)">Avanzado (Completo + Headers IP)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Retención de Logs:
                  </label>
                  <select
                    value={retencionLogs}
                    onChange={(e) => setRetencionLogs(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="6 Meses">6 Meses</option>
                    <option value="1 Año">1 Año</option>
                    <option value="2 Años">2 Años</option>
                    <option value="5 Años">5 Años</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={alertasCriticas}
                  onChange={() => setAlertasCriticas(!alertasCriticas)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Enviar alertas críticas de seguridad al administrador.</span>
              </label>
            </div>

            {/* Eventos Auditables Específicos */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Eventos Auditables Específicos:</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventosAuditables.loginLogout}
                    onChange={() => handleEventoChange('loginLogout')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Inicio de Sesión/Cierre de Sesión</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventosAuditables.cambiosConfigSistema}
                    onChange={() => handleEventoChange('cambiosConfigSistema')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cambios en Configuración del Sistema</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventosAuditables.modificacionCliente}
                    onChange={() => handleEventoChange('modificacionCliente')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Modificación de Datos de Cliente</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventosAuditables.exportacionDatos}
                    onChange={() => handleEventoChange('exportacionDatos')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Exportación de Datos (Ver PA-07)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventosAuditables.ordenesServicio}
                    onChange={() => handleEventoChange('ordenesServicio')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Creación/Edición de Órdenes de Servicio</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventosAuditables.accesoDatosSensibles}
                    onChange={() => handleEventoChange('accesoDatosSensibles')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Acceso a Datos Sensibles</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventosAuditables.cambiosConfiguracion}
                    onChange={() => handleEventoChange('cambiosConfiguracion')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cambios en Configuración</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Cumplimiento (GDPR/LOPD) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Cumplimiento (GDPR/LOPD)
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Cumplimiento de Privacidad:</h4>

              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cumplimientoPrivacidad.anonimizacionInactivos}
                    onChange={() => handleCumplimientoChange('anonimizacionInactivos')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar anonimización automática de clientes inactivos (después de 3 años).</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cumplimientoPrivacidad.requerirConsentimiento}
                    onChange={() => handleCumplimientoChange('requerirConsentimiento')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Requerir consentimiento de privacidad al registrar clientes.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cumplimientoPrivacidad.auditoriaAccesoDatos}
                    onChange={() => handleCumplimientoChange('auditoriaAccesoDatos')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Auditoría de acceso a datos personales.</span>
                </label>
              </div>

              <div className="pt-2">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Generar Informe de Cumplimiento]
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Auditoría PA-08 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Auditoría PA-08
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Logs Generados (Este Mes):</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[15,248]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Eventos Críticos (24h):</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[3]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block mb-0.5">Estado de Cumplimiento:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Óptimo</span>
                </span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Auditoría Externa:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[01/08/2024]</span>
              </div>
            </div>
          </div>

          {/* Eventos Recientes (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Eventos Recientes (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-800">
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Acceso]</p>
                <p className="text-gray-700 text-[11px]">Orden #1050 - Jack Rowe (Admin) - 10/09/2024 10:30</p>
              </div>

              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Cambio]</p>
                <p className="text-gray-700 text-[11px]">Configuración PA-06 - Jack Rowe (Admin) - 10/09/2024 09:45</p>
              </div>

              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Inicio]</p>
                <p className="text-gray-700 text-[11px]">Sesión Usuario #PU-121 - 10/09/2024 09:00</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-23: GUARDAR CONFIGURACIÓN PA-08
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-08)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          VER AUDITORÍA COMPLETA
        </button>
      </div>
    </main>
  );
}