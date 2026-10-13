import React, { useState } from 'react';

export default function ConfiguracionServicioView({ onBack }) {
  const [estructuraCodigo, setEstructuraCodigo] = useState('TSW-{YY}-{XXXXX}');
  const [prefijo, setPrefijo] = useState('TSW');
  const [asignacionTecnico, setAsignacionTecnico] = useState('Basado en Carga de Trabajo');

  const [tipologias, setTipologias] = useState({
    reparacionEstandar: true,
    mantenimientoPreventivo: true,
    actualizacionSoftware: true,
    diagnosticoExpress: false,
    garantia: true,
  });

  const [notificaciones, setNotificaciones] = useState({
    alertaStockBajo: true,
    notificacionCliente: true,
    resumenDiario: false,
  });

  const estados = [
    '1. Nuevo Ingreso',
    '2. En Diagnóstico',
    '3. Esperando Repuestos',
    '4. En Reparación',
    '5. Control de Calidad',
    '6. Listo para Entrega',
    '7. Entregado',
  ];

  const handleCheckboxChange = (section, key) => {
    if (section === 'tipologias') {
      setTipologias(prev => ({ ...prev, [key]: !prev[key] }));
    } else if (section === 'notificaciones') {
      setNotificaciones(prev => ({ ...prev, [key]: !prev[key] }));
    }
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - MÓDULO DE SERVICIO (PA-01)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Configuración de Órdenes de Servicio (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Configuración de Órdenes de Servicio
          </h3>

          {/* Estructura de Código y Prefijo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Estructura de Código de Orden:
              </label>
              <input
                type="text"
                value={estructuraCodigo}
                onChange={(e) => setEstructuraCodigo(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Prefijo Automático:
              </label>
              <input
                type="text"
                value={prefijo}
                onChange={(e) => setPrefijo(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm font-mono"
              />
            </div>
          </div>

          {/* Tipologías de Servicio Predeterminadas */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-800">
              Tipologías de Servicio Predeterminadas:
            </label>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-700">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tipologias.reparacionEstandar}
                  onChange={() => handleCheckboxChange('tipologias', 'reparacionEstandar')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Reparación Estándar</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tipologias.mantenimientoPreventivo}
                  onChange={() => handleCheckboxChange('tipologias', 'mantenimientoPreventivo')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Mantenimiento Preventivo</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tipologias.actualizacionSoftware}
                  onChange={() => handleCheckboxChange('tipologias', 'actualizacionSoftware')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Actualización de Software</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tipologias.diagnosticoExpress}
                  onChange={() => handleCheckboxChange('tipologias', 'diagnosticoExpress')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Diagnóstico Express</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tipologias.garantia}
                  onChange={() => handleCheckboxChange('tipologias', 'garantia')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Garantía</span>
              </label>
            </div>
          </div>

          {/* Estados de Orden Personalizables */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-800">
              Estados de Orden Personalizables:
            </label>
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-gray-800 font-medium">
              {estados.map((est, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg border border-gray-200 shadow-2xs">
                  {est}
                </div>
              ))}
              <button className="bg-gray-100 hover:bg-gray-200 border border-dashed border-gray-300 text-gray-700 p-2 rounded-lg text-xs font-semibold transition cursor-pointer text-center">
                [Botón: Agregar Estado]
              </button>
            </div>
          </div>

          {/* Asignación Automática de Técnico */}
          <div className="pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-800 mb-1">
              Asignación Automática de Técnico:
            </label>
            <select
              value={asignacionTecnico}
              onChange={(e) => setAsignacionTecnico(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="Basado en Carga de Trabajo">Basado en Carga de Trabajo</option>
              <option value="Asignación Aleatoria">Asignación Aleatoria</option>
              <option value="Por Especialidad del Técnico">Por Especialidad del Técnico</option>
              <option value="Desactivado (Manual)">Desactivado (Manual)</option>
            </select>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Configuración PA-01 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Configuración PA-01
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Estados Activos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[7]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Tipologías Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Código de Orden:</span>
                <span className="font-mono font-bold text-gray-900 text-xs mt-0.5 block">[TSW-YY-XXXXX]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Modificación:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Notificaciones del Módulo */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Notificaciones del Módulo
            </h3>

            <div className="space-y-2.5 text-xs text-gray-700">
              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificaciones.alertaStockBajo}
                  onChange={() => handleCheckboxChange('notificaciones', 'alertaStockBajo')}
                  className="rounded text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span>Alerta de Stock Bajo para Repuestos Críticos</span>
              </label>

              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificaciones.notificacionCliente}
                  onChange={() => handleCheckboxChange('notificaciones', 'notificacionCliente')}
                  className="rounded text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span>Notificación de Cambio de Estado al Cliente</span>
              </label>

              <label className="flex items-start space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificaciones.resumenDiario}
                  onChange={() => handleCheckboxChange('notificaciones', 'resumenDiario')}
                  className="rounded text-blue-600 focus:ring-blue-500 mt-0.5"
                />
                <span>Resumen Diario de Órdenes</span>
              </label>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-16: GUARDAR CONFIGURACIÓN PA-01
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-01)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR TIPOLOGÍAS AVANZADAS
        </button>
      </div>
    </main>
  );
}