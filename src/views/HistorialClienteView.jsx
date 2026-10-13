import React, { useState } from 'react';

export default function HistorialClienteView({ onBack }) {
  const [selectedOrder, setSelectedOrder] = useState('#0912');

  const historial = [
    {
      id: '#0912',
      fecha: '15/01/2024',
      estado: 'FINALIZADO',
      descripcion: 'Reemplazo de batería y mantenimiento preventivo.',
      diagnostico: 'Equipo presentaba baja autonomía. Se confirma desgaste de batería (ciclos límite superados). Se sugiere cambio.',
      servicio: 'Desarme, reemplazo de batería (REP-0045), limpieza interna, y testeo de carga.',
      repuestos: [
        { codigo: 'REP-0045', descripcion: 'Batería HP Pavilion 15-cs', cantidad: 1 },
        { codigo: 'INS-0010', descripcion: 'Pasta Térmica Artic MX-4', cantidad: 1 },
      ],
      manoDeObra: '$150.000',
      costoRepuestos: '$350.000',
      total: '$500.000',
    },
    {
      id: '#0755',
      fecha: '10/06/2023',
      estado: 'FINALIZADO',
      descripcion: 'Limpieza de sistema de ventilación.',
      diagnostico: 'Temperaturas elevadas por acumulación de polvo en el disipador.',
      servicio: 'Mantenimiento general y cambio de pasta térmica.',
      repuestos: [
        { codigo: 'INS-0010', descripcion: 'Pasta Térmica Artic MX-4', cantidad: 1 },
      ],
      manoDeObra: '$80.000',
      costoRepuestos: '$30.000',
      total: '$110.000',
    },
    {
      id: '#0501',
      fecha: '05/01/2023',
      estado: 'FINALIZADO',
      descripcion: 'Formateo y actualización de sistema operativo.',
      diagnostico: 'Sistema operativo lento e inestable por malware.',
      servicio: 'Instalación limpia de Windows 11 y controladores oficiales.',
      repuestos: [],
      manoDeObra: '$90.000',
      costoRepuestos: '$0',
      total: '$90.000',
    },
  ];

  const currentDetail = historial.find((h) => h.id === selectedOrder) || historial[0];

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Botón Volver */}
      <button 
        onClick={onBack} 
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver</span>
      </button>

      {/* Encabezado */}
      <div className="mb-8">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          HISTORIAL DE REPARACIONES DEL CLIENTE
        </span>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">
          HISTORIAL: ANA GARCÍA
        </h1>
        <p className="text-gray-600 mt-1">
          Dispositivo Asociado: Laptop HP Pavilion 15-cs (CND812345G)
        </p>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Timeline - Reparaciones Anteriores (2 Columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 text-base mb-6">
            Reparaciones Anteriores
          </h3>

          <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
            {historial.map((item) => {
              const isSelected = item.id === selectedOrder;
              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedOrder(item.id)}
                  className={`relative pl-6 cursor-pointer transition-all ${
                    isSelected ? 'opacity-100' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  {/* Punto en la línea de tiempo */}
                  <div 
                    className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 ${
                      isSelected 
                        ? 'bg-blue-600 border-white ring-2 ring-blue-500' 
                        : 'bg-gray-300 border-white'
                    }`}
                  ></div>

                  {/* Tarjeta de la orden */}
                  <div className={`p-4 rounded-xl border transition ${
                    isSelected ? 'bg-blue-50/20 border-blue-400 shadow-sm' : 'bg-gray-50/50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 text-sm">{item.fecha}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          [{item.estado}]
                        </span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                        [{item.estado}]
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Orden Orden: {item.id}</p>
                    <p className="text-sm text-gray-800 font-medium">{item.descripcion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel Lateral - Detalle de Orden (1 Columna) */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Detalle de Orden {currentDetail.id} ({currentDetail.fecha})
            </h3>

            {/* Diagnóstico Técnico */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Diagnóstico Técnico
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {currentDetail.diagnostico}
              </p>
            </div>

            {/* Servicio Realizado */}
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Servicio Realizado
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {currentDetail.servicio}
              </p>
            </div>

            {/* Repuestos Utilizados */}
            {currentDetail.repuestos.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Repuestos Utilizados
                </h4>
                <div className="overflow-hidden border border-gray-200 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold">
                        <th className="py-1.5 px-2">Código</th>
                        <th className="py-1.5 px-2">Descripción</th>
                        <th className="py-1.5 px-2 text-center">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-700">
                      {currentDetail.repuestos.map((rep, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 px-2 font-medium">{rep.codigo}</td>
                          <td className="py-1.5 px-2">{rep.descripcion}</td>
                          <td className="py-1.5 px-2 text-center">{rep.cantidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Costos */}
            <div className="border-t border-gray-100 pt-3 text-xs space-y-1">
              <span className="font-semibold text-gray-700 block mb-1">Costos</span>
              <div className="flex justify-between text-gray-600">
                <span>Mano de Obra:</span>
                <span className="font-medium text-gray-800">{currentDetail.manoDeObra}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Repuestos:</span>
                <span className="font-medium text-gray-800">{currentDetail.costoRepuestos}</span>
              </div>
              <div className="flex justify-between text-gray-900 font-bold text-sm pt-1 border-t border-gray-100">
                <span>Total:</span>
                <span>{currentDetail.total}</span>
              </div>
            </div>
          </div>

          {/* Botón PDF */}
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-sm transition cursor-pointer text-center">
            Ver Orden Completa (PDF)
          </button>
        </div>

      </div>
    </main>
  );
}