import React, { useState } from 'react';

export default function SolicitarActivacionModal({ isOpen, onClose, onSubmitRequest }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [taller, setTaller] = useState('');
  const [cargo, setCargo] = useState('Técnico');
  const [error, setError] = useState('');
  const [enviada, setEnviada] = useState(false);

  if (!isOpen) return null;

  const resetAndClose = () => {
    setNombre('');
    setCorreo('');
    setTaller('');
    setCargo('Técnico');
    setError('');
    setEnviada(false);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !taller.trim() || !cargo.trim()) {
      setError('Por favor, completa nombre, correo, taller y cargo.');
      return;
    }

    if (typeof onSubmitRequest === 'function') {
      onSubmitRequest({
        nombre: nombre.trim(),
        correo: correo.trim().toLowerCase(),
        taller: taller.trim(),
        cargo,
      });
    }

    setError('');
    setEnviada(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full mb-1">
              Solicitar activación / Contacto
            </span>
            <h3 className="text-base font-bold text-gray-900">
              Solicitud de Credencial de Acceso
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="text-gray-400 hover:text-gray-700 text-sm font-bold px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!enviada ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Si representas a un taller nuevo o eres técnico y necesitas acceso, envía tus datos
              para que el administrador cree tu cuenta.
            </p>

            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-lg text-xs font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Correo
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="correo@taller.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Taller
              </label>
              <input
                type="text"
                value={taller}
                onChange={(e) => setTaller(e.target.value)}
                placeholder="Nombre del taller o sede"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                Cargo
              </label>
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-xs text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Técnico">Técnico</option>
                <option value="Administrador">Administrador</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 py-2">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 text-xs font-medium leading-relaxed">
              Solicitud enviada. El administrador del taller habilitará tus credenciales.
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}