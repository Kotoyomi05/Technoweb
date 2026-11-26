import React, { useState } from 'react';
import { mockUser, usersList } from '../data/userData';

const DEFAULT_USER_PASSWORD = 'techno123';
const MESAS_TRABAJO_FIJAS = Array.from({ length: 10 }, (_, idx) => `Mesa de Trabajo #${idx + 1}`);

function normalizarTexto(valor = '') {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function esOrdenFinalizadoEstricto(orden) {
  if (!orden) return false;

  const estado = normalizarTexto(orden?.estado);
  const estadoFinal = normalizarTexto(orden?.estadoFinal);
  const combinado = `${estado} ${estadoFinal}`.trim();

  if (combinado.includes('cancel')) return false;

  const tieneFinalizado =
    combinado.includes('finaliz') ||
    combinado.includes('entregad') ||
    combinado.includes('cerrad');

  const tieneSeguimientoCierre = Array.isArray(orden?.seguimiento)
    ? orden.seguimiento.some((paso) => {
        const titulo = normalizarTexto(paso?.titulo || paso?.accion);
        return titulo.includes('orden cerrada') || titulo.includes('finaliz');
      })
    : false;

  return (
    Boolean(orden?.cerrada) ||
    tieneFinalizado ||
    (tieneSeguimientoCierre && combinado.includes('finaliz'))
  );
}

function dispositivoYaEntregado(orden) {
  if (!orden) return false;
  if (orden.entregado === true || orden.cerrada === true) return true;

  const estado = normalizarTexto(orden?.estado);
  const estadoFinal = normalizarTexto(orden?.estadoFinal);
  const combinado = `${estado} ${estadoFinal}`.trim();

  if (!combinado) return false;

  return (
    combinado.includes('entregad') ||
    combinado.includes('finaliz') ||
    combinado.includes('cerrad') ||
    combinado.includes('cancel')
  );
}

function describirEquipoOrden(orden) {
  const partes = [orden?.tipoEquipo, orden?.marca, orden?.modelo].filter(Boolean);
  return partes.length > 0 ? partes.join(' ') : 'Equipo sin especificar';
}

function formatearDia(fecha) {
  if (!fecha) return 'No registrado';
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return String(fecha);
  return d.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatearHora(fecha) {
  if (!fecha) return 'No registrada';
  const d = new Date(fecha);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function resolverMesaInicial(usuario) {
  const directa = String(usuario?.mesaTrabajo || usuario?.bancoTrabajo || '').trim();
  if (directa && MESAS_TRABAJO_FIJAS.includes(directa)) {
    return directa;
  }

  const coincidenciaDirecta = MESAS_TRABAJO_FIJAS.find(
    (m) => normalizarTexto(m) === normalizarTexto(directa)
  );
  if (coincidenciaDirecta) return coincidenciaDirecta;

  const dirTexto = String(usuario?.direccion || '');
  const matchNumero = dirTexto.match(/(?:banco|mesa)\s*(?:de\s*trabajo\s*)?#?\s*([1-9]|10)\b/i);
  if (matchNumero) {
    return `Mesa de Trabajo #${Number(matchNumero[1])}`;
  }

  return '';
}

function obtenerFechaSalidaOrden(orden) {
  if (orden?.fechaSalida) return orden.fechaSalida;
  if (orden?.fechaCierre) return orden.fechaCierre;
  if (orden?.fechaEntrega) return orden.fechaEntrega;

  if (Array.isArray(orden?.seguimiento)) {
    const pasoCierre = [...orden.seguimiento]
      .reverse()
      .find((paso) => {
        const t = normalizarTexto(paso?.titulo || paso?.accion);
        return t.includes('cerrad') || t.includes('finaliz') || t.includes('entregad');
      });
    if (pasoCierre?.fecha) return pasoCierre.fecha;
  }

  return orden?.updatedAt || null;
}

function obtenerMesaMomento(orden, mesaFallback) {
  const enOrden = String(
    orden?.mesaTrabajo || orden?.mesaAsignada || orden?.bancoTrabajo || ''
  ).trim();
  if (enOrden) return enOrden;

  if (Array.isArray(orden?.seguimiento)) {
    for (const paso of orden.seguimiento) {
      const textoPaso = String(paso?.titulo || paso?.accion || paso?.notaTecnica || '');
      const matchMesa = textoPaso.match(/mesa\s*(?:de\s*trabajo\s*)?#?\s*([1-9]|10)\b/i);
      if (matchMesa) {
        return `Mesa de Trabajo #${Number(matchMesa[1])}`;
      }
    }
  }

  return mesaFallback || 'No registrada';
}

export default function GestionUsuariosView({
  currentUser = mockUser,
  users = usersList,
  ordenes = [],
  accessRequests = [],
  onAssignMesaTrabajo,
  onApproveRequest,
  onRejectRequest,
  onDeleteUser,
  onBack,
}) {
  const roleLower = (currentUser?.rol || '').toLowerCase();
  const isAdmin = roleLower.includes('admin');
  const isTech = roleLower.includes('tecn') || roleLower.includes('técn');
  const canApproveRequests = isAdmin || isTech;

  const allowedRoles = isAdmin ? ['Administrador', 'Técnico'] : ['Técnico'];

  const [selectedRoles, setSelectedRoles] = useState({});
  const [filterStatus, setFilterStatus] = useState('Todas');
  const [approvalNotice, setApprovalNotice] = useState(null);
  const [deliveredClients, setDeliveredClients] = useState({});
  const [localMesas, setLocalMesas] = useState({});
  const [historialTecnicoSeleccionado, setHistorialTecnicoSeleccionado] = useState(null);

  const listaOrdenes = Array.isArray(ordenes) ? ordenes : [];

  const getOrdenesDeTecnico = (tecnicoUser) => {
    const nombreNorm = normalizarTexto(tecnicoUser?.nombre);
    if (!nombreNorm) return [];
    return listaOrdenes.filter((o) => normalizarTexto(o?.tecnicoAsignado) === nombreNorm);
  };

  const getOrdenesDeCliente = (clienteUser) => {
    const correoNorm = normalizarTexto(clienteUser?.email);
    const nombreNorm = normalizarTexto(clienteUser?.nombre);
    const esNombreGenerico = !nombreNorm || nombreNorm === 'cliente demo';

    return listaOrdenes.filter((o) => {
      const correoOrden = normalizarTexto(
        o?.correoCliente || o?.emailCliente || o?.correo
      );
      const nombreOrden = normalizarTexto(o?.cliente || o?.nombreCliente);

      if (correoNorm && correoOrden) {
        return correoOrden === correoNorm;
      }
      return !esNombreGenerico && Boolean(nombreNorm) && nombreOrden === nombreNorm;
    });
  };

  const adminsList = users.filter((u) => (u.rol || '').toLowerCase().includes('admin'));
  const techniciansList = users.filter((u) => {
    const r = (u.rol || '').toLowerCase();
    return r.includes('tecn') || r.includes('técn');
  });
  const clientsList = users.filter((u) => {
    const esCliente = (u.rol || '').toLowerCase().includes('client');
    if (!esCliente) return false;
    if (deliveredClients[u.id]) return false;

    const ordenesDelCliente = getOrdenesDeCliente(u);
    if (ordenesDelCliente.length === 0) return false;

    return ordenesDelCliente.some((ord) => !dispositivoYaEntregado(ord));
  });

  const isSameUser = (u) =>
    String(u.id) === String(currentUser?.id) ||
    (u.email || '').toLowerCase() === (currentUser?.email || '').toLowerCase();

  const canRemoveUser = (targetUser) => {
    const targetRole = (targetUser.rol || '').toLowerCase();
    const targetIsAdmin = targetRole.includes('admin');
    const targetIsTech = targetRole.includes('tecn') || targetRole.includes('técn');
    const targetIsClient = targetRole.includes('client');
    const self = isSameUser(targetUser);

    if (targetIsAdmin) {
      return false;
    }

    if (isAdmin) {
      return targetIsTech || targetIsClient;
    }

    if (isTech) {
      return (targetIsTech && self) || targetIsClient;
    }

    return self && targetIsClient;
  };

  const getAssignedRole = (req) => {
    const chosen = selectedRoles[req.id];
    if (chosen && allowedRoles.includes(chosen)) {
      return chosen;
    }
    if (req.cargo && allowedRoles.includes(req.cargo)) {
      return req.cargo;
    }
    return allowedRoles.includes('Técnico') ? 'Técnico' : allowedRoles[0];
  };

  const handleRoleSelect = (reqId, roleValue) => {
    if (!allowedRoles.includes(roleValue)) return;
    setSelectedRoles((prev) => ({ ...prev, [reqId]: roleValue }));
  };

  const handleApproveAction = (req, assignedRole) => {
    if (onApproveRequest) {
      onApproveRequest(req.id, assignedRole);
    }
    setApprovalNotice({
      nombre: req.nombre,
      correo: req.correo,
      rol: assignedRole,
      password: DEFAULT_USER_PASSWORD,
    });
  };

  const toggleDelivered = (clientId) => {
    setDeliveredClients((prev) => ({
      ...prev,
      [clientId]: !prev[clientId],
    }));
  };

  const getMesaAsignadaTecnico = (tecUser) => {
    const key = String(tecUser.id || tecUser._id || tecUser.email);
    if (Object.prototype.hasOwnProperty.call(localMesas, key)) {
      return localMesas[key];
    }
    return resolverMesaInicial(tecUser);
  };

  const handleMesaChange = (tecUser, nuevaMesa) => {
    if (!isAdmin) return;
    const mesaValida = MESAS_TRABAJO_FIJAS.includes(nuevaMesa) ? nuevaMesa : '';
    const key = String(tecUser.id || tecUser._id || tecUser.email);

    setLocalMesas((prev) => ({
      ...prev,
      [key]: mesaValida,
    }));

    if (onAssignMesaTrabajo) {
      onAssignMesaTrabajo(tecUser.id || tecUser._id, mesaValida);
    }
  };

  const filteredRequests = accessRequests.filter((req) => {
    if (filterStatus === 'Todas') return true;
    return req.estado === filterStatus;
  });

  const renderUserCard = (u, category) => {
    const self = isSameUser(u);
    const removable = canRemoveUser(u);
    const isDelivered = Boolean(deliveredClients[u.id]);
    const isClientCard = category === 'client';
    const isTechCard = category === 'tech';

    const needsDeliveryLock = isClientCard && !self && (isAdmin || isTech);
    const canDeleteNow = removable && (!needsDeliveryLock || isDelivered);

    let actionLabel = 'Eliminar';
    if (self && !category.startsWith('admin')) {
      actionLabel = 'Darme de baja';
    } else if (isClientCard && needsDeliveryLock) {
      actionLabel = 'Retirar cliente';
    }

    const telefonoDisplay = u.telefono || u.celular || 'No registrado';
    const tallerDisplay = u.taller || u.sede || u.direccion || 'No especificado';
    const ubicacionClienteDisplay = u.direccion || u.ubicacion || 'No registrada';
    const mesaAsignada = isTechCard ? getMesaAsignadaTecnico(u) : '';

    const todasOrdenesTecnico = isTechCard ? getOrdenesDeTecnico(u) : [];
    const ordenesFinalizadasTecnico = todasOrdenesTecnico.filter((o) =>
      esOrdenFinalizadoEstricto(o)
    );
    const ordenesActivasTecnico = todasOrdenesTecnico.filter(
      (o) => !esOrdenFinalizadoEstricto(o)
    );

    const ordenesCliente = isClientCard
      ? getOrdenesDeCliente(u).filter((ord) => !dispositivoYaEntregado(ord))
      : [];

    return (
      <div
        key={u.id || u.email}
        className="min-w-[295px] max-w-[325px] shrink-0 bg-gray-50/70 border border-gray-200 rounded-xl p-4 flex flex-col justify-between gap-3"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <img
              src={u.avatar}
              alt={u.nombre}
              className="w-11 h-11 rounded-full object-cover border border-gray-200 bg-white shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="font-bold text-xs text-gray-900 truncate">{u.nombre}</p>
                {self && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Tú
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-600 truncate">{u.email}</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white text-gray-700 border border-gray-200">
                {u.rol}
              </span>
            </div>
          </div>

          <div className="text-[11px] text-gray-600 border-t border-gray-200/70 pt-2 space-y-1.5">
            <div>
              <span className="font-semibold text-gray-700">Teléfono:</span> {telefonoDisplay}
            </div>

            {isTechCard && (
              <>
                <div>
                  <span className="font-semibold text-gray-700">Taller / Sede:</span>{' '}
                  {tallerDisplay}
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">
                    Mesa de trabajo (máx. 10):
                  </label>
                  {isAdmin ? (
                    <select
                      value={mesaAsignada}
                      onChange={(e) => handleMesaChange(u, e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="">Sin mesa asignada</option>
                      {MESAS_TRABAJO_FIJAS.map((mesa) => (
                        <option key={mesa} value={mesa}>
                          {mesa}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="inline-block bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-[11px] font-medium text-gray-800">
                      {mesaAsignada || 'No asignada'}
                    </span>
                  )}
                </div>

                <div className="pt-1">
                  <span className="font-semibold text-gray-700 block mb-1">
                    Equipos a cargo ({ordenesActivasTecnico.length}):
                  </span>
                  {ordenesActivasTecnico.length === 0 ? (
                    <span className="text-gray-400 italic block">Sin equipos activos a cargo</span>
                  ) : (
                    <ul className="space-y-1 bg-white border border-gray-200/80 rounded-lg p-2 max-h-24 overflow-y-auto">
                      {ordenesActivasTecnico.map((ord) => (
                        <li
                          key={ord._id || ord.idOrden}
                          className="text-[10px] text-gray-700 leading-snug"
                        >
                          <span className="font-bold text-gray-900">
                            #{ord.idOrden || ord._id}
                          </span>{' '}
                          — {describirEquipoOrden(ord)}{' '}
                          <span className="text-blue-700 font-medium">
                            ({String(ord.estado || 'En Proceso').replace(/^\[|\]$/g, '').trim()})
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}

            {isClientCard && (
              <>
                <div>
                  <span className="font-semibold text-gray-700">Ubicación:</span>{' '}
                  {ubicacionClienteDisplay}
                </div>
                <div className="pt-1">
                  <span className="font-semibold text-gray-700 block mb-1">
                    Equipos en taller ({ordenesCliente.length}):
                  </span>
                  {ordenesCliente.length === 0 ? (
                    <span className="text-gray-400 italic block">Sin equipos pendientes en taller</span>
                  ) : (
                    <ul className="space-y-1.5 bg-white border border-gray-200/80 rounded-lg p-2 max-h-28 overflow-y-auto">
                      {ordenesCliente.map((ord) => (
                        <li
                          key={ord._id || ord.idOrden}
                          className="text-[10px] text-gray-700 leading-snug border-b last:border-b-0 border-gray-100 pb-1 last:pb-0"
                        >
                          <div>
                            <span className="font-bold text-gray-900">
                              #{ord.idOrden || ord._id}
                            </span>{' '}
                            — {describirEquipoOrden(ord)}
                          </div>
                          <div className="text-gray-500">
                            Técnico:{' '}
                            <span className="font-semibold text-gray-800">
                              {ord.tecnicoAsignado || '[Sin Asignar]'}
                            </span>{' '}
                            •{' '}
                            <span>
                              {String(ord.estado || 'Registrada').replace(/^\[|\]$/g, '').trim()}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}

            {!isTechCard && !isClientCard && (
              <div>
                <span className="font-semibold text-gray-700">Ubicación:</span>{' '}
                {u.direccion || 'Sin ubicación asignada'}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2 pt-1">
          {isClientCard && needsDeliveryLock && removable && (
            <button
              type="button"
              onClick={() => toggleDelivered(u.id)}
              className={`w-full py-1.5 px-2.5 rounded-lg text-[11px] font-bold border transition cursor-pointer ${
                isDelivered
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
              }`}
            >
              {isDelivered ? '✓ Computador entregado' : 'Marcar: Computador entregado'}
            </button>
          )}

          {isTechCard ? (
            <div className="flex items-center gap-2">
              {removable ? (
                <button
                  type="button"
                  onClick={() => onDeleteUser && onDeleteUser(u.id)}
                  className="flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-rose-600 hover:bg-rose-700 text-white transition cursor-pointer"
                >
                  {actionLabel}
                </button>
              ) : (
                <span className="flex-1 text-[10px] text-gray-400 font-medium text-center py-1 bg-gray-100 rounded-lg">
                  Sin permiso
                </span>
              )}

              <button
                type="button"
                onClick={() =>
                  setHistorialTecnicoSeleccionado({
                    tecnico: u,
                    mesaActual: mesaAsignada,
                    ordenesHistorial: ordenesFinalizadasTecnico,
                  })
                }
                className="flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-bold bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 transition cursor-pointer"
              >
                Historial De Equipos
              </button>
            </div>
          ) : category === 'admin' ? (
            <span className="block text-[10px] text-gray-400 font-medium text-center py-1">
              {self ? 'Protegido (Tu cuenta Admin)' : 'Protegido (Cuenta Administrador)'}
            </span>
          ) : removable ? (
            <button
              type="button"
              disabled={!canDeleteNow}
              onClick={() => onDeleteUser && onDeleteUser(u.id)}
              title={
                !canDeleteNow
                  ? 'Primero marca "Computador entregado" para habilitar la eliminación'
                  : actionLabel
              }
              className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-bold transition ${
                canDeleteNow
                  ? 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {actionLabel}
            </button>
          ) : (
            <span className="block text-[10px] text-gray-400 font-medium text-center py-1">
              Sin permiso para eliminar
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase block">
            PERSONAL Y CLIENTES DEL TALLER • {currentUser?.rol}
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">
            GESTIÓN DE USUARIOS
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Listados horizontales por rol con asignación de mesas de trabajo (1 a 10) exclusiva para
            Administrador.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 transition cursor-pointer"
          >
            ← Volver al Dashboard
          </button>
        )}
      </div>

      {/* 1. Listado Horizontal: Administradores */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 uppercase">
              Administradores ({adminsList.length})
            </h2>
            <p className="text-xs text-gray-500">
              Ningún administrador puede ser eliminado (ni por sí mismo ni por otro administrador).
            </p>
          </div>
        </div>

        {adminsList.length === 0 ? (
          <p className="text-xs text-gray-500 py-4">No hay administradores registrados.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {adminsList.map((u) => renderUserCard(u, 'admin'))}
          </div>
        )}
      </section>

      {/* 2. Listado Horizontal: Técnicos */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 uppercase">
              Técnicos ({techniciansList.length})
            </h2>
            <p className="text-xs text-gray-500">
              Solo el Administrador puede asignar o modificar la mesa de trabajo (del #1 al #10).
            </p>
          </div>
        </div>

        {techniciansList.length === 0 ? (
          <p className="text-xs text-gray-500 py-4">No hay técnicos registrados.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {techniciansList.map((u) => renderUserCard(u, 'tech'))}
          </div>
        )}
      </section>

      {/* 3. Listado Horizontal: Clientes */}
      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-gray-900 uppercase">
              Clientes ({clientsList.length})
            </h2>
            <p className="text-xs text-gray-500">
              Solo se muestran clientes cuyos dispositivos aún permanecen en el taller. Para
              retirar a un cliente tras finalizar el trabajo, primero marca{' '}
              <strong>Computador entregado</strong>.
            </p>
          </div>
        </div>

        {clientsList.length === 0 ? (
          <p className="text-xs text-gray-500 py-4">
            No hay clientes con dispositivos pendientes en el taller.
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {clientsList.map((u) => renderUserCard(u, 'client'))}
          </div>
        )}
      </section>

      {/* Bandeja de Solicitudes de Acceso (solo Admin y Técnico) */}
      {canApproveRequests && (
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900 uppercase">
                Solicitudes de Activación de Cuenta
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {isAdmin
                  ? 'Como Administrador puedes asignar el rol de Administrador o Técnico.'
                  : 'Consulta el estado de las solicitudes de acceso del taller (la aprobación corresponde al Administrador).'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {['Todas', 'Pendiente', 'Aprobada', 'Rechazada'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    filterStatus === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {approvalNotice && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl p-4 text-xs flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="font-bold">
                  Persona aceptada: {approvalNotice.nombre} ({approvalNotice.correo}) con rol{' '}
                  {approvalNotice.rol}.
                </p>
                <p className="text-emerald-800">
                  La contraseña de esta cuenta es:{' '}
                  <strong className="font-mono bg-white border border-emerald-300 px-2 py-0.5 rounded text-emerald-900">
                    {approvalNotice.password}
                  </strong>{' '}
                  — entrégasela al usuario para que inicie sesión y luego pueda cambiarla en su
                  perfil.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setApprovalNotice(null)}
                className="text-xs font-semibold text-emerald-800 hover:underline cursor-pointer"
              >
                Cerrar mensaje
              </button>
            </div>
          )}

          {filteredRequests.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
              No hay solicitudes en el estado seleccionado.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase">
                    <th className="py-2.5 px-3">Nombre</th>
                    <th className="py-2.5 px-3">Correo</th>
                    <th className="py-2.5 px-3">Taller / Cargo</th>
                    <th className="py-2.5 px-3">Estado</th>
                    <th className="py-2.5 px-3">Rol a Asignar</th>
                    <th className="py-2.5 px-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRequests.map((req) => {
                    const isPending = req.estado === 'Pendiente';
                    const assignedRole = getAssignedRole(req);

                    return (
                      <tr key={req.id} className="hover:bg-gray-50/70">
                        <td className="py-3 px-3 font-semibold text-gray-900">{req.nombre}</td>
                        <td className="py-3 px-3 text-gray-700">{req.correo}</td>
                        <td className="py-3 px-3 text-gray-600">
                          <div className="font-medium text-gray-800">{req.taller || '—'}</div>
                          <div className="text-[11px] text-gray-500">{req.cargo || '—'}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              req.estado === 'Aprobada'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : req.estado === 'Rechazada'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {req.estado}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          {isPending ? (
                            <select
                              value={assignedRole}
                              onChange={(e) => handleRoleSelect(req.id, e.target.value)}
                              disabled={!isAdmin}
                              className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-600"
                            >
                              {allowedRoles.map((roleOpt) => (
                                <option key={roleOpt} value={roleOpt}>
                                  {roleOpt}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div className="space-y-0.5">
                              <span className="font-semibold text-gray-700 block">
                                {req.rolAsignado || '—'}
                              </span>
                              {req.estado === 'Aprobada' && (
                                <span className="text-[11px] text-gray-500 font-mono block">
                                  Clave: {req.passwordAsignada || DEFAULT_USER_PASSWORD}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-3 text-right space-x-2 whitespace-nowrap">
                          {isPending && isAdmin ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleApproveAction(req, assignedRole)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition cursor-pointer"
                              >
                                Aprobar
                              </button>
                              <button
                                type="button"
                                onClick={() => onRejectRequest && onRejectRequest(req.id)}
                                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold transition cursor-pointer"
                              >
                                Rechazar
                              </button>
                            </>
                          ) : isPending ? (
                            <span className="text-[11px] text-gray-400">Solo Administrador</span>
                          ) : (
                            <span className="text-[11px] text-gray-400">Procesada</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* Modal: Historial De Equipos del Técnico (solo equipos finalizados) */}
      {historialTecnicoSeleccionado && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl max-w-2xl w-full p-6 space-y-4 text-xs max-h-[85vh] flex flex-col">
            <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-gray-900 uppercase">
                  Historial De Equipos — {historialTecnicoSeleccionado.tecnico?.nombre}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Total de equipos finalizados trabajados:{' '}
                  <strong className="text-gray-800">
                    {historialTecnicoSeleccionado.ordenesHistorial.length}
                  </strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setHistorialTecnicoSeleccionado(null)}
                className="text-gray-500 hover:text-gray-800 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 pr-1">
              {historialTecnicoSeleccionado.ordenesHistorial.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                  Este técnico aún no tiene equipos finalizados en su historial.
                </div>
              ) : (
                historialTecnicoSeleccionado.ordenesHistorial.map((ord) => {
                  const fechaEntrada = ord.fechaCreacion || ord.createdAt;
                  const fechaSalida = obtenerFechaSalidaOrden(ord);
                  const mesaMomento = obtenerMesaMomento(
                    ord,
                    historialTecnicoSeleccionado.mesaActual
                  );
                  const nombreCliente =
                    ord.cliente || ord.nombreCliente || 'Cliente no especificado';

                  return (
                    <div
                      key={ord._id || ord.idOrden}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/80 pb-2">
                        <div className="font-bold text-gray-900 text-xs">
                          #{ord.idOrden || ord._id} — {describirEquipoOrden(ord)}
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {String(ord.estadoFinal || ord.estado || 'Finalizado')
                            .replace(/^\[|\]$/g, '')
                            .trim()}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-700">
                        <div>
                          <span className="font-semibold text-gray-800">
                            Mesa de trabajo ocupada:
                          </span>{' '}
                          {mesaMomento}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            Cliente que ingresó y retiró:
                          </span>{' '}
                          {nombreCliente}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            Día que trajeron el equipo:
                          </span>{' '}
                          {formatearDia(fechaEntrada)}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            Hora de entrada:
                          </span>{' '}
                          {formatearHora(fechaEntrada)}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            Día que se llevó el equipo:
                          </span>{' '}
                          {formatearDia(fechaSalida)}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            Hora de salida:
                          </span>{' '}
                          {formatearHora(fechaSalida)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                type="button"
                onClick={() => setHistorialTecnicoSeleccionado(null)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}