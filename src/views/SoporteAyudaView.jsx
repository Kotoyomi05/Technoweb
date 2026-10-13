import React, { useState } from 'react';

export default function SoporteAyudaView({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    '¿Cómo crear una nueva orden de servicio?',
    '¿Cómo gestionar el inventario de repuestos?',
    '¿Cómo generar reportes de auditoría?',
    '¿Cómo actualizar mi perfil de usuario?',
  ];

  const guias = [
    'Guía de Inicio Rápido (PDF)',
    'Manual Completo del Sistema (PDF)',
    'Video Tutoriales',
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
          SOPORTE Y AYUDA DEL SISTEMA
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Recursos de Ayuda (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base">
            Recursos de Ayuda
          </h3>

          {/* Buscador */}
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search de documentación" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* FAQ - Preguntas Frecuentes */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-gray-900 text-sm">
              FAQ - Preguntas Frecuentes
            </h4>
            <ul className="space-y-2 list-disc list-inside text-xs text-gray-700">
              {faqs.map((faq, idx) => (
                <li key={idx} className="hover:text-blue-600 cursor-pointer transition">
                  {faq}
                </li>
              ))}
            </ul>
          </div>

          {/* Guías Rápidas de Usuario */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 text-sm">
              Guías Rápidas de Usuario
            </h4>
            <ul className="space-y-2 list-disc list-inside text-xs text-gray-700">
              {guias.map((guia, idx) => (
                <li key={idx} className="hover:text-blue-600 cursor-pointer transition">
                  {guia}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Soporte Técnico (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Soporte Técnico
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-gray-500 font-medium block">Contacto de Soporte</span>
              <p className="text-sm font-medium text-gray-900 mt-0.5">soporte@techserviceweb.com</p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="text-gray-500 font-medium block">Teléfono de Soporte</span>
              <p className="text-sm font-medium text-gray-900 mt-0.5">(555) SOPORTE (767-6783)</p>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <span className="text-gray-500 font-medium block">Horario de Atención</span>
              <p className="text-xs font-semibold text-gray-800 mt-0.5">Lunes a Viernes</p>
              <p className="text-xs text-gray-600">8:00 AM - 6:00 PM (COT)</p>
            </div>

            <div className="pt-2">
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-3 rounded-lg text-xs transition border border-gray-300 cursor-pointer text-center">
                PF-16: Enviar Ticket de Soporte
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Botón Inferior */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          Generar Ticket de Soporte
        </button>
      </div>
    </main>
  );
}