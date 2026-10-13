import React, { useState } from 'react';

export default function ConfiguracionCatalogosView({ onBack }) {
  const [servicios, setServicios] = useState({
    diagnosticoGeneral: true,
    reparacionHardware: true,
    actualizacionSoftware: true,
    mantenimientoPreventivo: true,
    recuperacionDatos: true,
  });

  const [precios, setPrecios] = useState({
    diagnosticoGeneral: '$50.00',
    reparacionHardware: 'Tarifa Variable',
    actualizacionSoftware: '$75.00',
  });

  const [opciones, setOpciones] = useState({
    emergencia24h: true,
    cotizacionesPersonalizadas: true,
  });

  const [inventario, setInventario] = useState({
    repuestosGenericos: true,
    accesoriosSoftware: true,
    baterias: true,
  });

  const [alertaStockUmbral, setAlertaStockUmbral] = useState('5');

  const handleServicioChange = (key) => {
    setServicios(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpcionChange = (key) => {
    setOpciones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInventarioChange = (key) => {
    setInventario(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - GESTIÓN DE CATÁLOGOS Y SERVICIOS (PS-02)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Catálogo de Servicios */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Catálogo de Servicios
            </h3>

            {/* Servicios Principales */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Servicios Principales:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={servicios.diagnosticoGeneral}
                    onChange={() => handleServicioChange('diagnosticoGeneral')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Diagnóstico General</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={servicios.reparacionHardware}
                    onChange={() => handleServicioChange('reparacionHardware')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Reparación de Hardware</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={servicios.actualizacionSoftware}
                    onChange={() => handleServicioChange('actualizacionSoftware')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Actualización de Software</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={servicios.mantenimientoPreventivo}
                    onChange={() => handleServicioChange('mantenimientoPreventivo')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mantenimiento Preventivo</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={servicios.recuperacionDatos}
                    onChange={() => handleServicioChange('recuperacionDatos')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Recuperación de Datos</span>
                </label>
              </div>
            </div>

            {/* Configuración de Precios (Ejemplos) */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Configuración de Precios (Ejemplos):</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between max-w-md">
                  <span className="text-gray-700">Diagnóstico General:</span>
                  <input
                    type="text"
                    value={precios.diagnosticoGeneral}
                    onChange={(e) => setPrecios({ ...precios, diagnosticoGeneral: e.target.value })}
                    className="w-36 bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <span className="text-gray-700">Reparación de Hardware:</span>
                  <input
                    type="text"
                    value={precios.reparacionHardware}
                    onChange={(e) => setPrecios({ ...precios, reparacionHardware: e.target.value })}
                    className="w-36 bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between max-w-md">
                  <span className="text-gray-700">Actualización de Software:</span>
                  <input
                    type="text"
                    value={precios.actualizacionSoftware}
                    onChange={(e) => setPrecios({ ...precios, actualizacionSoftware: e.target.value })}
                    className="w-36 bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Opciones Adicionales */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Opciones Adicionales:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={opciones.emergencia24h}
                    onChange={() => handleOpcionChange('emergencia24h')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Habilitar servicios de emergencia (24h).</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={opciones.cotizacionesPersonalizadas}
                    onChange={() => handleOpcionChange('cotizacionesPersonalizadas')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Permitir cotizaciones personalizadas.</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Configuración de Inventario Asociado */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Inventario Asociado
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Inventario Vinculado:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inventario.repuestosGenericos}
                    onChange={() => handleInventarioChange('repuestosGenericos')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Repuestos Genéricos</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inventario.baterias}
                    onChange={() => handleInventarioChange('baterias')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Baterías</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={inventario.accesoriosSoftware}
                    onChange={() => handleInventarioChange('accesoriosSoftware')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Accesorios de Software</span>
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Alertas de Stock:</h4>
              <div className="flex items-center space-x-2 text-xs text-gray-700">
                <span>Notificar cuando el stock sea menor a</span>
                <input
                  type="number"
                  value={alertaStockUmbral}
                  onChange={(e) => setAlertaStockUmbral(e.target.value)}
                  className="w-16 bg-white border border-gray-300 rounded-lg px-2 py-1 text-xs text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
                <span>unidades.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Catálogo PS-02 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Catálogo PS-02:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Servicios Activos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[12]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Categorías:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Listas de Precios:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[2]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Actualización:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024 11:00]</span>
              </div>
            </div>
          </div>

          {/* Estado de Categorías (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado de Categorías (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Reparación:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>✓</span>
                  <span>Activo</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Mantenimiento:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>✓</span>
                  <span>Activo</span>
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-700">Venta de Partes:</span>
                <span className="inline-flex items-center space-x-1 text-amber-700 font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-[11px]">
                  <span>⚠️</span>
                  <span>Limitado</span>
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
            PF-17: GUARDAR CONFIGURACIÓN PS-02
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PS-02)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR CATEGORÍAS DE PARTES
        </button>
      </div>
    </main>
  );
}