import React, { useState } from 'react';

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Validación básica interactiva para el prototipo
    if (!email || !password) {
      setError('Por favor, ingresa correo y contraseña.');
      return;
    }

    // Simulación de acceso exitoso
    setError('');
    onLoginSuccess();
  };

  const handleSolicitarAcceso = (e) => {
    e.preventDefault();
    alert('Redirigiendo al formulario de solicitud de registro para nuevos talleres y técnicos...');
  };

  const handleOlvidoPassword = (e) => {
    e.preventDefault();
    alert('Se han enviado las instrucciones de recuperación a tu correo electrónico.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
            ⇧
          </div>
          <span className="text-2xl font-black text-gray-900 tracking-tight">TECHSERVICE WEB</span>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-gray-900 uppercase">
          Bienvenido al Sistema
        </h2>
        <p className="mt-2 text-center text-xs text-gray-600">
          Por favor, ingrese sus credenciales para continuar.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-sm border border-gray-200 rounded-2xl sm:px-10 space-y-6">
          
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2 rounded-lg text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@techservice.com"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-gray-600">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                <span>Recordar mi sesión</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer mt-2"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="text-center space-y-2 pt-2 border-t border-gray-100 text-xs">
            <p>
              <a href="#forgot" onClick={handleOlvidoPassword} className="text-blue-600 hover:underline font-medium">
                ¿Olvidó su contraseña?
              </a>
            </p>
            <p className="text-gray-600">
              ¿No tiene cuenta?{' '}
              <a href="#register" onClick={handleSolicitarAcceso} className="text-blue-600 hover:underline font-semibold">
                Solicite acceso
              </a>
              .
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}