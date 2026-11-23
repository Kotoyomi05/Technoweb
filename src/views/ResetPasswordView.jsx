import React, { useState } from 'react';

export default function ResetPasswordView({
  email = '',
  onResetPassword,
  onBackToLogin,
  onSuccess,
}) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState('');

  const getStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) {
      return { label: 'Seguridad Baja', width: 'w-1/3', bar: 'bg-rose-500', text: 'text-rose-600' };
    }
    if (score <= 3) {
      return { label: 'Seguridad Media', width: 'w-2/3', bar: 'bg-amber-500', text: 'text-amber-500' };
    }
    return { label: 'Seguridad Alta', width: 'w-full', bar: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strength = getStrength(newPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    const hasMinLength = newPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    if (!hasMinLength || !hasUpperCase || !hasNumber || !hasSpecial) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    if (onResetPassword && email) {
      onResetPassword(email, newPassword);
    }
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <main className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-md w-full space-y-6 text-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight uppercase">
            FORMULARIO DE RESTABLECIMIENTO
          </h1>
          {email && (
            <p className="text-xs text-gray-500 mt-1">
              Cuenta: <span className="font-semibold text-gray-700">{email}</span>
            </p>
          )}
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-lg text-xs font-medium text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Nueva Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input
                type={showPassword1 ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50/50 border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input
                type={showPassword2 ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50/50 border border-gray-300 rounded-lg pl-9 pr-10 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="pt-1">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className={`${strength.bar} h-full ${strength.width} transition-all duration-300`}></div>
            </div>
            <p className={`text-[11px] font-bold ${strength.text} text-center mt-1`}>
              {strength.label}
            </p>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed pt-1">
            La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer mt-2"
          >
            ACTUALIZAR CONTRASEÑA Y FINALIZAR
          </button>
        </form>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg text-xs uppercase tracking-wider transition cursor-pointer"
        >
          CANCELAR
        </button>
      </div>
    </main>
  );
}