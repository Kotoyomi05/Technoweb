import React from 'react';

export default function CentroAyudaView({ onBack }) {
  const faqs = [
    '¿Cómo crear una nueva orden de servicio?',
    'Solución de problemas comunes de impresión.',
    'Guía de uso del Módulo de Diagnóstico Interactivo.',
    'Políticas de garantía y devoluciones.',
  ];

  const guias = [
    '[Video Tutorial] Introducción a TechService Web.',
    '[PDF Descargable] Manual del Usuario - Módulo de Inventario.',
    '[Guía Paso a Paso] Proceso de Cierre de Orden y Facturación.',
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
          CENTRO DE AYUDA Y SOPORTE INTEGRAL
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Recursos de Autoayuda (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Recursos de Autoayuda
          </h3>

          {/* Preguntas Frecuentes (FAQ) */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-sm">
              Preguntas Frecuentes (FAQ)
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              {faqs.map((faq, idx) => (
                <li key={idx} className="flex items-center space-x-1.5 hover:text-blue-600 cursor-pointer transition">
                  <span className="font-medium">{faq}</span>
                  <span className="text-gray-400 text-[11px]">(Enlace)</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tutoriales y Guías */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="font-bold text-gray-800 text-sm">
              Tutoriales y Guías:
            </h4>
            <ul className="space-y-2 text-xs text-gray-700 font-medium">
              {guias.map((guia, idx) => (
                <li key={idx} className="hover:text-blue-600 cursor-pointer transition">
                  {guia}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Paneles Laterales de Soporte (1 Columna) */}
        <div className="space-y-6">
          
          {/* Mis Casos de Soporte Abiertos */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Mis Casos de Soporte Abiertos
            </h3>

            <div className="space-y-3.5 text-xs">
              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
                <p className="font-bold text-gray-900">Caso #3542: Error en reporte BI</p>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">[Enviado 09/09]</span>
                  <span className="inline-flex items-center space-x-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <span>🟢</span>
                    <span>En Progreso</span>
                  </span>
                </div>
              </div>

              <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 space-y-1">
                <p className="font-bold text-gray-900">Caso #3539: Solicitud de nueva categoría de repuesto</p>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">(Enviado 08/09)</span>
                  <span className="inline-flex items-center space-x-1 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <span>🟡</span>
                    <span>Esperando Info</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Soporte Técnico Directo */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Soporte Técnico Directo
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Teléfono:</span>
                <p className="font-bold text-gray-900 mt-0.5">+57 (1) 800-TECH</p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Correo:</span>
                <p className="font-bold text-gray-900 mt-0.5">soporte@techserviceweb.com</p>
              </div>

              <div className="pt-2 border-t border-gray-100 space-y-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-gray-500 font-medium">Chat en Vivo:</span>
                  <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 border border-purple-300 font-semibold px-2.5 py-0.5 rounded text-[11px] transition cursor-pointer flex items-center space-x-1">
                    <span>🟣</span>
                    <span>Iniciar Chat</span>
                  </button>
                </div>
                <span className="text-[10px] text-gray-400 block">(Available 24/7)</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-13: ENVIAR NUEVA SOLICITUD DE SOPORTE
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            VER HISTORIAL COMPLETO DE CASOS
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          EXPLORAR BASE DE CONOCIMIENTO
        </button>
      </div>
    </main>
  );
}