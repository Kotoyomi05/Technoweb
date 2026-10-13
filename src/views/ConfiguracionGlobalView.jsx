import React from 'react';

export default function ConfiguracionGlobalView({ onBack }) {
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
          CONFIGURACIÓN GLOBAL DEL SISTEMA Y RESUMEN DE LICENCIAS
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Columna Izquierda: Licencias y Almacenamiento (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Resumen de Licencias y Suscripciones */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Licencias y Suscripciones
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 font-medium block">Tipo de Licencia:</span>
                  <span className="font-bold text-gray-900 text-sm bg-gray-100 px-2 py-0.5 rounded mt-0.5 inline-block">
                    [Empresarial Plus]
                  </span>
                </div>

                <div>
                  <span className="text-gray-500 font-medium block">Estado:</span>
                  <span className="inline-flex items-center space-x-1 font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mt-0.5">
                    <span>[✓</span>
                    <span>Activa]</span>
                  </span>
                </div>

                <div>
                  <span className="text-gray-500 font-medium block">Fecha de Inicio:</span>
                  <span className="font-semibold text-gray-800 mt-0.5 block">[01/01/2024]</span>
                </div>

                <div>
                  <span className="text-gray-500 font-medium block">Fecha de Vencimiento:</span>
                  <span className="font-semibold text-gray-800 mt-0.5 block">[31/12/2024]</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 font-medium block">Técnicos Autorizados:</span>
                  <span className="font-semibold text-gray-800 mt-0.5 block">[50]</span>
                </div>

                <div>
                  <span className="text-gray-500 font-medium block">Módulos Habilitados:</span>
                  <p className="font-medium text-gray-700 leading-relaxed mt-0.5 bg-gray-50 p-2 rounded border border-gray-100">
                    [Gestión de Órdenes, Inventario, Diagnóstico Avanzado, Garantías, Auditoría, BI]
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Uso de Almacenamiento */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Uso de Almacenamiento
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Espacio Disponible:</span>
                <span className="font-bold text-gray-900">[500 GB]</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Espacio Utilizado:</span>
                <span className="font-bold text-gray-900">[355 GB]</span>
              </div>

              <div className="pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 font-medium">Barra de progreso:</span>
                  <span className="font-bold text-gray-900">71%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden border border-gray-200">
                  <div className="bg-slate-800 h-3 rounded-full" style={{ width: '71%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Panel Lateral: Configuración General (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Configuración General
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-gray-600 font-medium block">Nombre del Taller:</span>
              <p className="font-semibold text-gray-900 mt-0.5">[TechService Web - Taller Central]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Zona Horaria:</span>
              <p className="font-semibold text-gray-900 mt-0.5">[GMT-5 (Bogotá, Lima, Quito)]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block">Formato de Fecha:</span>
              <p className="font-semibold text-gray-900 mt-0.5">[DD/MM/AAAA]</p>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block mb-1">Habilitar Registro Público de Clientes:</span>
              <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span>[✓</span>
                <span>Activado]</span>
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block mb-1">Notificaciones Automáticas:</span>
              <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <span>[✓</span>
                <span>Activado]</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-11: GESTIONAR/RENOVAR LICENCIA
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            GUARDAR CONFIGURACIÓN GENERAL
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          EXPORTAR CONFIGURACIÓN
        </button>
      </div>
    </main>
  );
}