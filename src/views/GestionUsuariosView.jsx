import React, { useState } from 'react';

export default function GestionUsuariosView({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('Nombre de usuario o rol...');
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [rolFilter, setRolFilter] = useState('Todos');

  const usuarios = [
    {
      id: '[U-001]',
      nombre: '[Jack Rowe]',
      rol: '[Técnico Senior]',
      email: '[j.rowe@techserviceweb.com]',
      ultimoAcceso: '[09/09/2024 16:02]',
      estado: 'Activo',
      estadoTipo: 'activo',
      accionBloqueo: 'Bloquear'
    },
    {
      id: '[U-002]',
      nombre: '[Ana García]',
      rol: '[Técnico]',
      email: '[a.garcia@techserviceweb.com]',
      ultimoAcceso: '[09/09/2024 14:30]',
      estado: 'Activo',
      estadoTipo: 'activo',
      accionBloqueo: 'Bloquear'
    },
    {
      id: '[U-003]',
      nombre: '[Carlos Ruiz]',
      rol: '[Recepción]',
      email: '[c.ruiz@techserviceweb.com]',
      ultimoAcceso: '[09/09/2024 11:15]',
      estado: 'Activo',
      estadoTipo: 'activo',
      accionBloqueo: 'Bloquear'
    },
    {
      id: '[U-004]',
      nombre: '[María Torres]',
      rol: '[Auditor]',
      email: '[m.torres@techserviceweb.com]',
      ultimoAcceso: '[08/09/2024 09:05]',
      estado: 'Activo',
      estadoTipo: 'activo',
      accionBloqueo: 'Bloquear'
    },
    {
      id: '[U-010]',
      nombre: '[Pedro Gómez]',
      rol: '[Técnico]',
      email: '[p.gomez@techserviceweb.com]',
      ultimoAcceso: '[N/A]',
      estado: 'Inactivo',
      estadoTipo: 'inactivo',
      accionBloqueo: 'Habilitar'
    }
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
          CONFIGURACIÓN DE USUARIOS Y PERMISOS DE ACCESO
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Directorio de Usuarios (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Directorio de Usuarios del Sistema
          </h3>

          {/* Buscador y Filtro por Estado */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Buscar:</label>
              <div className="relative w-full sm:w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </span>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre de usuario o rol..." 
                  className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-600">Estado:</span>
              <select 
                value={estadoFilter} 
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="Todos">Todos</option>
                <option value="Activo">Activo</option>
                <option value="Bloqueado">Bloqueado</option>
              </select>
            </div>
          </div>

          {/* Filtros Rápidos por Rol */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            {['Todos', 'Técnico', 'Administrador', 'Recepción', 'Auditor'].map((rol, idx) => (
              <button 
                key={idx}
                onClick={() => setRolFilter(rol)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                  rolFilter === rol 
                    ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold' 
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {rol}
              </button>
            ))}
          </div>

          {/* Tabla de Usuarios */}
          <div className="overflow-x-auto border-t border-gray-100 pt-3">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">ID</th>
                  <th className="py-2.5 px-3">Nombre Completo</th>
                  <th className="py-2.5 px-3">Rol Asignado</th>
                  <th className="py-2.5 px-3">Correo Electrónico</th>
                  <th className="py-2.5 px-3">Último Acceso</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {usuarios.map((usr) => (
                  <tr key={usr.id} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 font-semibold text-gray-800">{usr.id}</td>
                    <td className="py-3 px-3 font-bold text-gray-900">{usr.nombre}</td>
                    <td className="py-3 px-3 font-medium text-gray-700">{usr.rol}</td>
                    <td className="py-3 px-3 text-gray-600">{usr.email}</td>
                    <td className="py-3 px-3 font-mono text-gray-600">{usr.ultimoAcceso}</td>
                    <td className="py-3 px-3 font-semibold">
                      {usr.estadoTipo === 'activo' ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                          <span>[✓</span>
                          <span>Activo]</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-[11px]">
                          <span>❌</span>
                          <span>Inactivo]</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 space-y-1">
                      <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                        Botón: Editar
                      </button>
                      <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                        Botón: Permisos
                      </button>
                      <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                        Botón: {usr.accionBloqueo}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Lateral: Resumen de Acceso (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen de Acceso
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-gray-600 font-medium block">Total de Usuarios Activos:</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[42]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Roles Definidos:</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[5]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Licencias de Técnico en Uso:</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[42 / 50]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Último Usuario Creado:</span>
              <p className="text-xs font-bold text-gray-900 mt-0.5">[Ana García]</p>
              <span className="text-[11px] text-gray-500 block">(01/09/2024)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-14: CREAR NUEVO USUARIO DEL SISTEMA
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            EXPORTAR LISTADO DE USUARIOS (CSV)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR ROLES Y PERMISOS
        </button>
      </div>
    </main>
  );
}