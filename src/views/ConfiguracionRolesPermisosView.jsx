import React, { useState } from 'react';

export default function ConfiguracionRolesPermisosView({ onBack }) {
  const [roles, setRoles] = useState({
    admin: true,
    tecnicoSenior: true,
    tecnicoJunior: true,
    recepcionista: true,
    cliente: true,
  });

  const [politicasPassword, setPoliticasPassword] = useState({
    longitudMinima: '12',
    expiracionDias: '90',
    requerirMayusculasNumeros: true,
    bloqueoIntentosFallidos: true,
    intentosMaximos: '5',
  });

  const handleRolChange = (key) => {
    setRoles(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - CONFIGURACIÓN DE ROLES Y PERMISOS (PS-03)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Gestión de Roles del Sistema */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Gestión de Roles del Sistema
            </h3>

            {/* Roles Definidos */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Roles Definidos:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.admin}
                    onChange={() => handleRolChange('admin')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Administrador (Acceso Total)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.tecnicoSenior}
                    onChange={() => handleRolChange('tecnicoSenior')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Técnico Senior (Acceso Avanzado)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.tecnicoJunior}
                    onChange={() => handleRolChange('tecnicoJunior')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Técnico Junior (Acceso Limitado)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.recepcionista}
                    onChange={() => handleRolChange('recepcionista')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Recepcionista (Gestión de Órdenes)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.cliente}
                    onChange={() => handleRolChange('cliente')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cliente (Solo Consulta)</span>
                </label>
              </div>
            </div>

            {/* Acciones sobre Roles */}
            <div className="pt-2 border-t border-gray-100 flex flex-wrap gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Crear Nuevo Rol]
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Editar Rol]
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Eliminar Rol]
              </button>
            </div>

            {/* Matriz de Permisos (Ejemplo: Técnico Junior) */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">
                Matriz de Permisos (Ejemplo: Técnico Junior):
              </h4>
              <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-gray-800">Módulo Taller:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">[✓ Ver]</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">[✓ Editar Propias]</span>
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">[✕ Eliminar]</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-200/60">
                  <span className="font-semibold text-gray-800">Módulo Clientes:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">[✓ Ver]</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">[✓ Editar]</span>
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">[✕ Crear]</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-gray-200/60">
                  <span className="font-semibold text-gray-800">Módulo Configuración:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">[✕ Ver]</span>
                    <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">[✕ Editar]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Políticas de Contraseña */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Políticas de Contraseña
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Políticas Globales:</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Longitud Mínima:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={politicasPassword.longitudMinima}
                      onChange={(e) => setPoliticasPassword({ ...politicasPassword, longitudMinima: e.target.value })}
                      className="w-24 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <span className="text-xs text-gray-600">caracteres</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Expiración:
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={politicasPassword.expiracionDias}
                      onChange={(e) => setPoliticasPassword({ ...politicasPassword, expiracionDias: e.target.value })}
                      className="w-24 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    />
                    <span className="text-xs text-gray-600">días</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-700 pt-1">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={politicasPassword.requerirMayusculasNumeros}
                    onChange={() => setPoliticasPassword(prev => ({ ...prev, requerirMayusculasNumeros: !prev.requerirMayusculasNumeros }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Requerir mayúsculas y números</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={politicasPassword.bloqueoIntentosFallidos}
                    onChange={() => setPoliticasPassword(prev => ({ ...prev, bloqueoIntentosFallidos: !prev.bloqueoIntentosFallidos }))}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>
                    Bloqueo de cuenta tras{' '}
                    <input
                      type="number"
                      value={politicasPassword.intentosMaximos}
                      onChange={(e) => setPoliticasPassword({ ...politicasPassword, intentosMaximos: e.target.value })}
                      className="w-12 bg-white border border-gray-300 rounded px-1 text-center font-bold text-gray-800 inline-block mx-1"
                    />
                    intentos fallidos
                  </span>
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Roles PS-03 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Roles PS-03:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Roles del Sistema:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Usuarios Asignados:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[25]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Auditoría de Permisos:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Niveles de Acceso (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Niveles de Acceso (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Admin:</span>
                <span className="inline-flex items-center space-x-1 text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 text-[11px]">
                  <span>🛡️</span>
                  <span>Total</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Técnico:</span>
                <span className="inline-flex items-center space-x-1 text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 text-[11px]">
                  <span>🛠️</span>
                  <span>Medio</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Cliente:</span>
                <span className="inline-flex items-center space-x-1 text-gray-700 font-bold bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200 text-[11px]">
                  <span>👤</span>
                  <span>Bajo</span>
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
            PF-18: GUARDAR CONFIGURACIÓN PS-03
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-03)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          ASIGNAR ROLES A USUARIOS
        </button>
      </div>
    </main>
  );
}