import React, { useState } from 'react';

export default function RecuperarPasswordView({ onBackToLogin, onSendSuccess }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendSuccess();
  };

  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase block mb-1">
          RECUPERACIÓN DE CONTRASEÑA
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
          RESTABLECIMIENTO DE ACCESO
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Ingrese su correo electrónico para recibir instrucciones de recuperación
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-md w-full space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Correo Electrónico Registrado
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </span>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@techservice.com" 
                className="w-full bg-gray-50/50 border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed pt-1">
            Se enviará un enlace único a su dirección de correo electrónico para restablecer su contraseña. Este enlace caducará en 60 minutos.
          </p>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer mt-2"
          >
            ENVIAR ENLACE DE RECUPERACIÓN
          </button>
        </form>

        <button 
          type="button"
          onClick={onBackToLogin}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
        >
          CANCELAR Y VOLVER AL LOGIN
        </button>
      </div>
    </main>
  );
}