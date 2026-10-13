import React, { useState } from 'react';

export default function ConfiguracionInventarioView({ onBack }) {
  const [almacenes, setAlmacenes] = useState(['Taller Central', 'Almacén Auxiliar', 'Sucursal Norte']);
  const [notifStockBajo, setNotifStockBajo] = useState(true);
  const [umbralCritico, setUmbralCritico] = useState('5 unidades');
  const [frecuenciaReporte, setFrecuenciaReporte] = useState('Diario - 8:00 AM');

  const [categorias, setCategorias] = useState({
    pantallas: true,
    baterias: true,
    placasBase: true,
    herramientas: true,
    accesorios: true,
  });

  const handleRemoveAlmacen = (index) => {
    setAlmacenes(almacenes.filter((_, i) => i !== index));
  };

  const handleCategoriaChange = (key) => {
    setCategorias(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - GESTIÓN DE INVENTARIO (PA-03)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Configuración de Almacenes y Stock (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Configuración de Almacenes y Stock
          </h3>

          {/* Almacenes Principales */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-800">
              Almacenes Principales:
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {almacenes.map((alm, idx) => (
                <span 
                  key={idx} 
                  className="bg-gray-100 border border-gray-300 text-gray-800 font-medium px-3 py-1 rounded-lg text-xs flex items-center space-x-2"
                >
                  <span>[{alm}]</span>
                  <button 
                    onClick={() => handleRemoveAlmacen(idx)}
                    className="text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </span>
              ))}
              <span className="bg-gray-50 border border-dashed border-gray-300 text-gray-500 font-medium px-3 py-1 rounded-lg text-xs cursor-pointer hover:bg-gray-100">
                [+]
              </span>
            </div>
          </div>

          {/* Configuración de Alertas de Stock Mínimo */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-800">
              Configuración de Alertas de Stock Mínimo:
            </label>

            <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={notifStockBajo}
                onChange={() => setNotifStockBajo(!notifStockBajo)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Habilitar notificaciones automáticas de stock bajo.</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Umbral Crítico General:
                </label>
                <input
                  type="text"
                  value={umbralCritico}
                  onChange={(e) => setUmbralCritico(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Frecuencia de Reporte:
                </label>
                <select
                  value={frecuenciaReporte}
                  onChange={(e) => setFrecuenciaReporte(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="Diario - 8:00 AM">Diario - 8:00 AM</option>
                  <option value="Cada 12 Horas">Cada 12 Horas</option>
                  <option value="Semanal">Semanal</option>
                </select>
              </div>
            </div>
          </div>

          {/* Gestión de Categorías de Repuestos */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <label className="block text-xs font-bold text-gray-800">
              Gestión de Categorías de Repuestos:
            </label>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-700">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categorias.pantallas}
                  onChange={() => handleCategoriaChange('pantallas')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Pantallas</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categorias.baterias}
                  onChange={() => handleCategoriaChange('baterias')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Baterías</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categorias.placasBase}
                  onChange={() => handleCategoriaChange('placasBase')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Placas Base</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categorias.herramientas}
                  onChange={() => handleCategoriaChange('herramientas')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Herramientas</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={categorias.accesorios}
                  onChange={() => handleCategoriaChange('accesorios')}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Accesorios</span>
              </label>
            </div>

            <div className="pt-2">
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Agregar Categoría]
              </button>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Inventario PA-03 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Inventario PA-03
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Total de Repuestos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[2,548]</span>
              </div>

              <div className="p-2 bg-amber-100/70 border border-amber-200 rounded-lg">
                <span className="text-amber-900 font-semibold block">Repuestos en Stock Bajo:</span>
                <span className="font-bold text-amber-950 text-sm mt-0.5 block">[15]</span>
              </div>

              <div className="p-2 bg-rose-100/70 border border-rose-200 rounded-lg">
                <span className="text-rose-900 font-semibold block">Repuestos Agotados:</span>
                <span className="font-bold text-rose-950 text-sm mt-0.5 block">[3]</span>
              </div>

              <div className="pt-1">
                <span className="text-gray-500 font-medium block">Valor Total del Inventario:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[$45,800.00]</span>
              </div>
            </div>
          </div>

          {/* Proveedores Principales */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Proveedores Principales:
            </h3>

            <div className="space-y-2 text-xs font-medium text-gray-800">
              <p>[Distribuidora Electrónica S.A.]</p>
              <p>[Importaciones Globales Ltda.]</p>
              <p>[Componentes del Sur]</p>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-18: GUARDAR CONFIGURACIÓN PA-03
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-02)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR PROVEEDORES Y PEDIDOS
        </button>
      </div>
    </main>
  );
}