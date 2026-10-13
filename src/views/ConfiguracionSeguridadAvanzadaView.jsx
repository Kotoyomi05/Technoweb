import React, { useState } from 'react';

export default function ConfiguracionSeguridadAvanzadaView({ onBack }) {
  const [longitudMinima, setLongitudMinima] = useState('12');
  const [expiracion, setExpiracion] = useState('90');
  const [historialContrasenas, setHistorialContrasenas] = useState('5');
  const [requerirComplejidad, setRequerirComplejidad] = useState(true);

  const [enable2FAAdmin, setEnable2FAAdmin] = useState(true);
  const [enable2FAOpcional, setEnable2FAOpcional] = useState(true);
  const [metodoPreferido2FA, setMetodoPreferido2FA] = useState('Aplicación Authenticator');

  const [intentosFallidos, setIntentosFallidos] = useState('5');
  const [duracionBloqueo, setDuracionBloqueo] = useState('30');

  const [inactividadAdmin, setInactividadAdmin] = useState('30');
  const [inactividadTecnico, setInactividadTecnico] = useState('60');
  const [permitirRecordarme, setPermitirRecordarme] = useState(true);
  const [duracionRecordarme, setDuracionRecordarme] = useState('7');

  const [limitarUnaSesion, setLimitarUnaSesion] = useState(true);
  const [registrarIPs, setRegistrarIPs] = useState(true);

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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - CONFIGURACIÓN DE SEGURIDAD AVANZADA (PS-06)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Políticas de Acceso y Autenticación */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Políticas de Acceso y Autenticación
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-700">
                <div>
                  <label className="block font-medium mb-1">Longitud Mínima:</label>
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="number"
                      value={longitudMinima}
                      onChange={(e) => setLongitudMinima(e.target.value)}
                      className="w-16 bg-white border border-gray-300 rounded px-2 py-1 text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <span>caracteres</span>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Expiración de Contraseña:</label>
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="number"
                      value={expiracion}
                      onChange={(e) => setExpiracion(e.target.value)}
                      className="w-16 bg-white border border-gray-300 rounded px-2 py-1 text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <span>días</span>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Historial de Contraseñas:</label>
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="number"
                      value={historialContrasenas}
                      onChange={(e) => setHistorialContrasenas(e.target.value)}
                      className="w-16 bg-white border border-gray-300 rounded px-2 py-1 text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <span>anteriores</span>
                  </div>
                </div>
              </div>

              <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={requerirComplejidad}
                  onChange={() => setRequerirComplejidad(!requerirComplejidad)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Requerir complejidad (mayúsculas, minúsculas, números, símbolos)</span>
              </label>
            </div>

            {/* Autenticación de Dos Factores (2FA) */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Autenticación de Dos Factores (2FA):</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enable2FAAdmin}
                    onChange={() => setEnable2FAAdmin(!enable2FAAdmin)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar 2FA para todos los roles de administrador.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enable2FAOpcional}
                    onChange={() => setEnable2FAOpcional(!enable2FAOpcional)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Permitir 2FA opcional para técnicos y recepcionistas.</span>
                </label>

                <div className="flex items-center space-x-2 pt-1">
                  <span>Método Preferido:</span>
                  <select
                    value={metodoPreferido2FA}
                    onChange={(e) => setMetodoPreferido2FA(e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Aplicación Authenticator">Aplicación Authenticator</option>
                    <option value="SMS / Twilio">SMS / Twilio</option>
                    <option value="Correo Electrónico">Correo Electrónico</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bloqueo de Cuenta */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Bloqueo de Cuenta:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Intentos Fallidos Permitidos:</span>
                  <input
                    type="number"
                    value={intentosFallidos}
                    onChange={(e) => setIntentosFallidos(e.target.value)}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <span>Duración del Bloqueo:</span>
                  <input
                    type="number"
                    value={duracionBloqueo}
                    onChange={(e) => setDuracionBloqueo(e.target.value)}
                    className="w-16 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>minutos</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Sesiones */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Sesiones
            </h3>

            {/* Tiempos de Inactividad */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Tiempos de Inactividad:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex flex-wrap items-center gap-2">
                  <span>Cierre de Sesión Automático (Inactividad):</span>
                  <input
                    type="number"
                    value={inactividadAdmin}
                    onChange={(e) => setInactividadAdmin(e.target.value)}
                    className="w-14 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>minutos (Admin),</span>
                  <input
                    type="number"
                    value={inactividadTecnico}
                    onChange={(e) => setInactividadTecnico(e.target.value)}
                    className="w-14 bg-white border border-gray-300 rounded px-2 py-0.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                  <span>minutos (Técnico)</span>
                </div>

                <label className="flex items-center space-x-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={permitirRecordarme}
                    onChange={() => setPermitirRecordarme(!permitirRecordarme)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    Permitir 'Recordarme' en el inicio de sesión (duración:{' '}
                    <input
                      type="number"
                      value={duracionRecordarme}
                      onChange={(e) => setDuracionRecordarme(e.target.value)}
                      className="w-12 bg-white border border-gray-300 rounded px-1 text-center font-bold text-gray-800 inline-block mx-1"
                    />
                    días)
                  </span>
                </label>
              </div>
            </div>

            {/* Seguridad de Sesión */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Seguridad de Sesión:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={limitarUnaSesion}
                    onChange={() => setLimitarUnaSesion(!limitarUnaSesion)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Limitar una sesión activa por usuario.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={registrarIPs}
                    onChange={() => setRegistrarIPs(!registrarIPs)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Registrar direcciones IP de inicio de sesión.</span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Seguridad PS-06 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Seguridad PS-06:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Políticas Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Usuarios con 2FA:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[18]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Auditoría:</span>
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
              <div>
                <span className="text-gray-500 font-medium block">Alertas de Seguridad:</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">[0]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Sesiones Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[22]</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-21: GUARDAR CONFIGURACIÓN PS-06
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-06)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          VER REGISTRO DE AUDITORÍA DE SEGURIDAD
        </button>
      </div>
    </main>
  );
}