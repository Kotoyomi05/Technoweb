import React, { useState } from 'react';

export default function ConfiguracionGarantiasView({ onBack }) {
  const [controlDefecto, setControlDefecto] = useState(true);
  const [duracionNuevos, setDuracionNuevos] = useState('90 días');
  const [duracionRepuestos, setDuracionRepuestos] = useState('60 días');

  const [cobertura, setCobertura] = useState({
    manoObra: true,
    repuestos: true,
    desgasteNormal: false,
  });

  const [sla, setSla] = useState({
    respuestaInicial: '24 horas',
    resolucionPromedio: '72 horas',
  });

  const [tiposReclamacion, setTiposReclamacion] = useState({
    fallaHardware: true,
    defectoFabricacion: true,
    danoTransporte: true,
    instalacionIncorrecta: false,
    otro: true,
  });

  const handleCoberturaChange = (key) => {
    setCobertura(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTipoChange = (key) => {
    setTiposReclamacion(prev => ({ ...prev, [key]: !prev[key] }));
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - CONTROL DE GARANTÍAS (PA-04)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Configuración de Políticas y Tipos (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Políticas de Garantía */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Políticas de Garantía
            </h3>

            {/* Políticas de Garantía Generales */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Políticas de Garantía Generales:</h4>
              <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={controlDefecto}
                  onChange={() => setControlDefecto(!controlDefecto)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Habilitar control de garantías por defecto.</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Duración de Garantía Predeterminada (Nuevos):
                  </label>
                  <input
                    type="text"
                    value={duracionNuevos}
                    onChange={(e) => setDuracionNuevos(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Duración de Garantía Predeterminada (Repuestos):
                  </label>
                  <input
                    type="text"
                    value={duracionRepuestos}
                    onChange={(e) => setDuracionRepuestos(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Configuración de Cobertura */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Configuración de Cobertura:</h4>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cobertura.manoObra}
                    onChange={() => handleCoberturaChange('manoObra')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cubrir mano de obra en garantía.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cobertura.repuestos}
                    onChange={() => handleCoberturaChange('repuestos')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cubrir repuestos en garantía.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cobertura.desgasteNormal}
                    onChange={() => handleCoberturaChange('desgasteNormal')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Cubrir desgaste normal.</span>
                </label>
              </div>
            </div>

            {/* SLA de Reclamaciones (Objetivo) */}
            <div className="space-y-3 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">SLA de Reclamaciones (Objetivo):</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tiempo de Respuesta Inicial:
                  </label>
                  <input
                    type="text"
                    value={sla.respuestaInicial}
                    onChange={(e) => setSla({ ...sla, respuestaInicial: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tiempo de Resolución Promedio:
                  </label>
                  <input
                    type="text"
                    value={sla.resolucionPromedio}
                    onChange={(e) => setSla({ ...sla, resolucionPromedio: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Gestión de Tipos de Reclamación */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Gestión de Tipos de Reclamación
            </h3>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-800">
                Tipos de Reclamación Activos:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tiposReclamacion.fallaHardware}
                    onChange={() => handleTipoChange('fallaHardware')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Falla de Hardware</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tiposReclamacion.defectoFabricacion}
                    onChange={() => handleTipoChange('defectoFabricacion')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Defecto de Fabricación</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tiposReclamacion.danoTransporte}
                    onChange={() => handleTipoChange('danoTransporte')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Daño en Transporte</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tiposReclamacion.instalacionIncorrecta}
                    onChange={() => handleTipoChange('instalacionIncorrecta')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Instalación Incorrecta</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tiposReclamacion.otro}
                    onChange={() => handleTipoChange('otro')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Otro</span>
                </label>
              </div>

              <div className="pt-2">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Agregar Tipo]
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Garantías PA-04 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Garantías PA-04
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Políticas Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Tipos de Reclamación:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[4]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">SLA de Resolución:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[72h]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Modificación:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Garantías Activas (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Garantías Activas (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-800">
              <div>
                <p className="font-bold text-gray-900">Garantía Extendida #GE-1051:</p>
                <p className="text-gray-600">2 Años (Vence 10/09/2026)</p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="font-bold text-gray-900">Garantía Estándar #GE-1052:</p>
                <p className="text-gray-600">90 Días (Vence 09/12/2024)</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-19: GUARDAR CONFIGURACIÓN PA-04
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-04)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR RECLAMACIONES PENDIENTES
        </button>
      </div>
    </main>
  );
}