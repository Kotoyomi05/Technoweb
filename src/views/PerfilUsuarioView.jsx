import React from 'react';

export default function PerfilUsuarioView({ onBack, user }) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <button 
        onClick={onBack} 
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver al Dashboard</span>
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">
          CONFIGURACIÓN DE PERFIL DE USUARIO
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Datos Personales
          </h3>

          <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative">
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"} 
                alt={user?.nombre} 
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
              />
            </div>

            <div className="space-y-3 text-sm flex-1">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase block">Nombre Completo</span>
                <p className="text-gray-900 font-semibold text-base mt-0.5">{user?.nombre}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase block">Correo Electrónico</span>
                <p className="text-gray-800 font-medium mt-0.5">{user?.email}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase block">Rol del Sistema</span>
                <p className="text-gray-700 font-medium mt-0.5">{user?.rol}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase block">Teléfono de Contacto</span>
                <p className="text-gray-800 font-medium mt-0.5">{user?.telefono}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase block">Dirección</span>
                <p className="text-gray-800 font-medium mt-0.5">{user?.direccion}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Seguridad de la Cuenta
          </h3>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-700 uppercase block">Contraseña Actual</span>
            <p className="text-gray-800 font-bold tracking-widest text-sm">••••••••</p>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-3 py-1.5 rounded-lg text-xs transition shadow-sm cursor-pointer mt-1">
              Cambiar Contraseña
            </button>
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-100">
            <span className="text-xs font-semibold text-gray-700 uppercase block">Autenticación de Dos Pasos</span>
            <p className="text-xs text-gray-600 font-medium">Activada (SMS)</p>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-3 py-1.5 rounded-lg text-xs transition shadow-sm cursor-pointer mt-1">
              Configurar 2FA
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-4 mb-4">
          Preferencias del Sistema
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Notificaciones por Correo</span>
            <span className="font-medium text-gray-800">(Activo)</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Idioma</span>
            <span className="font-medium text-gray-800">(Español)</span>
          </div>

          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Tema</span>
            <span className="font-medium text-gray-800">(Claro)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button 
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer"
        >
          Guardar Cambios
        </button>
        <button 
          onClick={onBack}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-sm transition shadow-sm cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </main>
  );
}