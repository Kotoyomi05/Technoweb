import React from 'react';

export default function DashboardView() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">PANEL PRINCIPAL TÉCNICO</h1>
        <p className="text-gray-600 mt-1">Bienvenido, Jack Rowe. <span className="text-gray-500">Resumen de actividades del día</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-600 font-medium text-sm">Mis Órdenes Asignadas</h3>
          <p className="text-5xl font-light text-gray-900 mt-4">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-600 font-medium text-sm">Equipos en Diagnóstico</h3>
          <p className="text-5xl font-light text-gray-900 mt-4">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-600 font-medium text-sm">Tareas Pendientes</h3>
          <p className="text-5xl font-light text-gray-900 mt-4">0</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-4 text-sm text-gray-700">
          <div className="pb-3 border-b border-gray-100 flex items-center">
            <span className="font-medium text-gray-900 w-16">09:00</span>
            <span className="text-gray-600">- Nueva orden #1042 asignada</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-900 w-16">09:30</span>
            <span className="text-gray-600">- Orden #1039 cambiada a 'Reparado'</span>
          </div>
        </div>
      </div>
    </main>
  );
}