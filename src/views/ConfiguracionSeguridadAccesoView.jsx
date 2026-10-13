import React, { useState } from 'react';

export default function ConfiguracionSeguridadAccesoView({ onBack }) {
  const [enable2FA, setEnable2FA] = useState(true);
  const [minPasswordLength, setMinPasswordLength] = useState('12 caracteres');
  const [passwordExpiration, setPasswordExpiration] = useState('90 días');
  const [maxInactivity, setMaxInactivity] = useState('30 minutos');
  const [enableSSO, setEnableSSO] = useState(true);

  const rolesDefinidos = [
    'Administrador',
    'Técnico Senior',
    'Técnico Junior',
    'Recepción',
    'Cliente'
  ];

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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - SEGURIDAD Y ACCESO (PA-06)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Configuración de Políticas de Seguridad (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Configuración de Políticas de Seguridad
          </h3>

          {/* Autenticación de Usuarios */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Autenticación de Usuarios:
            </h4>

            <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={enable2FA}
                onChange={() => setEnable2FA(!enable2FA)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Habilitar autenticación de dos factores (2FA) obligatoria para administradores.</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Longitud Mínima de Contraseña:
                </label>
                <select
                  value={minPasswordLength}
                  onChange={(e) => setMinPasswordLength(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="8 caracteres">8 caracteres</option>
                  <option value="10 caracteres">10 caracteres</option>
                  <option value="12 caracteres">12 caracteres</option>
                  <option value="16 caracteres">16 caracteres</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Expiración de Contraseña:
                </label>
                <select
                  value={passwordExpiration}
                  onChange={(e) => setPasswordExpiration(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="30 días">30 días</option>
                  <option value="60 días">60 días</option>
                  <option value="90 días">90 días</option>
                  <option value="Nunca">Nunca</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gestión de Sesiones */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Gestión de Sesiones:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Tiempo de Inactividad Máximo:
                </label>
                <select
                  value={maxInactivity}
                  onChange={(e) => setMaxInactivity(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="15 minutos">15 minutos</option>
                  <option value="30 minutos">30 minutos</option>
                  <option value="60 minutos">60 minutos</option>
                </select>
              </div>
            </div>

            <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={enableSSO}
                onChange={() => setEnableSSO(!enableSSO)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Permitir inicio de sesión único (SSO) empresarial.</span>
            </label>
          </div>

          {/* Control de Acceso Basado en Roles (RBAC) */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Control de Acceso Basado en Roles (RBAC):
            </h4>

            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-600 block">
                Roles Definidos:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {rolesDefinidos.map((rol, idx) => (
                  <span 
                    key={idx} 
                    className="bg-gray-100 border border-gray-200 text-gray-800 font-medium px-3 py-1 rounded-lg text-xs shadow-2xs"
                  >
                    [{rol}]
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Gestionar Permisos por Rol]
              </button>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Seguridad PA-06 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Seguridad PA-06
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Políticas Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Roles del Sistema:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">2FA Obligatorio:</span>
                <span className="font-bold text-emerald-700 text-sm mt-0.5 block">[Sí (Admin)]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Auditoría de Seguridad:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Bitácora de Seguridad Reciente (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Bitácora de Seguridad Reciente (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-800">
              <div className="p-2.5 bg-rose-50/70 border border-rose-200 rounded-lg">
                <p className="font-bold text-rose-900">[Alerta]</p>
                <p className="text-rose-800 text-[11px] mt-0.5">
                  Intento de acceso fallido (Admin - IP: 192.168.1.55) - 10/09/2024 09:15
                </p>
              </div>

              <div className="p-2.5 bg-blue-50/70 border border-blue-200 rounded-lg">
                <p className="font-bold text-blue-900">[Cambio]</p>
                <p className="text-blue-800 text-[11px] mt-0.5">
                  Modificación de permisos para rol 'Técnico Junior' - 10/09/2024 08:45
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-21: GUARDAR CONFIGURACIÓN PA-06
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-06)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          VER BITÁCORA DE SEGURIDAD COMPLETA
        </button>
      </div>
    </main>
  );
}