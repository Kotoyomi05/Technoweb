import React, { useMemo } from 'react';

export default function HistorialPedidosView({
  solicitudesCompra = [],
  entradasStock = [],
  ordenes = [],
  onBack,
}) {
  const consumosEnEquipos = useMemo(() => {
    const listaOrdenes = Array.isArray(ordenes) ? ordenes : [];
    const registros = [];

    listaOrdenes.forEach((orden) => {
      const repuestos = Array.isArray(orden?.repuestosAsignados)
        ? orden.repuestosAsignados
        : [];
      if (repuestos.length === 0) return;

      const idOrden = orden?.idOrden || orden?._id || '—';
      const equipoTexto =
        [orden?.tipoEquipo, orden?.marca, orden?.modelo].filter(Boolean).join(' ') ||
        'Equipo no especificado';
      const clienteTexto = orden?.cliente || orden?.nombreCliente || '—';

      repuestos.forEach((rep, idx) => {
        registros.push({
          key: `${idOrden}-${rep?.id || rep?.codigo || idx}`,
          idOrden,
          equipo: equipoTexto,
          cliente: clienteTexto,
          repuesto: rep?.nombre || rep?.id || 'Repuesto',
          codigo: rep?.id || rep?.codigo || '—',
          cantidad: Number(rep?.cantidad) || 1,
          fecha: orden?.fechaCreacion
            ? new Date(orden.fechaCreacion).toLocaleDateString('es-CO')
            : '—',
        });
      });
    });

    return registros;
  }, [ordenes]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver a Inventario</span>
      </button>

      <div className="mb-8">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          TRAZABILIDAD DE COMPRAS, ENTRADAS Y CONSUMO
        </span>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1 uppercase">
          HISTORIAL DE PEDIDOS Y ASIGNACIONES
        </h1>
      </div>

      <div className="space-y-8 text-xs">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
            Solicitudes / Pedidos de Compra Realizados ({solicitudesCompra.length})
          </h2>

          {solicitudesCompra.length === 0 ? (
            <p className="py-6 text-center text-gray-500">
              Aún no se han registrado solicitudes de compra.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase border-b border-gray-200">
                    <th className="py-2 px-3">ID</th>
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Repuesto / Material</th>
                    <th className="py-2 px-3">Cantidad</th>
                    <th className="py-2 px-3">Prioridad</th>
                    <th className="py-2 px-3">Descripción / Faltantes</th>
                    <th className="py-2 px-3">Solicitante</th>
                    <th className="py-2 px-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {solicitudesCompra.map((sol) => (
                    <tr key={sol.id} className="hover:bg-gray-50/60">
                      <td className="py-2.5 px-3 font-bold text-gray-900">{sol.id}</td>
                      <td className="py-2.5 px-3 text-gray-600">{sol.fecha || '—'}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-800">{sol.nombre}</td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{sol.cantidad}</td>
                      <td className="py-2.5 px-3 text-gray-700">{sol.prioridad || 'Media'}</td>
                      <td className="py-2.5 px-3 text-gray-700 max-w-xs">{sol.descripcion}</td>
                      <td className="py-2.5 px-3 text-gray-700">{sol.solicitadoPor || '—'}</td>
                      <td className="py-2.5 px-3 font-semibold text-amber-700">
                        {sol.estado || 'Pendiente'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
            Historial de Entradas de Stock al Almacén ({entradasStock.length})
          </h2>

          {entradasStock.length === 0 ? (
            <p className="py-6 text-center text-gray-500">
              Aún no se han registrado entradas de stock en el almacén.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase border-b border-gray-200">
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3">Código</th>
                    <th className="py-2 px-3">Repuesto / Material</th>
                    <th className="py-2 px-3">Tipo</th>
                    <th className="py-2 px-3">Cantidad Entrante</th>
                    <th className="py-2 px-3">Stock Resultante</th>
                    <th className="py-2 px-3">Ubicación</th>
                    <th className="py-2 px-3">Registrado Por</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {entradasStock.map((ent) => (
                    <tr key={ent.id} className="hover:bg-gray-50/60">
                      <td className="py-2.5 px-3 text-gray-600">{ent.fecha || '—'}</td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{ent.codigo}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-800">{ent.nombre}</td>
                      <td className="py-2.5 px-3 text-emerald-700 font-semibold">
                        {ent.tipo === 'create' ? 'Nuevo en almacén' : 'Suma de stock'}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-emerald-700">
                        +{ent.cantidadAgregada}
                      </td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">
                        {ent.stockResultante}
                      </td>
                      <td className="py-2.5 px-3 text-gray-700">{ent.ubicacion || '—'}</td>
                      <td className="py-2.5 px-3 text-gray-700">{ent.registradoPor || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h2 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-3">
            Stock Asignado a Computadores / Órdenes ({consumosEnEquipos.length})
          </h2>

          {consumosEnEquipos.length === 0 ? (
            <p className="py-6 text-center text-gray-500">
              Aún no hay repuestos registrados en ninguna orden de servicio.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 uppercase border-b border-gray-200">
                    <th className="py-2 px-3">Orden</th>
                    <th className="py-2 px-3">Computador / Equipo</th>
                    <th className="py-2 px-3">Cliente</th>
                    <th className="py-2 px-3">Código</th>
                    <th className="py-2 px-3">Repuesto</th>
                    <th className="py-2 px-3">Cantidad</th>
                    <th className="py-2 px-3">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {consumosEnEquipos.map((c) => (
                    <tr key={c.key} className="hover:bg-gray-50/60">
                      <td className="py-2.5 px-3 font-bold text-gray-900">#{c.idOrden}</td>
                      <td className="py-2.5 px-3 font-medium text-gray-800">{c.equipo}</td>
                      <td className="py-2.5 px-3 text-gray-700">{c.cliente}</td>
                      <td className="py-2.5 px-3 font-semibold text-gray-700">{c.codigo}</td>
                      <td className="py-2.5 px-3 text-gray-800">{c.repuesto}</td>
                      <td className="py-2.5 px-3 font-bold text-gray-900">{c.cantidad}</td>
                      <td className="py-2.5 px-3 text-gray-600">{c.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}