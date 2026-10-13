import React, { useState } from 'react';

export default function AsignarRepuestoView({ onBack, onConfirmSuccess }) {
  const [inventario] = useState([
    { id: 'REP-0045', nombre: 'Batería HP Pavilion', stock: '15', precio: 120000 },
    { id: 'REP-0098', nombre: 'Jack DC HP Pavilion', stock: '28', precio: 45000 },
    { id: 'PANT-012', nombre: 'Display 15.6" FHD', stock: '7', precio: 280000 },
    { id: 'INS-0010', nombre: 'Pasta Térmica', stock: '50+', precio: 20000 },
  ]);

  const [asignados, setAsignados] = useState([
    { id: 'REP-0098', nombre: 'Jack DC HP Pavilion', cantidad: 1, precio: 45000 },
    { id: 'INS-0010', nombre: 'Pasta Térmica', cantidad: 1, precio: 20000 },
  ]);

  const handleAgregar = (item) => {
    const existe = asignados.find((a) => a.id === item.id);
    if (existe) {
      setAsignados(
        asignados.map((a) =>
          a.id === item.id ? { ...a, cantidad: a.cantidad + 1 } : a
        )
      );
    } else {
      setAsignados([...asignados, { ...item, cantidad: 1 }]);
    }
  };

  const handleRemover = (id) => {
    setAsignados(asignados.filter((a) => a.id !== id));
  };

  const totalCosto = asignados.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <button 
        onClick={onBack} 
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver al Diagnóstico</span>
      </button>

      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          ASIGNACIÓN DE REPUESTOS Y MATERIALES
        </span>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">
          ORDEN #1042: GESTIÓN DE INVENTARIO
        </h1>
        <p className="text-gray-600 mt-1">
          Seleccione los repuestos necesarios para la reparación en curso
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-semibold text-gray-900 text-base">Inventario Disponible</h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input type="text" placeholder="" className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" />
            </div>
            <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer sm:w-64">
              <option>Categoría</option>
              <option>Pantallas, Baterías, Placas Base, Insumos</option>
            </select>
          </div>

          <div className="divide-y divide-gray-100 border-t border-b border-gray-100 py-1">
            {inventario.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between text-sm hover:bg-gray-50/50 px-2 rounded-lg transition">
                <span className="font-bold text-gray-900 w-24">{item.id}</span>
                <span className="text-gray-700 flex-1 px-2 font-medium">{item.nombre}</span>
                <span className="text-gray-600 w-24 text-center">Stock: {item.stock}</span>
                <button 
                  onClick={() => handleAgregar(item)}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer text-xs ml-2"
                >
                  [Agregar +]
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Repuestos Asignados (Orden #1042)
            </h3>

            <div className="space-y-3">
              {asignados.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-4 text-center">No hay repuestos asignados aún.</p>
              ) : (
                asignados.map((item) => (
                  <div key={item.id} className="bg-gray-50/80 p-3 rounded-lg border border-gray-100 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900">{item.id}</p>
                      <p className="text-gray-600 mt-0.5">{item.nombre}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700 font-medium">Cantidad: {item.cantidad}</span>
                      <button 
                        onClick={() => handleRemover(item.id)}
                        className="text-gray-400 hover:text-red-600 font-bold text-sm cursor-pointer ml-1"
                      >
                        [x]
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Total estimated cost</span>
              <span className="font-bold text-gray-900 text-base">
                ${totalCosto.toLocaleString('es-CO')}
              </span>
            </div>

            <div className="space-y-2">
              <button 
                onClick={onConfirmSuccess}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-xs transition shadow-sm cursor-pointer text-center"
              >
                PF-11: Confirmar y Descontar Stock
              </button>
              <button 
                onClick={onBack}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg text-xs transition shadow-sm cursor-pointer text-center"
              >
                PF-04: Volver al Diagnóstico
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}