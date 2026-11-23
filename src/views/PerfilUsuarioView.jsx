import React, { useEffect, useState } from 'react';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256';

export default function PerfilUsuarioView({
  user = {},
  onUpdateAvatar,
  onUpdatePassword,
  onBack,
}) {
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || DEFAULT_AVATAR);
  const [ancho, setAncho] = useState(256);
  const [alto, setAlto] = useState(256);
  const [mantenerProporcion, setMantenerProporcion] = useState(true);
  const [fotoFeedback, setFotoFeedback] = useState('');

  const [editandoPassword, setEditandoPassword] = useState(true);
  const [verResumen, setVerResumen] = useState(false);
  const [verActual, setVerActual] = useState(false);
  const [verNueva, setVerNueva] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);

  const passwordGuardada = user?.password || 'techno123';

  const [passwordActual, setPasswordActual] = useState(passwordGuardada);
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [passFeedback, setPassFeedback] = useState({ type: '', text: '' });

  useEffect(() => {
    setAvatarUrl(user?.avatar || DEFAULT_AVATAR);
    setPasswordActual(user?.password || 'techno123');
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatarUrl(reader.result);
        setFotoFeedback('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnchoChange = (val) => {
    const num = Number(val) || 128;
    setAncho(num);
    if (mantenerProporcion) setAlto(num);
  };

  const handleAltoChange = (val) => {
    const num = Number(val) || 128;
    setAlto(num);
    if (mantenerProporcion) setAncho(num);
  };

  const handleGuardarFoto = () => {
    if (onUpdateAvatar) {
      onUpdateAvatar(avatarUrl);
    }
    setFotoFeedback('Foto de perfil actualizada.');
  };

  const handleCancelarFoto = () => {
    setAvatarUrl(user?.avatar || DEFAULT_AVATAR);
    setAncho(256);
    setAlto(256);
    setFotoFeedback('');
  };

  const handleGuardarPassword = (e) => {
    e.preventDefault();
    setPassFeedback({ type: '', text: '' });

    if (!nuevaPassword.trim() || nuevaPassword.length < 4) {
      setPassFeedback({
        type: 'error',
        text: 'Ingresa una nueva contraseña de al menos 4 caracteres.',
      });
      return;
    }

    if (nuevaPassword !== confirmarPassword) {
      setPassFeedback({
        type: 'error',
        text: 'La nueva contraseña y su confirmación no coinciden.',
      });
      return;
    }

    if (onUpdatePassword) {
      onUpdatePassword(nuevaPassword);
    }

    setPasswordActual(nuevaPassword);
    setNuevaPassword('');
    setConfirmarPassword('');
    setPassFeedback({
      type: 'success',
      text: 'Contraseña actualizada correctamente.',
    });
  };

  const handleCancelarPassword = () => {
    setEditandoPassword(false);
    setPasswordActual(passwordGuardada);
    setNuevaPassword('');
    setConfirmarPassword('');
    setPassFeedback({ type: '', text: '' });
  };

  const puntosOcultos = '•'.repeat(Math.max(8, String(passwordGuardada).length));

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">
          PERFIL DE USUARIO
        </h1>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 transition cursor-pointer"
          >
            ← Volver
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Datos Personales */}
        <section className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold text-gray-900">Datos Personales</h2>
            <span className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Solo foto y dimensiones ajustables
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 flex flex-col items-center space-y-4">
              <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                <img
                  src={avatarUrl}
                  alt={user?.nombre || 'Usuario'}
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-gray-50 text-blue-600 border border-gray-300 cursor-pointer transition">
                Elegir Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Dimensiones</span>
                  <span className="font-bold text-blue-600">
                    {ancho}×{alto}px
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                    <span>Ancho</span>
                    <span>{ancho}px</span>
                  </div>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    value={ancho}
                    onChange={(e) => handleAnchoChange(e.target.value)}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] text-gray-500 mb-1">
                    <span>Alto</span>
                    <span>{alto}px</span>
                  </div>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    value={alto}
                    onChange={(e) => handleAltoChange(e.target.value)}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <label className="flex items-center gap-2 text-[11px] text-gray-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={mantenerProporcion}
                    onChange={(e) => setMantenerProporcion(e.target.checked)}
                    className="rounded accent-blue-600 cursor-pointer"
                  />
                  <span>Mantener proporción</span>
                </label>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  NOMBRE COMPLETO
                </span>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {user?.nombre || 'Usuario'}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  CORREO ELECTRÓNICO
                </span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {user?.email || '—'}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  ROL DEL SISTEMA
                </span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {user?.rol || 'Usuario'}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  TELÉFONO DE CONTACTO
                </span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {user?.telefono || '—'}
                </p>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">
                  DIRECCIÓN
                </span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5">
                  {user?.direccion || '—'}
                </p>
              </div>
            </div>
          </div>

          {fotoFeedback && (
            <p className="text-xs font-medium text-emerald-700">{fotoFeedback}</p>
          )}

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCancelarFoto}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGuardarFoto}
              className="px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition cursor-pointer"
            >
              Guardar Foto
            </button>
          </div>
        </section>

        {/* Seguridad de la Cuenta */}
        <section className="lg:col-span-4 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5 text-xs">
          <h2 className="text-base font-bold text-gray-900">Seguridad de la Cuenta</h2>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase">
                CONTRASEÑA ACTUAL
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVerResumen((prev) => !prev)}
                  className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {verResumen ? 'Ocultar' : 'Ver'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditandoPassword((prev) => !prev);
                    setPassFeedback({ type: '', text: '' });
                  }}
                  title="Editar contraseña"
                  className="text-gray-500 hover:text-blue-600 cursor-pointer"
                >
                  ✎
                </button>
              </div>
            </div>

            <p className="text-sm font-bold text-gray-900 tracking-wider pt-0.5">
              {verResumen ? passwordGuardada : puntosOcultos}
            </p>
          </div>

          {editandoPassword && (
            <form
              onSubmit={handleGuardarPassword}
              className="border border-gray-200 rounded-xl p-4 space-y-3 bg-gray-50/50"
            >
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  CONTRASEÑA ACTUAL
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type={verActual ? 'text' : 'password'}
                    value={passwordActual}
                    onChange={(e) => setPasswordActual(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg bg-white px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setVerActual((prev) => !prev)}
                    className="px-2.5 py-2 rounded-lg border border-gray-300 bg-white text-[11px] font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer shrink-0"
                  >
                    {verActual ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  NUEVA CONTRASEÑA
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type={verNueva ? 'text' : 'password'}
                    value={nuevaPassword}
                    onChange={(e) => setNuevaPassword(e.target.value)}
                    placeholder="Escribe la nueva contraseña"
                    className="w-full border border-blue-400 rounded-lg bg-white px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setVerNueva((prev) => !prev)}
                    className="px-2.5 py-2 rounded-lg border border-gray-300 bg-white text-[11px] font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer shrink-0"
                  >
                    {verNueva ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">
                  CONFIRMAR NUEVA CONTRASEÑA
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type={verConfirmar ? 'text' : 'password'}
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    placeholder="Repite la nueva contraseña"
                    className="w-full border border-gray-300 rounded-lg bg-white px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setVerConfirmar((prev) => !prev)}
                    className="px-2.5 py-2 rounded-lg border border-gray-300 bg-white text-[11px] font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer shrink-0"
                  >
                    {verConfirmar ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              {passFeedback.text && (
                <p
                  className={`text-[11px] font-medium ${
                    passFeedback.type === 'error' ? 'text-rose-600' : 'text-emerald-700'
                  }`}
                >
                  {passFeedback.text}
                </p>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancelarPassword}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-200/70 transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition cursor-pointer"
                >
                  Guardar contraseña
                </button>
              </div>
            </form>
          )}

          {!editandoPassword && passFeedback.text && (
            <p
              className={`text-[11px] font-medium ${
                passFeedback.type === 'error' ? 'text-rose-600' : 'text-emerald-700'
              }`}
            >
              {passFeedback.text}
            </p>
          )}

          <div className="pt-3 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">
              AUTENTICACIÓN DE DOS PASOS
            </span>
            <p className="text-xs font-semibold text-gray-800 mt-1">Activada (SMS)</p>
          </div>
        </section>
      </div>
    </main>
  );
}