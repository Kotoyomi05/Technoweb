import React, { useState } from 'react';

export default function ConfiguracionTallerView({ onBack }) {
  const [nombreTaller, setNombreTaller] = useState('TechService Web Central');
  const [direccion, setDireccion] = useState('Calle 123 # 45-67, Ciudad');
  const [telefono, setTelefono] = useState('(555) 123-4567');
  const [email, setEmail] = useState('contacto@techserviceweb.com');
  const [sitioWeb, setSitioWeb] = useState('www.techserviceweb.com');

  const [moneda, setMoneda] = useState('$ USD');
  const [zonaHoraria, setZonaHoraria] = useState('(GMT-05:00) Eastern Time');
  const [formatoFecha, setFormatoFecha] = useState('DD/MM/AAAA');

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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - CONFIGURACIÓN GENERAL DEL TALLER (PS-01)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal: Detalles del Taller (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Detalles del Taller
          </h3>

          {/* Información del Taller */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-800">Información del Taller:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Nombre del Taller:
                </label>
                <input
                  type="text"
                  value={nombreTaller}
                  onChange={(e) => setNombreTaller(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Dirección Principal:
                </label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Teléfono de Contacto:
                </label>
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Sitio Web:
                </label>
                <input
                  type="text"
                  value={sitioWeb}
                  onChange={(e) => setSitioWeb(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Configuración Regional */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800">Configuración Regional:</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Moneda Predeterminada:
                </label>
                <select
                  value={moneda}
                  onChange={(e) => setMoneda(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="$ USD">$ USD</option>
                  <option value="$ COP">$ COP</option>
                  <option value="€ EUR">€ EUR</option>
                  <option value="$ MXN">$ MXN</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Zona Horaria:
                </label>
                <select
                  value={zonaHoraria}
                  onChange={(e) => setZonaHoraria(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="(GMT-05:00) Eastern Time">(GMT-05:00) Eastern Time</option>
                  <option value="(GMT-05:00) Bogotá, Lima, Quito">(GMT-05:00) Bogotá, Lima, Quito</option>
                  <option value="(GMT-06:00) Mexico City">(GMT-06:00) Mexico City</option>
                  <option value="(GMT+01:00) Madrid">(GMT+01:00) Madrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Formato de Fecha:
                </label>
                <select
                  value={formatoFecha}
                  onChange={(e) => setFormatoFecha(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="DD/MM/AAAA">DD/MM/AAAA</option>
                  <option value="MM/DD/AAAA">MM/DD/AAAA</option>
                  <option value="AAAA-MM-DD">AAAA-MM-DD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Identidad Visual */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-800">Identidad Visual:</h4>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl shadow-2xs">
                ❖
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800">Logotipo del Taller:</p>
                <p className="text-[11px] text-gray-500">[Hexágono Azul - TechService Web] (Pequeña vista previa)</p>
              </div>
            </div>

            <div className="pt-1">
              <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                [Botón: Cambiar Logotipo]
              </button>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Configuración PS-01 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Configuración PS-01:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Taller Activo:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[Sí]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Moneda:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[USD]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Zona Horaria:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[UTC-5]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Modificación:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024 10:00]</span>
              </div>
            </div>
          </div>

          {/* Estado del Sistema (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Estado del Sistema (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Sucursales Vinculadas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[3]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Técnicos Registrados:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[15]</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          PF-16: GUARDAR CONFIGURACIÓN PS-01
        </button>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          RESTAURAR VALORES PREDETERMINADOS (PS-01)
        </button>
      </div>
    </main>
  );
}