import React, { useMemo, useState } from 'react';

function parseNumero(val) {
  if (typeof val === 'number') return Number.isFinite(val) ? val : 0;
  const cleaned = String(val ?? '').replace(/[^\d.-]/g, '');
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function getEstadoStock(stockActual, stockMinimo) {
  if (stockActual <= 0) {
    return { label: 'Sin Stock', tipo: 'danger' };
  }
  if (stockActual < stockMinimo) {
    return { label: stockActual <= Math.max(1, Math.floor(stockMinimo / 2)) ? 'Crítico' : 'Bajo Stock', tipo: stockActual <= Math.max(1, Math.floor(stockMinimo / 2)) ? 'danger' : 'warning' };
  }
  return { label: 'Disponible', tipo: 'success' };
}

export default function InventarioView({
  currentUser,
  inventario = [],
  solicitudesCompra = [],
  onBack,
  onOpenAgregarStock,
  onOpenSolicitudCompra,
  onOpenHistorialPedidos,
  onSolicitarItem,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [detalleItem, setDetalleItem] = useState(null);
  const [roleAlert, setRoleAlert] = useState('');

  const rolLower = String(currentUser?.rol || '').toLowerCase();
  const puedeGestionar =
    rolLower.includes('admin') || rolLower.includes('tecn') || rolLower.includes('técn');

  const repuestosFiltrados = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const lista = Array.isArray(inventario) ? inventario : [];
    if (!q) return lista;

    return lista.filter((item) => {
      const codigo = String(item?.codigo || item?.id || '').toLowerCase();
      const nombre = String(item?.nombre || '').toLowerCase();
      const categoria = String(item?.categoria || '').toLowerCase();
      const ubicacion = String(item?.ubicacion || '').toLowerCase();
      return (
        codigo.includes(q) ||
        nombre.includes(q) ||
        categoria.includes(q) ||
        ubicacion.includes(q)
      );
    });
  }, [inventario, searchTerm]);

  const resumenLogistica = useMemo(() => {
    const listaInv = Array.isArray(inventario) ? inventario : [];
    const listaSol = Array.isArray(solicitudesCompra) ? solicitudesCompra : [];

    const solicitudesPendientes = listaSol.filter((s) => {
      const est = String(s?.estado || 'Pendiente').toLowerCase();
      return est.includes('pend') || est.includes('solic');
    }).length;

    const repuestosEnTransito = listaSol
      .filter((s) => {
        const est = String(s?.estado || '').toLowerCase();
        return est.includes('tráns') || est.includes('trans') || est.includes('aprob');
      })
      .reduce((acc, s) => acc + parseNumero(s?.cantidad), 0);

    const alertasStock = listaInv.filter((item) => {
      const actual = parseNumero(item?.stock ?? item?.stockActual);
      const minimo = parseNumero(item?.stockMinimo ?? 1);
      return actual < minimo;
    }).length;

    const ultimaSolicitud = listaSol[0];
    const proximaEntrega =
      ultimaSolicitud?.fechaEntregaEstimada || ultimaSolicitud?.fecha || 'Sin programar';

    return {
      solicitudesPendientes,
      repuestosEnTransito,
      alertasStock,
      proximaEntrega,
    };
  }, [inventario, solicitudesCompra]);

  const handleClickSolicitudCompra = (itemPreseleccionado = null) => {
    setRoleAlert('');
    if (!puedeGestionar) {
      setRoleAlert(
        'Acceso restringido: solo los cargos Técnico y Administrador pueden generar solicitudes de compra.'
      );
      return;
    }
    if (onOpenSolicitudCompra) {
      onOpenSolicitudCompra(itemPreseleccionado);
    }
  };

  const handleClickAgregarStock = (itemPreseleccionado = null) => {
    setRoleAlert('');
    if (!puedeGestionar) {
      setRoleAlert(
        'Acceso restringido: solo los cargos Técnico y Administrador pueden agregar stock al inventario.'
      );
      return;
    }
    if (onOpenAgregarStock) {
      onOpenAgregarStock(itemPreseleccionado);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Volver al Dashboard</span>
        </button>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">
          GESTIÓN INTEGRAL DE RECURSOS Y MATERIALES - TALLER CENTRAL
        </h1>
      </div>

      {roleAlert && (
        <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
          {roleAlert}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">
            Inventario de Repuestos Críticos
          </h3>

          <div className="pt-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Buscar:</label>
            <div className="relative w-full sm:w-72">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar repuesto..."
                className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto border-t border-gray-100 pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/70 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200">
                  <th className="py-2.5 px-3">Código</th>
                  <th className="py-2.5 px-3">Nombre de Repuesto</th>
                  <th className="py-2.5 px-3">Stock Actual</th>
                  <th className="py-2.5 px-3">Stock Mínimo</th>
                  <th className="py-2.5 px-3">Ubicación</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {repuestosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-500">
                      No hay repuestos ni materiales registrados en el inventario actualmente. Usa{' '}
                      <span className="font-semibold text-gray-700">Agregar Stock / Repuesto</span>{' '}
                      para registrar los que lleguen al taller.
                    </td>
                  </tr>
                ) : (
                  repuestosFiltrados.map((item, idx) => {
                    const codigo = item.codigo || item.id || `ITEM-${idx + 1}`;
                    const actual = parseNumero(item.stock ?? item.stockActual);
                    const minimo = parseNumero(item.stockMinimo ?? 1);
                    const ubicacion = item.ubicacion || 'Sin ubicación';
                    const estadoObj = getEstadoStock(actual, minimo);

                    return (
                      <tr key={item._id || codigo || idx} className="hover:bg-gray-50/50 transition">
                        <td className="py-3 px-3 font-semibold text-gray-700">{codigo}</td>
                        <td className="py-3 px-3 font-medium text-gray-900">{item.nombre}</td>
                        <td className="py-3 px-3 font-semibold text-gray-800">{actual}</td>
                        <td className="py-3 px-3 text-gray-600">{minimo}</td>
                        <td className="py-3 px-3 text-gray-700">{ubicacion}</td>
                        <td className="py-3 px-3 font-semibold">
                          {estadoObj.tipo === 'warning' && (
                            <span className="inline-flex items-center space-x-1 text-amber-700">
                              <span>⚠️</span>
                              <span>{estadoObj.label}</span>
                            </span>
                          )}
                          {estadoObj.tipo === 'success' && (
                            <span className="inline-flex items-center space-x-1 text-emerald-600">
                              <span className="w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center text-[10px] font-bold">
                                ✓
                              </span>
                              <span>{estadoObj.label}</span>
                            </span>
                          )}
                          {estadoObj.tipo === 'danger' && (
                            <span className="inline-flex items-center space-x-1 text-rose-600">
                              <span className="w-3 h-3 bg-rose-600 rounded-full inline-block" />
                              <span>{estadoObj.label}</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 space-y-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (onSolicitarItem) {
                                onSolicitarItem(item);
                              } else {
                                handleClickSolicitudCompra(item);
                              }
                            }}
                            className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center"
                          >
                            Solicitar
                          </button>
                          <button
                            type="button"
                            onClick={() => setDetalleItem(item)}
                            className="block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer w-full text-center"
                          >
                            Detalles
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5 h-fit">
          <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
            Resumen de Logística
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <span className="text-gray-600 font-medium">Solicitudes Pendientes:</span>
              <span className="font-bold text-gray-900 ml-1.5">
                {resumenLogistica.solicitudesPendientes}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium">Repuestos en Tránsito:</span>
              <span className="font-bold text-gray-900 ml-1.5">
                {resumenLogistica.repuestosEnTransito}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100 p-2 bg-rose-50/50 rounded-lg border border-rose-100">
              <span className="text-rose-700 font-medium">Alertas de Stock:</span>
              <span className="font-bold text-rose-800 ml-1.5">
                {resumenLogistica.alertasStock}
              </span>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <span className="text-gray-600 font-medium block mb-1">
                Próxima Entrega Proveedor:
              </span>
              <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
                {resumenLogistica.proximaEntrega}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => handleClickSolicitudCompra(null)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          PF-08: GENERAR NUEVA SOLICITUD DE COMPRA
        </button>
        <button
          type="button"
          onClick={() => handleClickAgregarStock(null)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          AGREGAR STOCK / REPUESTO
        </button>
        <button
          type="button"
          onClick={onOpenHistorialPedidos}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
        >
          VER HISTORIAL DE PEDIDOS
        </button>
      </div>

      {detalleItem && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg max-w-md w-full p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-2.5">
              <h4 className="font-bold text-gray-900 text-sm">Detalle del Repuesto</h4>
              <button
                type="button"
                onClick={() => setDetalleItem(null)}
                className="text-gray-500 hover:text-gray-800 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p>
                <span className="font-semibold text-gray-600">Código:</span>{' '}
                <span className="font-bold text-gray-900">
                  {detalleItem.codigo || detalleItem.id || '—'}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Nombre:</span>{' '}
                <span className="font-semibold text-gray-900">{detalleItem.nombre}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Categoría:</span>{' '}
                <span className="text-gray-800">{detalleItem.categoria || 'General'}</span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Precio Unitario:</span>{' '}
                <span className="text-gray-800 font-semibold">
                  ${(Number(detalleItem.precio) || 0).toLocaleString('es-CO')}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Stock Actual:</span>{' '}
                <span className="text-gray-900 font-bold">
                  {parseNumero(detalleItem.stock ?? detalleItem.stockActual)}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Stock Mínimo:</span>{' '}
                <span className="text-gray-800">
                  {parseNumero(detalleItem.stockMinimo ?? 1)}
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-600">Ubicación:</span>{' '}
                <span className="text-gray-800">{detalleItem.ubicacion || 'Sin ubicación'}</span>
              </p>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              {puedeGestionar && (
                <button
                  type="button"
                  onClick={() => {
                    const target = detalleItem;
                    setDetalleItem(null);
                    handleClickAgregarStock(target);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
                >
                  Sumar Stock
                </button>
              )}
              <button
                type="button"
                onClick={() => setDetalleItem(null)}
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