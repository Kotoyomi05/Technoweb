import React, { useState } from 'react';
import { usersList } from '../data/userData';
import SolicitarActivacionModal from '../components/SolicitarActivacionModal';

const USERS_STORAGE_KEY = 'techservice_users_list';

export default function LoginView({
  users = usersList,
  onLoginSuccess,
  onForgotPassword,
  onGoToReset,
  onCreateAccessRequest,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Modal de recuperar contraseña (con código y enlace de prueba en pantalla)
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoverySent, setRecoverySent] = useState(false);
  const [resetCode, setResetCode] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Por favor, ingresa correo y contraseña.');
      return;
    }

    let candidateUsers = Array.isArray(users) ? [...users] : [];
    try {
      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Priorizamos los usuarios guardados en localStorage (incluyendo aprobados y cambios de clave)
          const byEmail = new Map();
          candidateUsers.forEach((u) => {
            if (u?.email) byEmail.set(u.email.toLowerCase(), u);
          });
          parsed.forEach((u) => {
            if (u?.email) byEmail.set(u.email.toLowerCase(), u);
          });
          candidateUsers = Array.from(byEmail.values());
        }
      }
    } catch {
      // Si localStorage no está disponible, usar la lista recibida por props
    }

    const matchedUser = candidateUsers.find(
      (u) =>
        (u.email || '').trim().toLowerCase() === cleanEmail &&
        String(u.password || '').trim() === cleanPassword
    );

    if (!matchedUser) {
      setError('Correo electrónico o contraseña incorrectos.');
      return;
    }

    setError('');
    if (onLoginSuccess) {
      onLoginSuccess(matchedUser);
    }
  };

  const openForgotModal = (e) => {
    e.preventDefault();
    setRecoveryEmail(email);
    setRecoverySent(false);
    setResetCode('');
    setIsForgotModalOpen(true);
  };

  const handleSendRecovery = (e) => {
    e.preventDefault();
    const cleanTarget = recoveryEmail.trim().toLowerCase();
    if (!cleanTarget) return;

    const generatedCode = String(Math.floor(100000 + Math.random() * 900000));
    setRecoveryEmail(cleanTarget);
    setResetCode(generatedCode);
    setRecoverySent(true);
  };

  const handleGoToResetNow = () => {
    const cleanTarget = recoveryEmail.trim().toLowerCase();
    setIsForgotModalOpen(false);
    setRecoverySent(false);
    if (onGoToReset) {
      onGoToReset(cleanTarget);
    } else if (onForgotPassword) {
      onForgotPassword();
    }
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
            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-2.5 rounded-lg text-xs font-medium">
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
                placeholder="ejemplo@techserviceweb.com"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center space-x-2 cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
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
              <a
                href="#forgot"
                onClick={openForgotModal}
                className="text-blue-600 hover:underline font-medium"
              >
                ¿Olvidó su contraseña?
              </a>
            </p>
            <p className="text-gray-600">
              ¿No tiene cuenta?{' '}
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  setIsRequestModalOpen(true);
                }}
                className="text-blue-600 hover:underline font-semibold"
              >
                Solicite acceso
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      <SolicitarActivacionModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmitRequest={onCreateAccessRequest}
      />

      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full mb-1">
                  Modo Prueba Local
                </span>
                <h3 className="text-base font-bold text-gray-900">Recuperar Contraseña</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 text-sm font-bold px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {!recoverySent ? (
              <form onSubmit={handleSendRecovery} className="space-y-3">
                <p className="text-xs text-gray-600">
                  Ingresa el correo registrado para generar un código y enlace de prueba en
                  pantalla.
                </p>
                <input
                  type="email"
                  required
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="ejemplo@techserviceweb.com"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Generar Código de Prueba
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl p-4 text-xs space-y-2">
                  <p>
                    Simulación de envío para <strong>{recoveryEmail}</strong> (no se envía correo
                    real a Gmail en local).
                  </p>
                  <div className="bg-white border border-blue-200 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-gray-500">
                      Código de prueba:
                    </span>
                    <span className="text-sm font-mono font-extrabold tracking-widest text-blue-700">
                      {resetCode}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={handleGoToResetNow}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  >
                    Ir a Restablecer Contraseña →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}