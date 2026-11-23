import React from 'react';

function formatearCOP(valor) {
  const num = Number(valor) || 0;
  return `$ ${num.toLocaleString('es-CO')} COP`;
}

export default function ConfirmacionCierreView({
  orden,
  onGoToOrders,
  onEnviarCorreo,
  onImprimirPdf,
}) {
  const ordenData = orden || {};

  const idOrdenDisplay = ordenData.idOrden || ordenData._id || '—';
  const clienteDisplay =
    ordenData.cliente || ordenData.nombreCliente || 'Cliente no especificado';
  const estadoFinalDisplay =
    ordenData.estadoFinal || ordenData.estado || 'FINALIZADO - ENTREGADO';
  const montoTotalDisplay = formatearCOP(ordenData.montoTotal ?? ordenData.total ?? 0);

  const sufijoFactura = String(ordenData.idOrden || ordenData._id || '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(-6)
    .toUpperCase();
  const numeroFacturaDisplay =
    ordenData.numeroFactura ||
    ordenData.factura ||
    (sufijoFactura ? `F-${sufijoFactura}` : 'F-000001');

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-center mb-6">
        CONFIRMACIÓN DE CIERRE Y FACTURACIÓN
      </p>

      <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10 max-w-md mx-auto text-center space-y-5">
        <div className="w-16 h-16 rounded-full border-2 border-emerald-500 text-emerald-600 flex flex-col items-center justify-center mx-auto">
          <span className="text-base font-bold leading-none">✓</span>
          <span className="text-[9px] font-extrabold tracking-wider uppercase mt-0.5">
            DONE
          </span>
        </div>

        <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 uppercase tracking-tight leading-snug">
          ORDEN #{idOrdenDisplay} FINALIZADA Y FACTURA GENERADA
        </h1>

        <div className="space-y-1.5 text-xs text-gray-700 pt-1">
          <p>
            <span className="font-semibold text-gray-800">Factura Nº:</span>{' '}
            <span>{numeroFacturaDisplay}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Cliente:</span>{' '}
            <span>{clienteDisplay}</span>
          </p>
        </div>

        <div className="py-1">
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">
            Monto Total: {montoTotalDisplay}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="font-semibold text-gray-700">Estado Final:</span>
          <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase">
            {estadoFinalDisplay}
          </span>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-2.5">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            ACCIONES SIGUIENTES
          </p>

          <button
            type="button"
            onClick={onGoToOrders}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl text-xs shadow-sm transition cursor-pointer"
          >
            PF-02: Volver al Listado de Órdenes
          </button>

          <button
            type="button"
            onClick={() => {
              if (onEnviarCorreo) {
                onEnviarCorreo(ordenData);
              } else {
                window.alert(`Factura ${numeroFacturaDisplay} enviada al correo de ${clienteDisplay}.`);
              }
            }}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-xs border border-gray-300 transition cursor-pointer"
          >
            PF-16: Enviar Factura por Correo
          </button>

          <button
            type="button"
            onClick={() => {
              if (onImprimirPdf) {
                onImprimirPdf(ordenData);
              } else {
                window.print();
              }
            }}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-4 rounded-xl text-xs border border-gray-300 transition cursor-pointer"
          >
            Imprimir Factura en PDF
          </button>
        </div>
      </section>
    </main>
  );
}