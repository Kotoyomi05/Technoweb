import React, { useMemo, useState } from 'react';

function formatearCOP(valor) {
  const num = Number(valor) || 0;
  return `$ ${num.toLocaleString('es-CO')} COP`;
}

function limpiarTextoCorchetes(valor = '') {
  return String(valor || '')
    .replace(/^\[|\]$/g, '')
    .trim();
}

function extraerServiciosYMateriales(orden = {}) {
  const items = [];

  if (Array.isArray(orden.repuestosAsignados)) {
    orden.repuestosAsignados.forEach((rep) => {
      const nombre = rep?.nombre || rep?.repuesto || rep?.codigo;
      if (!nombre) return;
      const cant = Number(rep?.cantidad) > 1 ? ` (x${rep.cantidad})` : '';
      items.push(`${nombre}${cant}`);
    });
  }

  if (Array.isArray(orden.materiales)) {
    orden.materiales.forEach((mat) => {
      if (typeof mat === 'string' && mat.trim()) {
        items.push(mat.trim());
      } else if (mat?.nombre) {
        items.push(mat.nombre);
      }
    });
  }

  if (Array.isArray(orden.servicios)) {
    orden.servicios.forEach((srv) => {
      if (typeof srv === 'string' && srv.trim()) {
        items.push(srv.trim());
      } else if (srv?.nombre) {
        items.push(srv.nombre);
      }
    });
  }

  if (items.length === 0 && orden.diagnostico) {
    items.push(`Diagnóstico: ${orden.diagnostico}`);
  }

  return items;
}

function calcularMontoOrden(orden = {}) {
  if (typeof orden.montoTotal === 'number') return orden.montoTotal;
  if (typeof orden.total === 'number') return orden.total;

  if (Array.isArray(orden.repuestosAsignados) && orden.repuestosAsignados.length > 0) {
    return orden.repuestosAsignados.reduce((acc, rep) => {
      const precio = Number(rep?.precio ?? rep?.precioUnitario ?? 0) || 0;
      const cant = Number(rep?.cantidad ?? 1) || 1;
      return acc + precio * cant;
    }, 0);
  }

  return 0;
}

export default function CierreOrdenView({
  orden,
  onBack,
  onGenerarFactura,
}) {
  const ordenData = orden || {};

  const idOrdenDisplay = ordenData.idOrden || ordenData._id || '—';
  const clienteDisplay =
    ordenData.cliente || ordenData.nombreCliente || 'Cliente no especificado';
  const dispositivoDisplay =
    [ordenData.tipoEquipo, ordenData.marca, ordenData.modelo].filter(Boolean).join(' ') ||
    'Equipo no especificado';
  const estadoAnteriorDisplay =
    limpiarTextoCorchetes(ordenData.estado) || 'EN PROCESO - Ingresado';

  const serviciosAplicados = useMemo(
    () => extraerServiciosYMateriales(ordenData),
    [ordenData]
  );

  const montoCalculado = useMemo(() => calcularMontoOrden(ordenData), [ordenData]);

  const [comentarios, setComentarios] = useState(
    () => ordenData.comentariosCierre || ordenData.notasCierre || ''
  );
  const [estadoFinal, setEstadoFinal] = useState('FINALIZADO - ENTREGADO');
  const [garantia, setGarantia] = useState('3 Meses');
  const [montoCobrar, setMontoCobrar] = useState(() => montoCalculado);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onGenerarFactura) {
      onGenerarFactura({
        orden: ordenData,
        comentariosFinales: comentarios.trim(),
        estadoFinal: limpiarTextoCorchetes(estadoFinal) || 'FINALIZADO - ENTREGADO',
        garantiaAplicable: limpiarTextoCorchetes(garantia),
        montoTotal: Number(montoCobrar) || 0,
      });
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <span>‹ Volver al Detalle de Orden</span>
      </button>

      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase mb-8 text-center sm:text-left">
        REGISTRO DE CIERRE Y FINALIZACIÓN DE ORDEN
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna izquierda: Resumen dinámico de la orden activa */}
        <section className="lg:col-span-5 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4 text-xs">
          <h2 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
            Resumen de la Orden #{idOrdenDisplay}
          </h2>

          <div>
            <span className="text-[11px] text-gray-500 block">Cliente</span>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{clienteDisplay}</p>
          </div>

          <div>
            <span className="text-[11px] text-gray-500 block">Dispositivo</span>
            <p className="text-sm font-bold text-gray-900 mt-0.5">{dispositivoDisplay}</p>
          </div>

          <div>
            <span className="text-[11px] text-gray-500 block mb-1">Estado Anterior</span>
            <span className="inline-block bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase">
              {estadoAnteriorDisplay}
            </span>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <span className="text-[11px] text-gray-500 block mb-1.5">
              Servicios y Materiales Aplicados
            </span>
            {serviciosAplicados.length === 0 ? (
              <p className="text-gray-500 italic">
                Sin servicios ni materiales registrados en esta orden aún.
              </p>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-gray-800 font-medium">
                {serviciosAplicados.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Columna derecha: Datos de cierre */}
        <section className="lg:col-span-7 bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-5 text-xs">
          <h2 className="text-sm font-bold text-gray-900">Datos de Cierre</h2>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
              COMENTARIOS FINALES DEL TÉCNICO
            </label>
            <textarea
              rows={4}
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Describe las pruebas finales, estado del equipo y observaciones de entrega..."
              className="w-full border border-gray-300 rounded-xl p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
              ESTADO FINAL
            </label>
            <select
              value={estadoFinal}
              onChange={(e) => setEstadoFinal(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="FINALIZADO - ENTREGADO">FINALIZADO - ENTREGADO</option>
              <option value="FINALIZADO - PENDIENTE RETIRO">
                FINALIZADO - PENDIENTE RETIRO
              </option>
              <option value="CERRADO">CERRADO</option>
              <option value="CANCELADO">CANCELADO</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
              GARANTÍA APLICABLE
            </label>
            <select
              value={garantia}
              onChange={(e) => setGarantia(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 bg-white text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Sin Garantía">Sin Garantía</option>
              <option value="1 Mes">1 Mes</option>
              <option value="3 Meses">3 Meses</option>
              <option value="6 Meses">6 Meses</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1.5">
              MONTO TOTAL A COBRAR
            </label>
            <input
              type="number"
              min="0"
              value={montoCobrar}
              onChange={(e) => setMontoCobrar(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[11px] text-gray-500 block mt-1">
              Vista previa: {formatearCOP(montoCobrar)}
            </span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs shadow-sm transition cursor-pointer"
            >
              PF-14: Generar Factura y Cerrar Orden
            </button>

            <button
              type="button"
              onClick={onBack}
              className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-xs border border-gray-300 transition cursor-pointer"
            >
              PF-12: Volver al Detalle
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}