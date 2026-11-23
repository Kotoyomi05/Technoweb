import React, { useState } from 'react';
import { mockUser, usersList } from '../data/userData';

const DEFAULT_USER_PASSWORD = 'techno123';

export default function GestionUsuariosView({
  currentUser = mockUser,
  users = usersList,
  accessRequests = [],
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
  // Guarda por userId si el computador del cliente ya fue marcado como entregado
  const [deliveredClients, setDeliveredClients] = useState({});

  const adminsList = users.filter((u) => (u.rol || '').toLowerCase().includes('admin'));
  const techniciansList = users.filter((u) => {
    const r = (u.rol || '').toLowerCase();
    return r.includes('tecn') || r.includes('técn');
  });
  const clientsList = users.filter((u) => (u.rol || '').toLowerCase().includes('client'));

  const isSameUser = (u) =>
    String(u.id) === String(currentUser?.id) ||
    (u.email || '').toLowerCase() === (currentUser?.email || '').toLowerCase();

  const canRemoveUser = (targetUser) => {
    const targetRole = (targetUser.rol || '').toLowerCase();
    const targetIsAdmin = targetRole.includes('admin');
    const targetIsTech = targetRole.includes('tecn') || targetRole.includes('técn');
    const targetIsClient = targetRole.includes('client');
    const self = isSameUser(targetUser);

    // Ningún administrador puede ser eliminado (ni a sí mismo ni por otro admin)[cite: 2]
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

  const filteredRequests = accessRequests.filter((req) => {
    if (filterStatus === 'Todas') return true;
    return req.estado === filterStatus;
  });

  const renderUserCard = (u, category) => {
    const self = isSameUser(u);
    const removable = canRemoveUser(u);
    const isDelivered = Boolean(deliveredClients[u.id]);
    const isClientCard = category === 'client';

    // Para clientes: si lo elimina admin o técnico, se exige "Computador entregado" primero
    const needsDeliveryLock = isClientCard && !self && (isAdmin || isTech);
    const canDeleteNow = removable && (!needsDeliveryLock || isDelivered);

    let actionLabel = 'Eliminar';
    if (self && !category.startsWith('admin')) {
      actionLabel = 'Darme de baja';
    } else if (isClientCard && needsDeliveryLock) {
      actionLabel = 'Retirar cliente';
    }

    return (
      <div
        key={u.id || u.email}
        className="min-w-[265px] max-w-[285px] shrink-0 bg-gray-50/70 border border-gray-200 rounded-xl p-4 flex flex-col justify-between gap-3"
      >
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

        <div className="text-[11px] text-gray-500 border-t border-gray-200/70 pt-2">
          <span className="truncate block">{u.direccion || 'Sin ubicación asignada'}</span>
        </div>

        {/* Controles específicos para clientes (candado de computador entregado) */}
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

        {/* Botón de eliminación / auto-baja */}
        {category === 'admin' ? (
          <span className="text-[10px] text-gray-400 font-medium text-center py-1">
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
          <span className="text-[10px] text-gray-400 font-medium text-center py-1">
            Sin permiso para eliminar
          </span>
        )}
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
            Listados horizontales por rol, auto-baja disponible para técnicos y clientes, y
            validación de computador entregado para clientes.
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
              Ningún administrador puede ser eliminado (ni por sí mismo ni por otro administrador).[cite: 2]
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
              El administrador puede eliminar técnicos; los técnicos solo pueden darse de baja a sí
              mismos.
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
              Para retirar a un cliente tras finalizar el trabajo, primero marca{' '}
              <strong>Computador entregado</strong>. Los clientes también pueden darse de baja.
            </p>
          </div>
        </div>

        {clientsList.length === 0 ? (
          <p className="text-xs text-gray-500 py-4">No hay clientes registrados.</p>
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
    </main>
  );
}