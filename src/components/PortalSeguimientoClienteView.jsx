import React, { useEffect, useState, useCallback } from 'react';
import Navbar from './Navbar';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';

function obtenerIdDesdeUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    return (params.get('orden') || params.get('id') || params.get('order') || '').trim();
  } catch {
    return '';
  }
}

function buscarEnLocal(idBuscado, ordenesProp = []) {
  const normalizado = String(idBuscado || '').trim().toLowerCase();
  if (!normalizado) return null;

  const coincide = (o) =>
    o &&
    [o.idOrden, o.id, o._id]
      .filter(Boolean)
      .some((val) => String(val).trim().toLowerCase() === normalizado);

  if (Array.isArray(ordenesProp)) {
    const encontradaProp = ordenesProp.find(coincide);
    if (encontradaProp) return encontradaProp;
  }

  for (let i = 0; i < localStorage.length; i += 1) {
    const clave = localStorage.key(i);
    try {
      const parsed = JSON.parse(localStorage.getItem(clave));
      if (Array.isArray(parsed)) {
        const hit = parsed.find(coincide);
        if (hit) return hit;
      } else if (parsed && typeof parsed === 'object' && coincide(parsed)) {
        return parsed;
      }
    } catch {
      // Ignorar entradas que no sean JSON
    }
  }

  return null;
}

function formatearFecha(fecha) {
  if (!fecha) return 'No registrada';
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return String(fecha);
  return d.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function PortalSeguimientoClienteView({
  ordenes = [],
  user = null,
  onVolverLogin,
  onNavigate,
  onLogout,
  onOpenProfile,
}) {
  const [idOrdenUrl] = useState(() => obtenerIdDesdeUrl());
  const [orden, setOrden] = useState(() => buscarEnLocal(obtenerIdDesdeUrl(), ordenes));
  const [cargando, setCargando] = useState(() => !buscarEnLocal(obtenerIdDesdeUrl(), ordenes));
  const [actualizando, setActualizando] = useState(false);
  const [noEncontrada, setNoEncontrada] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const refrescarOrden = useCallback(async () => {
    if (!idOrdenUrl) return;
    setActualizando(true);
    try {
      const resp = await fetch(`${API_URL}/ordenes/${encodeURIComponent(idOrdenUrl)}`);
      if (resp.ok) {
        const data = await resp.json();
        const doc = data?.orden || data;
        if (doc && (doc._id || doc.idOrden || doc.id)) {
          setOrden(doc);
          setNoEncontrada(false);
        }
      }
    } catch {
      // Mantiene los datos actuales si falla la red
    } finally {
      setActualizando(false);
    }
  }, [idOrdenUrl]);

  useEffect(() => {
    let activo = true;

    async function inicializarOrden() {
      if (!idOrdenUrl) {
        if (activo) {
          setNoEncontrada(true);
          setCargando(false);
        }
        return;
      }

      const local = buscarEnLocal(idOrdenUrl, ordenes);

      try {
        const resp = await fetch(`${API_URL}/ordenes/${encodeURIComponent(idOrdenUrl)}`);
        if (!activo) return;

        if (resp.ok) {
          const data = await resp.json();
          const doc = data?.orden || data;
          if (doc && (doc._id || doc.idOrden || doc.id)) {
            setOrden(doc);
            setNoEncontrada(false);
            setCargando(false);
            return;
          }
        }

        if (local) {
          setOrden(local);
          setNoEncontrada(false);
        } else {
          setNoEncontrada(true);
        }
      } catch {
        if (!activo) return;
        if (local) {
          setOrden(local);
          setNoEncontrada(false);
        } else {
          setNoEncontrada(true);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    inicializarOrden();
    return () => {
      activo = false;
    };
  }, [idOrdenUrl, ordenes]);

  const irAlInicio = () => {
    window.history.replaceState({}, '', window.location.pathname);
    if (typeof onVolverLogin === 'function') {
      onVolverLogin();
    } else {
      window.location.reload();
    }
  };

  const copiarEnlace = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  const usuarioNavbar = user || {
    nombre: orden?.cliente || orden?.nombreCliente || 'Cliente',
    email: orden?.correoCliente || '',
    rol: 'Cliente',
  };

  const renderNavbar = () => (
    <Navbar
      activeTab="ordenes"
      setActiveTab={(tab) => {
        window.history.replaceState({}, '', window.location.pathname);
        if (typeof onNavigate === 'function') {
          onNavigate(tab);
        } else {
          window.location.reload();
        }
      }}
      user={usuarioNavbar}
      onNavigate={(tab) => {
        window.history.replaceState({}, '', window.location.pathname);
        if (typeof onNavigate === 'function') {
          onNavigate(tab);
        } else {
          window.location.reload();
        }
      }}
      onLogout={onLogout || irAlInicio}
      onOpenProfile={onOpenProfile}
    />
  );

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        <div>
          {renderNavbar()}
          <div className="flex items-center justify-center p-8 mt-10">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
              <p className="text-slate-700 font-semibold">Consultando orden #{idOrdenUrl}...</p>
            </div>
          </div>
        </div>
        <footer className="text-center text-xs text-slate-500 py-5">
          © 2026 TechService Web - Sistema de Gestión de Talleres
        </footer>
      </div>
    );
  }

  if (noEncontrada || !orden) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
        <div>
          {renderNavbar()}
          <div className="flex items-center justify-center p-6 mt-10">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 max-w-lg w-full text-center shadow-sm">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-wide uppercase mb-2">
                ENLACE DE SEGUIMIENTO NO ENCONTRADO
              </h1>
              <p className="text-sm text-slate-600 mb-6">
                No encontramos una orden asociada a este enlace. Verifica con el taller que el código de la orden sea correcto.
              </p>
              <button
                type="button"
                onClick={irAlInicio}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition cursor-pointer"
              >
                Ir al inicio de sesión
              </button>
            </div>
          </div>
        </div>
        <footer className="text-center text-xs text-slate-500 py-5">
          © 2026 TechService Web - Sistema de Gestión de Talleres
        </footer>
      </div>
    );
  }

  const equipoTexto =
    [orden.tipoEquipo, orden.marca, orden.modelo].filter(Boolean).join(' ') ||
    orden.equipo ||
    'Dispositivo registrado';

  const imagenes = [
    ...(Array.isArray(orden.adjuntos) ? orden.adjuntos : []),
    orden.imagenDiagnostico,
    orden.adjuntoDiagnostico,
  ]
    .map((item) =>
      typeof item === 'string' ? item : item?.dataUrl || item?.url || item?.preview || null
    )
    .filter(Boolean);

  const historial =
    Array.isArray(orden.seguimiento) && orden.seguimiento.length > 0
      ? orden.seguimiento
      : Array.isArray(orden.avances)
      ? orden.avances
      : [];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      <div>
        {renderNavbar()}

        <main className="max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-700 mb-2">
                Seguimiento en vivo · Sin contraseña
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900">
                Orden #{orden.idOrden || idOrdenUrl}
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Cliente: <strong className="text-slate-800">{orden.cliente || 'Cliente'}</strong> · Equipo:{' '}
                <strong className="text-slate-800">{equipoTexto}</strong> · Ingreso:{' '}
                <strong className="text-slate-800">
                  {formatearFecha(orden.fechaCreacion || orden.createdAt)}
                </strong>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={refrescarOrden}
                disabled={actualizando}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition cursor-pointer"
              >
                {actualizando ? 'Actualizando...' : 'Actualizar ahora'}
              </button>
              <button
                type="button"
                onClick={copiarEnlace}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer"
              >
                {copiado ? '✓ Enlace copiado' : 'Copiar enlace del cliente'}
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-500 block text-xs">Estado actual</span>
              <span className="font-bold text-blue-700">{orden.estado || 'En Proceso'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Técnico asignado</span>
              <span className="font-semibold text-slate-900">{orden.tecnicoAsignado || '[Sin Asignar]'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-xs">Mesa de trabajo</span>
              <span className="font-semibold text-slate-900">{orden.mesaTrabajo || 'Por asignar'}</span>
            </div>

            <div className="sm:col-span-3 pt-2 border-t border-slate-100">
              <span className="text-slate-500 block text-xs">Falla reportada</span>
              <p className="font-medium text-slate-800 mt-0.5">{orden.descripcionFalla || 'Sin descripción'}</p>
            </div>

            {(orden.diagnostico || orden.detalleDiagnostico) && (
              <div className="sm:col-span-3 pt-3 border-t border-slate-100">
                <span className="text-slate-500 block text-xs">Diagnóstico técnico</span>
                {orden.diagnostico && (
                  <p className="font-semibold text-slate-900 mt-0.5">{orden.diagnostico}</p>
                )}
                {orden.detalleDiagnostico && (
                  <p className="text-slate-700 mt-1 whitespace-pre-line">{orden.detalleDiagnostico}</p>
                )}
              </div>
            )}

            {orden.proximosPasos && (
              <div className="sm:col-span-3 pt-3 border-t border-slate-100">
                <span className="text-slate-500 block text-xs">Próximos pasos</span>
                <p className="text-slate-800 mt-0.5">{orden.proximosPasos}</p>
              </div>
            )}
          </div>

          {imagenes.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 mb-3">Evidencia y diagnóstico</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {imagenes.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Evidencia orden ${orden.idOrden || idOrdenUrl} #${idx + 1}`}
                    className="w-full h-52 object-cover rounded-xl border border-slate-200"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-3">Historial de avances</h2>
            {historial.length === 0 ? (
              <p className="text-sm text-slate-500">Aún no se han registrado avances adicionales en esta orden.</p>
            ) : (
              <div className="space-y-3">
                {historial.map((item, idx) => (
                  <div key={item._id || item.id || idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-slate-900">
                        {item.titulo || item.accion || 'Actualización de orden'}
                      </span>
                      {item.estadoOrden && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800">
                          {item.estadoOrden}
                        </span>
                      )}
                    </div>
                    {(item.descripcion || item.notaTecnica) && (
                      <p className="text-sm text-slate-700 mt-1">
                        {item.descripcion || item.notaTecnica}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="text-center text-xs text-slate-500 py-5">
        © 2026 TechService Web - Sistema de Gestión de Talleres
      </footer>
    </div>
  );
}