import React, { useState } from 'react';

export default function PanelSeguridadView({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('Usuario o Acción...');
  const [nivelEvento, setNivelEvento] = useState('Todos');
  const [moduloFilter, setModuloFilter] = useState('Todos');

  const actividades = [
    {
      fechaHora: '[09/09/2024 16:02:11]',
      usuario: '[Jack Rowe]',
      rol: '[Técnico Senior]',
      accion: '[Modificación Inventario: -2 REP-FAN-G15]',
      modulo: '[Inventario]',
      ip: '[192.168.1.55]',
      detalles: 'Ver Detalle',
      tipoDetalle: 'boton'
    },
    {
      fechaHora: '[09/09/2024 15:45:03]',
      usuario: '[Admin Local]',
      rol: '[Administrador]',
      accion: '[Login Exitoso]',
      modulo: '[Seguridad]',
      ip: '[200.41.13.99]',
      detalles: '[N/A]',
      tipoDetalle: 'texto'
    },
    {
      fechaHora: '[09/09/2024 14:30:55]',
      usuario: '[Ana García]',
      rol: '[Técnico]',
      accion: '[Cierre Orden #1043]',
      modulo: '[Órdenes]',
      ip: '[192.168.1.62]',
      detalles: 'Ver Detalle',
      tipoDetalle: 'boton'
    },
    {
      fechaHora: '[09/09/2024 11:15:22]',
      usuario: '[Sistema]',
      rol: '[Automático]',
      accion: '[Respaldo Diario Completado]',
      modulo: '[Sistema]',
      ip: '[localhost]',
      detalles: '[N/A]',
      tipoDetalle: 'texto'
    },
    {
      fechaHora: '[09/09/2024 09:05:10]',
      usuario: '[Carlos Ruiz]',
      rol: '[Técnico]',
      accion: '[Intento de Acceso Fallido (x3)]',
      modulo: '[Seguridad]',
      ip: '[192.168.1.70]',
      detalles: 'ALERTA',
      tipoDetalle: 'alerta'
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
          PANEL DE CONTROL DE SEGURIDAD Y AUDITORÍA
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Tabla de Registro de Actividad (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Registro de Actividad del Sistema
          </h3>

          {/* Filtros y Buscador */}
          <div className="space-y-3 pt-1">
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
                placeholder="Buscar usuario o acción..." 
                className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="font-medium text-gray-600">Nivel de Evento:</span>
                <select 
                  value={nivelEvento} 
                  onChange={(e) => setNivelEvento(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                >
                  <option value="Todos">Todos</option>
                  <option value="Crítico">Crítico</option>
                  <option value="Advertencia">Advertencia</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="font-medium text-gray-600">Módulo:</span>
                <select 
                  value={moduloFilter} 
                  onChange={(e) => setModuloFilter(e.target.value)}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
                >
                  <option value="Todos">Todos</option>
                  <option value="Gestión Usuarios">Gestión Usuarios</option>
                  <option value="Inventario">Inventario</option>
                  <option value="Diagnóstico">Diagnóstico</option>
                  <option value="Finanzas">Finanzas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tabla de Auditoría */}
          <div className="overflow-x-auto border-t border-gray-100 pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">Fecha/Hora</th>
                  <th className="py-2.5 px-3">Usuario</th>
                  <th className="py-2.5 px-3">Rol</th>
                  <th className="py-2.5 px-3">Acción Realizada</th>
                  <th className="py-2.5 px-3">Módulo</th>
                  <th className="py-2.5 px-3">Dirección IP</th>
                  <th className="py-2.5 px-3 text-center">Detalles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {actividades.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition">
                    <td className="py-3 px-3 font-mono text-gray-600">{item.fechaHora}</td>
                    <td className="py-3 px-3 font-semibold text-gray-800">{item.usuario}</td>
                    <td className="py-3 px-3 text-gray-600">{item.rol}</td>
                    <td className="py-3 px-3 font-medium text-gray-900">{item.accion}</td>
                    <td className="py-3 px-3 text-gray-700">{item.modulo}</td>
                    <td className="py-3 px-3 font-mono text-gray-600">{item.ip}</td>
                    <td className="py-3 px-3 text-center">
                      {item.tipoDetalle === 'boton' && (
                        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer">
                          Ver Detalle
                        </button>
                      )}
                      {item.tipoDetalle === 'texto' && (
                        <span className="text-gray-400 font-medium">{item.detalles}</span>
                      )}
                      {item.tipoDetalle === 'alerta' && (
                        <span className="inline-flex items-center space-x-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[11px]">
                          <span>⚠️</span>
                          <span>ALERTA</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel Lateral: Resumen de Seguridad (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen de Seguridad
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-gray-600 font-medium block">Intentos de Acceso Fallidos (24h):</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[3]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Sesiones Activas:</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[12]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Última Auditoría Externa:</span>
              <p className="text-sm font-bold text-gray-900 mt-0.5">[20/08/2024]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block mb-1">Estado del Sistema:</span>
              <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-xs">
                <span>[✓</span>
                <span>Seguro]</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PF-10: GENERAR REPORTE DE AUDITORÍA DETALLADO
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          CONFIGURAR POLÍTICAS DE SEGURIDAD
        </button>
      </div>
    </main>
  );
}