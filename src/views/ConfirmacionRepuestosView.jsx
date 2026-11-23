import React from 'react';

export default function ConfirmacionRepuestosView({
  repuestosAsignados = [],
  orden,
  onGoToDetail,
  onAssignMore,
  onImprimirComprobante,
}) {
  const listaItems = Array.isArray(repuestosAsignados) ? repuestosAsignados : [];

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-center mb-6">
        CONFIRMACIÓN DE ASIGNACIÓN Y DESCUENTO DE STOCK
      </p>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-14 h-14 rounded-full border-2 border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>

        <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 uppercase tracking-tight">
          REPUESTOS ASIGNADOS Y STOCK ACTUALIZADO
        </h1>

        {listaItems.length === 0 ? (
          <p className="text-xs text-gray-500 italic py-3">
            No se registraron movimientos de repuestos en esta confirmación.
          </p>
        ) : (
          <div className="space-y-2.5 text-left text-xs">
            {listaItems.map((item, idx) => {
              const codigo = item.codigo || item.id || '—';
              const nombre = item.nombre || item.repuesto || 'Repuesto sin nombre';
              const cantidad = Number(item.cantidad ?? 1) || 1;
              const stockAnterior =
                item.stockAnterior !== undefined ? item.stockAnterior : '—';
              const stockNuevo =
                item.stockNuevo !== undefined
                  ? item.stockNuevo
                  : typeof stockAnterior === 'number'
                  ? Math.max(0, stockAnterior - cantidad)
                  : '—';

              return (
                <div
                  key={`${codigo}-${idx}`}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">{codigo}</span>
                    <span className="text-gray-700 font-medium">{nombre}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-[11px] text-gray-600">
                    <span>Cantidad: {cantidad}</span>
                    <span>Stock Anterior: {stockAnterior}</span>
                    <span className="font-bold text-gray-900">
                      Stock Nuevo: {stockNuevo}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            ACCIONES SIGUIENTES
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onGoToDetail}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-sm transition cursor-pointer"
            >
              PF-12: Volver a la Ficha de la Orden
            </button>

            <button
              type="button"
              onClick={() => {
                if (onImprimirComprobante) {
                  onImprimirComprobante({ orden, items: listaItems });
                } else {
                  window.print();
                }
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-xs border border-gray-300 transition cursor-pointer"
            >
              Imprimir Comprobante de Salida
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={onAssignMore}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-xs border border-gray-300 transition cursor-pointer"
            >
              Asignar Otro Repuesto
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}