import React, { useEffect, useMemo, useState } from 'react';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';
const INVENTARIO_STORAGE_KEY = 'techservice_inventario';

function parseStockNumero(stockRaw) {
  if (typeof stockRaw === 'number') return Number.isFinite(stockRaw) ? Math.max(0, stockRaw) : 0;
  const cleaned = String(stockRaw ?? '').replace(/[^\d]/g, '');
  const parsed = parseInt(cleaned, 10);
  return Number.isNaN(parsed) ? 0 : Math.max(0, parsed);
}

function parsePrecioNumero(precioRaw) {
  if (typeof precioRaw === 'number') return Number.isFinite(precioRaw) ? Math.max(0, precioRaw) : 0;
  const cleaned = String(precioRaw ?? '').replace(/[^\d.-]/g, '');
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function leerInventarioLocal() {
  try {
    const saved = localStorage.getItem(INVENTARIO_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function AsignarRepuestoView({
  orden,
  inventario: inventarioProp = [],
  onDescontarStock,
  onBack,
  onConfirmSuccess,
}) {
  const ordenData = orden || {};
  const idOrdenDisplay = ordenData.idOrden || ordenData._id || '—';

  const baseInicial = useMemo(() => {
    if (Array.isArray(inventarioProp) && inventarioProp.length > 0) {
      return inventarioProp;
    }
    return leerInventarioLocal();
  }, [inventarioProp]);

  const [inventario, setInventario] = useState(baseInicial);
  const [loadingInventario, setLoadingInventario] = useState(false);

  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  const [asignados, setAsignados] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    if (Array.isArray(inventarioProp) && inventarioProp.length > 0) {
      setInventario(inventarioProp);
    } else {
      const localItems = leerInventarioLocal();
      setInventario(localItems);
    }
  }, [inventarioProp]);

  useEffect(() => {
    let active = true;

    async function cargarInventarioBackend() {
      if (Array.isArray(inventarioProp) && inventarioProp.length > 0) {
        return;
      }
      setLoadingInventario(true);
      try {
        const res = await fetch(`${API_URL}/inventario`);
        if (!res.ok) return;
        const data = await res.json().catch(() => null);
        const lista = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.inventario)
          ? data.inventario
          : [];
        if (active && lista.length > 0) {
          setInventario(lista);
        }
      } catch {
        // Mantiene inventarioProp o localStorage si el backend no responde
      } finally {
        if (active) setLoadingInventario(false);
      }
    }

    cargarInventarioBackend();
    return () => {
      active = false;
    };
  }, [inventarioProp]);

  const categoriasDisponibles = useMemo(() => {
    const setCats = new Set();
    inventario.forEach((item) => {
      const cat = String(item?.categoria || item?.category || '').trim();
      if (cat) setCats.add(cat);
    });
    return Array.from(setCats);
  }, [inventario]);

  const inventarioFiltrado = useMemo(() => {
    const q = busqueda.trim().toLowerCase();

    return inventario.filter((item) => {
      const catItem = String(item?.categoria || item?.category || '').trim();
      const coincideCategoria =
        categoriaSeleccionada === 'Todas' ||
        catItem.toLowerCase() === categoriaSeleccionada.toLowerCase();

      if (!coincideCategoria) return false;
      if (!q) return true;

      const codigo = String(item?.codigo || item?.id || item?._id || '').toLowerCase();
      const nombre = String(item?.nombre || item?.name || '').toLowerCase();
      const categoria = catItem.toLowerCase();

      return codigo.includes(q) || nombre.includes(q) || categoria.includes(q);
    });
  }, [inventario, busqueda, categoriaSeleccionada]);

  const handleAgregar = (item) => {
    setFeedbackMsg('');
    const itemId = item.codigo || item.id || item._id;
    const stockMax = parseStockNumero(item.stock ?? item.stockActual ?? item.cantidad);
    const precioUnitario = parsePrecioNumero(item.precio ?? item.precioUnitario ?? item.valor ?? 0);

    if (stockMax <= 0) {
      setFeedbackMsg(`"${item.nombre}" no tiene stock disponible.`);
      return;
    }

    const existe = asignados.find((a) => String(a.id) === String(itemId));
    if (existe) {
      if (existe.cantidad >= stockMax) {
        setFeedbackMsg(
          `Solo hay ${stockMax} unidad(es) en stock de "${item.nombre}".`
        );
        return;
      }
      setAsignados((prev) =>
        prev.map((a) =>
          String(a.id) === String(itemId)
            ? { ...a, cantidad: a.cantidad + 1, precio: precioUnitario }
            : a
        )
      );
    } else {
      setAsignados((prev) => [
        ...prev,
        {
          id: itemId,
          nombre: item.nombre,
          cantidad: 1,
          precio: precioUnitario,
          stockDisponible: stockMax,
        },
      ]);
    }
  };

  const handleRemover = (id) => {
    setFeedbackMsg('');
    setAsignados((prev) => prev.filter((a) => String(a.id) !== String(id)));
  };

  const totalCosto = asignados.reduce(
    (acc, item) => acc + parsePrecioNumero(item.precio) * (Number(item.cantidad) || 0),
    0
  );

  const handleConfirmarRepuestos = async () => {
    if (submitting || asignados.length === 0) return;
    setSubmitting(true);
    setFeedbackMsg('');

    const ordenId = ordenData._id || ordenData.idOrden;
    const payload = {
      repuestosAsignados: asignados,
      costoEstimadoRepuestos: totalCosto,
    };

    if (onDescontarStock) {
      onDescontarStock(asignados);
    }

    setInventario((prev) =>
      prev.map((item) => {
        const itemId = String(item.codigo || item.id || item._id);
        const match = asignados.find((a) => String(a.id) === itemId);
        if (!match) return item;
        const actual = parseStockNumero(item.stock ?? item.stockActual ?? item.cantidad);
        const nuevoStock = Math.max(0, actual - (Number(match.cantidad) || 0));
        return { ...item, stock: nuevoStock, stockActual: nuevoStock };
      })
    );

    if (ordenId) {
      try {
        await fetch(`${API_URL}/ordenes/${ordenId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Continúa con la confirmación local si el backend no tiene este PATCH
      }
    }

    setSubmitting(false);

    if (onConfirmSuccess) {
      onConfirmSuccess({
        orden: {
          ...ordenData,
          ...payload,
        },
        repuestos: asignados,
        totalCosto,
      });
    } else if (onBack) {
      onBack();
    }
  };

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
        <span>Volver al Diagnóstico</span>
      </button>

      <div className="text-center mb-8">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
          ASIGNACIÓN DE REPUESTOS Y MATERIALES
        </span>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1">
          ORDEN #{idOrdenDisplay}: GESTIÓN DE INVENTARIO
        </h1>
        <p className="text-gray-600 mt-1">
          Seleccione los repuestos necesarios para la reparación en curso
        </p>
      </div>

      {feedbackMsg && (
        <div className="mb-5 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-xs font-medium">
          {feedbackMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <h3 className="font-semibold text-gray-900 text-base">Inventario Disponible</h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por nombre, código o letra (ej. B)..."
                className="w-full bg-white border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer sm:w-64"
            >
              <option value="Todas">Categoría (Todas)</option>
              {categoriasDisponibles.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="divide-y divide-gray-100 border-t border-b border-gray-100 py-1">
            {loadingInventario && inventarioFiltrado.length === 0 ? (
              <p className="py-8 text-center text-xs text-gray-500">
                Cargando inventario...
              </p>
            ) : inventarioFiltrado.length === 0 ? (
              <p className="py-8 text-center text-xs text-gray-500">
                No hay repuestos ni insumos registrados en el inventario actualmente (0 disponibles).
              </p>
            ) : (
              inventarioFiltrado.map((item) => {
                const itemId = item.codigo || item.id || item._id;
                const precioUnitario = parsePrecioNumero(
                  item.precio ?? item.precioUnitario ?? item.valor ?? 0
                );
                const stockNum = parseStockNumero(item.stock ?? item.stockActual ?? item.cantidad);

                return (
                  <div
                    key={itemId}
                    className="py-3.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-sm hover:bg-gray-50/50 px-2 rounded-lg transition"
                  >
                    <span className="font-bold text-gray-900 w-24 shrink-0">{itemId}</span>
                    <span className="text-gray-700 flex-1 px-2 font-medium">{item.nombre}</span>
                    <span className="text-gray-800 font-semibold text-xs whitespace-nowrap px-2">
                      ${precioUnitario.toLocaleString('es-CO')} c/u
                    </span>
                    <span className="text-gray-600 w-24 text-center text-xs shrink-0">
                      Stock: {stockNum}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAgregar(item)}
                      disabled={stockNum <= 0}
                      className="text-blue-600 disabled:text-gray-400 font-semibold hover:underline disabled:no-underline cursor-pointer disabled:cursor-not-allowed text-xs ml-2 shrink-0"
                    >
                      [Agregar +]
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Repuestos Asignados (Orden #{idOrdenDisplay})
            </h3>

            <div className="space-y-3">
              {asignados.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-4 text-center">
                  No hay repuestos asignados aún.
                </p>
              ) : (
                asignados.map((item) => {
                  const precioItem = parsePrecioNumero(item.precio);
                  const cantItem = Number(item.cantidad) || 0;
                  return (
                    <div
                      key={item.id}
                      className="bg-gray-50/80 p-3 rounded-lg border border-gray-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{item.id}</p>
                        <p className="text-gray-600 mt-0.5">{item.nombre}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">
                          ${precioItem.toLocaleString('es-CO')} c/u • Subtotal: $
                          {(precioItem * cantItem).toLocaleString('es-CO')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-700 font-medium">Cantidad: {cantItem}</span>
                        <button
                          type="button"
                          onClick={() => handleRemover(item.id)}
                          className="text-gray-400 hover:text-red-600 font-bold text-sm cursor-pointer ml-1"
                        >
                          [x]
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Total estimated cost</span>
              <span className="font-bold text-gray-900 text-base">
                ${totalCosto.toLocaleString('es-CO')}
              </span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={handleConfirmarRepuestos}
                disabled={submitting || asignados.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2.5 rounded-lg text-xs transition shadow-sm cursor-pointer disabled:cursor-not-allowed text-center"
              >
                {submitting ? 'Confirmando...' : 'PF-11: Confirmar y Descontar Stock'}
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg text-xs transition shadow-sm cursor-pointer text-center"
              >
                PF-04: Volver al Diagnóstico
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}