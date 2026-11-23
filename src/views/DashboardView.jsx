import React, { useMemo } from 'react';
import { mockUser } from '../data/userData';

function resolveActiveUser(userProp) {
  if (userProp && (userProp.nombre || userProp.email)) {
    return userProp;
  }
  try {
    const saved = localStorage.getItem('userData');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && (parsed.nombre || parsed.email)) {
        return parsed;
      }
    }
  } catch {
    // Si no está disponible localStorage, usar mockUser
  }
  return mockUser;
}

function normalizarTexto(valor = '') {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function esOrdenFinalizada(orden) {
  if (!orden) return false;
  if (orden.cerrada === true) return true;
  const texto = normalizarTexto(`${orden?.estado || ''} ${orden?.estadoFinal || ''}`);
  return (
    texto.includes('finaliz') ||
    texto.includes('entregad') ||
    texto.includes('cerrad') ||
    texto.includes('complet') ||
    texto.includes('termin') ||
    texto.includes('factur') ||
    texto.includes('resuelt') ||
    texto.includes('reparado')
  );
}

function perteneceACliente(orden, usuario) {
  const miCorreo = normalizarTexto(usuario?.email);
  const miNombre = normalizarTexto(usuario?.nombre);
  const correoOrden = normalizarTexto(
    orden?.correoCliente || orden?.emailCliente || orden?.correo
  );
  const clienteOrden = normalizarTexto(orden?.cliente || orden?.nombreCliente);

  return (
    (Boolean(miCorreo) && correoOrden === miCorreo) ||
    (Boolean(miNombre) && clienteOrden === miNombre)
  );
}

function perteneceATecnico(orden, usuario) {
  const miNombre = normalizarTexto(usuario?.nombre);
  const asignado = normalizarTexto(orden?.tecnicoAsignado);
  return Boolean(miNombre) && asignado === miNombre;
}

export default function DashboardView({ user, ordenes = [], onNavigate }) {
  const activeUser = resolveActiveUser(user);
  const nombreUsuario = activeUser?.nombre || 'Usuario';
  const rolNorm = normalizarTexto(activeUser?.rol);
  const esCliente = rolNorm.includes('client');
  const esTecnico = rolNorm.includes('tecn');
  const rolLabel = (activeUser?.rol || 'Técnico').toUpperCase();

  const metricas = useMemo(() => {
    const lista = Array.isArray(ordenes) ? ordenes : [];

    if (esCliente) {
      const mias = lista.filter((o) => perteneceACliente(o, activeUser));
      const enProceso = mias.filter((o) => !esOrdenFinalizada(o)).length;
      const finalizadas = mias.filter((o) => esOrdenFinalizada(o)).length;

      return {
        card1Label: 'Mis Equipos Registrados',
        card1Value: mias.length,
        card2Label: 'En Revisión / Proceso',
        card2Value: enProceso,
        card3Label: 'Listos / Finalizados',
        card3Value: finalizadas,
        subtitulo: 'Seguimiento de tus dispositivos en el taller',
      };
    }

    if (esTecnico) {
      const mias = lista.filter((o) => perteneceATecnico(o, activeUser));
      const enDiagnostico = mias.filter((o) => {
        const est = normalizarTexto(o?.estado);
        return !esOrdenFinalizada(o) && (est.includes('diagn') || est.includes('proceso'));
      }).length;
      const pendientes = mias.filter((o) => {
        const est = normalizarTexto(o?.estado);
        return !esOrdenFinalizada(o) && est.includes('pendiente');
      }).length;

      return {
        card1Label: 'Mis Órdenes Asignadas',
        card1Value: mias.length,
        card2Label: 'Equipos en Diagnóstico',
        card2Value: enDiagnostico,
        card3Label: 'Tareas Pendientes',
        card3Value: pendientes,
        subtitulo: 'Resumen de actividades asignadas a tu cargo',
      };
    }

    const enDiagnosticoGlobal = lista.filter((o) => {
      const est = normalizarTexto(o?.estado);
      return !esOrdenFinalizada(o) && (est.includes('diagn') || est.includes('proceso'));
    }).length;
    const pendientesGlobal = lista.filter((o) => {
      const est = normalizarTexto(o?.estado);
      return !esOrdenFinalizada(o) && est.includes('pendiente');
    }).length;

    return {
      card1Label: 'Total Órdenes Registradas',
      card1Value: lista.length,
      card2Label: 'Equipos en Diagnóstico / Proceso',
      card2Value: enDiagnosticoGlobal,
      card3Label: 'Tareas Pendientes',
      card3Value: pendientesGlobal,
      subtitulo: 'Resumen de actividades del día',
    };
  }, [ordenes, activeUser, esCliente, esTecnico]);

  const actividadReciente = useMemo(() => {
    const lista = Array.isArray(ordenes) ? ordenes : [];
    const filtradas = esCliente
      ? lista.filter((o) => perteneceACliente(o, activeUser))
      : esTecnico
      ? lista.filter((o) => perteneceATecnico(o, activeUser))
      : lista;

    return filtradas.slice(0, 3).map((o, idx) => ({
      id: o._id || o.idOrden || idx,
      hora: o.fechaCreacion
        ? new Date(o.fechaCreacion).toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '—',
      texto: `Orden #${o.idOrden || o._id || '—'} (${
        [o.tipoEquipo, o.marca].filter(Boolean).join(' ') || 'Equipo'
      }) — Estado: ${String(o.estado || 'Registrada').replace(/^\[|\]$/g, '').trim()}`,
    }));
  }, [ordenes, activeUser, esCliente, esTecnico]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            PANEL PRINCIPAL {rolLabel}
          </h1>
          <p className="text-gray-600 mt-1">
            Bienvenido, {nombreUsuario}.{' '}
            <span className="text-gray-500">{metricas.subtitulo}</span>
          </p>
        </div>

        {typeof onNavigate === 'function' && (
          <button
            type="button"
            onClick={() => onNavigate('ordenes', 'main')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition cursor-pointer"
          >
            {esCliente ? 'Ver Seguimiento de Mis Equipos' : 'Ir a Órdenes'}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-600 font-medium text-sm">{metricas.card1Label}</h3>
          <p className="text-5xl font-light text-gray-900 mt-4">{metricas.card1Value}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-600 font-medium text-sm">{metricas.card2Label}</h3>
          <p className="text-5xl font-light text-gray-900 mt-4">{metricas.card2Value}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
          <h3 className="text-gray-600 font-medium text-sm">{metricas.card3Label}</h3>
          <p className="text-5xl font-light text-gray-900 mt-4">{metricas.card3Value}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
          Actividad Reciente
        </h2>
        {actividadReciente.length === 0 ? (
          <p className="text-sm text-gray-500">
            {esCliente
              ? 'Aún no tienes movimientos registrados en tus equipos.'
              : 'No hay actividad reciente registrada en este momento.'}
          </p>
        ) : (
          <div className="space-y-4 text-sm text-gray-700">
            {actividadReciente.map((item, idx) => (
              <div
                key={item.id}
                className={`flex items-center ${
                  idx < actividadReciente.length - 1 ? 'pb-3 border-b border-gray-100' : ''
                }`}
              >
                <span className="font-medium text-gray-900 w-16">{item.hora}</span>
                <span className="text-gray-600">- {item.texto}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}