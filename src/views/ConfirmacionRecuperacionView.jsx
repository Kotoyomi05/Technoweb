import React from 'react';

export default function ConfirmacionRecuperacionView({ onBackToLogin }) {
  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4 py-12">
      {/* Encabezado Superior */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase block mb-1">
          CONFIRMACIÓN DE ENVÍO DE RECUPERACIÓN
        </span>
      </div>

      {/* Tarjeta de Confirmación */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-md w-full text-center space-y-6">
        
        {/* Ícono verde de éxito */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-500 text-emerald-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Título Principal */}
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase leading-snug">
          SOLICITUD DE RECUPERACIÓN EXITOSA
        </h1>

        {/* Caja de Información */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-left text-xs text-gray-700 space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-gray-500 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </span>
            <p className="leading-relaxed">
              Se ha enviado un correo electrónico a <span className="font-bold text-gray-900">ejemplo@techservice.com</span> con las instrucciones para restablecer su contraseña.
            </p>
          </div>
          <p className="text-gray-500 leading-relaxed pt-1 border-t border-gray-200/60">
            Por favor, revise su bandeja de entrada y su carpeta de spam. El enlace caducará en 60 minutos.
          </p>
        </div>

        {/* Siguientes Pasos */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 text-left">
            Siguientes Pasos
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={onBackToLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              IR A LA PÁGINA DE INICIO (LOGIN)
            </button>
            
            <button 
              onClick={() => alert('Correo reevaluado y reenviado.')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
            >
              REENVIAR CORREO DE RECUPERACIÓN
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}