import React, { useState } from 'react';

export default function ConfiguracionComunicacionesView({ onBack }) {
  const [canales, setCanales] = useState({
    smtp: true,
    push: true,
    sms: true,
    chatCrisp: true,
  });

  const [plantillas, setPlantillas] = useState({
    confirmacionOrden: true,
    presupuestoAprobado: true,
    avisoFinalizado: true,
    recordatorioCita: true,
  });

  const [automatizacion, setAutomatizacion] = useState({
    sms24h: true,
    emailListoRecoger: true,
  });

  const [chatDisponible, setChatDisponible] = useState(true);
  const [horarioAtencion, setHorarioAtencion] = useState('L-V: 09:00 - 18:00');
  const [mensajeFueraLinea, setMensajeFueraLinea] = useState('Gracias por escribir. Te responderemos en breve.');

  const handleCanalChange = (key) => {
    setCanales(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePlantillaChange = (key) => {
    setPlantillas(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAutomatizacionChange = (key) => {
    setAutomatizacion(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - MÓDULO DE COMUNICACIONES (PA-09)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Canales, Plantillas y Chat (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Canales de Comunicación */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Canales de Comunicación
            </h3>

            {/* Canales Activos */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Canales Activos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={canales.smtp}
                    onChange={() => handleCanalChange('smtp')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Correo Electrónico (SMTP)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={canales.push}
                    onChange={() => handleCanalChange('push')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Notificaciones Push (Navegador)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={canales.sms}
                    onChange={() => handleCanalChange('sms')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>SMS (Integración Twilio)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={canales.chatCrisp}
                    onChange={() => handleCanalChange('chatCrisp')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Chat en Tiempo Real (Integración Crisp)</span>
                </label>
              </div>
            </div>

            {/* Plantillas de Correo Electrónico */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Plantillas de Correo Electrónico:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plantillas.confirmacionOrden}
                    onChange={() => handlePlantillaChange('confirmacionOrden')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Confirmación de Orden</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plantillas.avisoFinalizado}
                    onChange={() => handlePlantillaChange('avisoFinalizado')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Aviso de Reparación Finalizada</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plantillas.presupuestoAprobado}
                    onChange={() => handlePlantillaChange('presupuestoAprobado')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Presupuesto Aprobado</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plantillas.recordatorioCita}
                    onChange={() => handlePlantillaChange('recordatorioCita')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Recordatorio de Cita</span>
                </label>
              </div>

              <div className="pt-1">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Editar Plantillas]
                </button>
              </div>
            </div>

            {/* Automatización de Notificaciones */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Automatización de Notificaciones:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automatizacion.sms24h}
                    onChange={() => handleAutomatizacionChange('sms24h')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enviar SMS 24h antes de la cita.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automatizacion.emailListoRecoger}
                    onChange={() => handleAutomatizacionChange('emailListoRecoger')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enviar correo al cambiar estado a 'Listo para Recoger'.</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Chat en Vivo */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Chat en Vivo
            </h3>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-800">Disponibilidad:</h4>

              <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={chatDisponible}
                  onChange={() => setChatDisponible(!chatDisponible)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Habilitar chat en vivo para clientes.</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Horario de Atención:
                  </label>
                  <input
                    type="text"
                    value={horarioAtencion}
                    onChange={(e) => setHorarioAtencion(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Mensaje Fuera de Línea:
                  </label>
                  <input
                    type="text"
                    value={mensajeFueraLinea}
                    onChange={(e) => setMensajeFueraLinea(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Comunicaciones PA-09 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Comunicaciones PA-09
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Canales Activos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Plantillas Editadas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[3]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Notificaciones Automáticas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[2]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Último Envío:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024 11:00]</span>
              </div>
            </div>
          </div>

          {/* Registro de Envíos Recientes (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Registro de Envíos Recientes (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-800">
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Email]</p>
                <p className="text-gray-700 text-[11px]">Confirmación Orden #1050 - 10/09/2024 11:00</p>
              </div>

              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[SMS]</p>
                <p className="text-gray-700 text-[11px]">Recordatorio Cita #C-998 - 10/09/2024 10:30</p>
              </div>

              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Push]</p>
                <p className="text-gray-700 text-[11px]">Cambio de estado Orden #1049 - 10/09/2024 09:15</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-24: GUARDAR CONFIGURACIÓN PA-09
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-09)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          VER REGISTRO DE COMUNICACIONES
        </button>
      </div>
    </main>
  );
}