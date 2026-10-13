import React from 'react';

export default function ConfirmacionCambioPasswordView({ onBackToLogin, onForgotPassword }) {
  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4 py-12">
      {/* Subtítulo Superior */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase block">
          CONFIRMACIÓN DE CAMBIO
        </span>
      </div>

      {/* Tarjeta de Confirmación */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-md w-full text-center space-y-6">
        
        {/* Ícono de éxito */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex flex-col items-center justify-center border-2 border-emerald-500 text-emerald-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider -mt-1">Done</span>
          </div>
        </div>

        {/* Encabezado Principal */}
        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight uppercase leading-snug">
          CONTRASEÑA ACTUALIZADA CORRECTAMENTE
        </h1>

        {/* Texto Descriptivo */}
        <p className="text-xs text-gray-600 leading-relaxed">
          Su contraseña ha sido modificada con éxito. Ahora puede iniciar sesión con sus nuevas credenciales.
        </p>

        {/* Botón Principal */}
        <button 
          onClick={onBackToLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          IR A LA PÁGINA DE INICIO (LOGIN)
        </button>

        {/* Enlaces inferiores */}
        <div className="text-xs text-gray-600 space-y-1.5 pt-2 border-t border-gray-100">
          <div>
            <button 
              type="button"
              onClick={onForgotPassword}
              className="underline font-medium hover:text-blue-600 cursor-pointer"
            >
              ¿Olvidó su contraseña?
            </button>
          </div>
          <div>
            <span>¿No tiene cuenta? </span>
            <a href="#" className="underline font-medium hover:text-blue-600">
              Solicite acceso
            </a>.
          </div>
        </div>

      </div>
    </main>
  );
}