import React, { useState } from 'react';

export default function ConfiguracionRecursosTecnicosView({ onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [asignacionAutomatica, setAsignacionAutomatica] = useState(true);
  const [criterioCarga, setCriterioCarga] = useState('Técnicos disponibles + Especialidad coincidente');
  const [limiteOrdenes, setLimiteOrdenes] = useState('5');

  const especialidades = [
    {
      id: '[SPEC-001]',
      nombre: '[Reparación Laptop Avanzada]',
      nivel: 'Avanzado',
      nivelColor: 'bg-emerald-500',
      herramientas: '[Osciloscopio, Multímetro]',
      tecnicos: '[3]'
    },
    {
      id: '[SPEC-002]',
      nombre: '[Micro-soldadura BGA]',
      nivel: 'Experto',
      nivelColor: 'bg-rose-500',
      herramientas: '[Estación Aire Caliente, Microscopio]',
      tecnicos: '[2]'
    },
    {
      id: '[SPEC-003]',
      nombre: '[Mantenimiento Impresoras]',
      nivel: 'Intermedio',
      nivelColor: 'bg-amber-400',
      herramientas: '[Kit Limpieza, Destornilladores]',
      tecnicos: '[4]'
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
          CONFIGURACIÓN AVANZADA DEL SISTEMA - RECURSOS TÉCNICOS (PA-02)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel de Gestión de Especialidades y Reglas (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Gestión de Especialidades Técnicas */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base">
              Gestión de Especialidades Técnicas
            </h3>

            {/* Buscador */}
            <div className="pt-1">
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
                  placeholder="Especialidad o técnico..." 
                  className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Tabla de Especialidades */}
            <div className="overflow-x-auto border-t border-gray-100 pt-3">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                    <th className="py-2.5 px-3">ID</th>
                    <th className="py-2.5 px-3">Nombre de Especialidad</th>
                    <th className="py-2.5 px-3">Nivel de Habilidad Predeterminado</th>
                    <th className="py-2.5 px-3">Herramientas Asociadas</th>
                    <th className="py-2.5 px-3">Técnicos Certificados</th>
                    <th className="py-2.5 px-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {especialidades.map((esp) => (
                    <tr key={esp.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-3 px-3 font-semibold text-gray-800">{esp.id}</td>
                      <td className="py-3 px-3 font-bold text-gray-900">{esp.nombre}</td>
                      <td className="py-3 px-3 font-medium">
                        <div className="flex items-center space-x-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${esp.nivelColor}`} />
                          <span className="text-gray-800">{esp.nivel}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-gray-700">{esp.herramientas}</td>
                      <td className="py-3 px-3 font-semibold text-gray-800">{esp.tecnicos}</td>
                      <td className="py-3 px-3 space-y-1">
                        <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                          Botón: Editar
                        </button>
                        <button className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center">
                          Botón: Detalles
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Reglas de Asignación de Tareas */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Reglas de Asignación de Tareas
            </h3>

            <div className="space-y-4 text-xs">
              {/* Asignación Automática */}
              <div className="flex items-center space-x-3">
                <span className="font-bold text-gray-800">Asignación Automática:</span>
                <button 
                  onClick={() => setAsignacionAutomatica(!asignacionAutomatica)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    asignacionAutomatica ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    asignacionAutomatica ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
                <span className="font-semibold text-gray-700">
                  {asignacionAutomatica ? 'Habilitada' : 'Deshabilitada'}
                </span>
              </div>

              {/* Criterios de Carga */}
              <div>
                <label className="block font-bold text-gray-800 mb-1">Criterios de Carga:</label>
                <select
                  value={criterioCarga}
                  onChange={(e) => setCriterioCarga(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="Técnicos disponibles + Especialidad coincidente">
                    Técnicos disponibles + Especialidad coincidente
                  </option>
                  <option value="Menor Carga de Trabajo Acumulada">
                    Menor Carga de Trabajo Acumulada
                  </option>
                  <option value="Rotación Equitativa de Pedidos">
                    Rotación Equitativa de Pedidos
                  </option>
                </select>
              </div>

              {/* Límite de Órdenes Simultáneas por Técnico */}
              <div>
                <label className="block font-bold text-gray-800 mb-1">
                  Límite de Órdenes Simultáneas por Técnico:
                </label>
                <input
                  type="number"
                  value={limiteOrdenes}
                  onChange={(e) => setLimiteOrdenes(e.target.value)}
                  className="w-full sm:w-48 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Recursos Técnicos PA-02 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Recursos Técnicos PA-02
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Especialidades Activas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[12]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Técnicos Activos:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[42]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Herramientas Registradas:</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[155]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Última Modificación:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024]</span>
              </div>
            </div>
          </div>

          {/* Top 5 Técnicos por Especialidad (Ejemplo) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Top 5 Técnicos por Especialidad (Ejemplo)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-gray-900 block mb-0.5">[Reparación Laptop]</span>
                <p className="text-gray-700 font-medium">Jack Rowe, Ana García, Pedro Gómez.</p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="font-bold text-gray-900 block mb-0.5">[Micro-soldadura]</span>
                <p className="text-gray-700 font-medium">Jack Rowe, Luis Torres.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-17: GUARDAR CONFIGURACIÓN PA-02
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-02)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          GESTIONAR TÉCNICOS Y CERTIFICACIONES
        </button>
      </div>
    </main>
  );
}