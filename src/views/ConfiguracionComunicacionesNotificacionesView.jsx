import React, { useState } from 'react';

export default function ConfiguracionComunicacionesNotificacionesView({ onBack }) {
  const [notifCliente, setNotifCliente] = useState({
    confirmacionRecepcion: true,
    actualizacionEstado: true,
    presupuestoAprobado: true,
    equipoListo: true,
    recordatorioRecogida: true,
  });

  const [notifInternas, setNotifInternas] = useState({
    nuevaOrden: true,
    alertaSla: true,
    solicitudPiezas: true,
  });

  const [proveedorEmail, setProveedorEmail] = useState('SMTP Propio');
  const [proveedorSms, setProveedorSms] = useState('Twilio');
  const [webPush, setWebPush] = useState(true);

  const handleClienteChange = (key) => {
    setNotifCliente(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInternasChange = (key) => {
    setNotifInternas(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - COMUNICACIONES Y NOTIFICACIONES (PS-09)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Canales de Notificación */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Canales de Notificación
            </h3>

            {/* Notificaciones al Cliente */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Notificaciones al Cliente (Automatizadas):</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifCliente.confirmacionRecepcion}
                    onChange={() => handleClienteChange('confirmacionRecepcion')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Confirmación de Recepción de Equipo (Email/SMS)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifCliente.actualizacionEstado}
                    onChange={() => handleClienteChange('actualizacionEstado')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Actualización de Estado de Reparación (Email)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifCliente.presupuestoAprobado}
                    onChange={() => handleClienteChange('presupuestoAprobado')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Presupuesto Aprobado/Rechazado (Email)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifCliente.equipoListo}
                    onChange={() => handleClienteChange('equipoListo')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Equipo Listo para Recoger (Email/SMS)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifCliente.recordatorioRecogida}
                    onChange={() => handleClienteChange('recordatorioRecogida')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Recordatorio de Recogida (3 días después)</span>
                </label>
              </div>
            </div>

            {/* Notificaciones Internas */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Notificaciones Internas (Taller):</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifInternas.nuevaOrden}
                    onChange={() => handleInternasChange('nuevaOrden')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Nueva Orden de Servicio Asignada (Notificación Push)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifInternas.alertaSla}
                    onChange={() => handleInternasChange('alertaSla')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Alerta de Incumplimiento de SLA (Email a Gerente)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifInternas.solicitudPiezas}
                    onChange={() => handleInternasChange('solicitudPiezas')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Solicitud de Piezas Aprobada (Notificación Push)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Plantillas y Proveedores */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Plantillas y Proveedores
            </h3>

            {/* Plantillas de Correo Electrónico */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-800">Plantillas de Correo Electrónico:</h4>
              <div className="flex flex-wrap gap-2">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Editar Plantilla 'Equipo Listo']
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Editar Plantilla 'Nueva Orden']
                </button>
              </div>
            </div>

            {/* Proveedores de Servicio */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Proveedores de Servicio:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
                <div>
                  <label className="block font-medium mb-1">Proveedor de Email:</label>
                  <select
                    value={proveedorEmail}
                    onChange={(e) => setProveedorEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="SMTP Propio">SMTP Propio</option>
                    <option value="SendGrid">SendGrid</option>
                    <option value="Amazon SES">Amazon SES</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-1">Proveedor de SMS:</label>
                  <select
                    value={proveedorSms}
                    onChange={(e) => setProveedorSms(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Twilio">Twilio</option>
                    <option value="Vonage">Vonage</option>
                    <option value="Plivo">Plivo</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={webPush}
                    onChange={() => setWebPush(!webPush)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar Notificaciones Web Push</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Comunicaciones PS-09 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Comunicaciones PS-09:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Canales Activos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[Email, SMS, Push]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Notificaciones (24h):</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[120]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Tasa de Entrega (Email):</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">[99.2%]</span>
              </div>
            </div>
          </div>

          {/* Estado de Integraciones (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado de Integraciones (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Servidor SMTP:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Conectado</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Pasarela SMS (Twilio):</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Conectado</span>
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
            PF-24: GUARDAR CONFIGURACIÓN PS-09
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-09)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR PLANTILLAS DE COMUNICACIÓN
        </button>
      </div>
    </main>
  );
}