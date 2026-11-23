import React, { useEffect, useState } from 'react';

function parseNum(v, fallback = 0) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export default function AgregarStockView({
  currentUser,
  inventario = [],
  itemInicial = null,
  onSaveStock,
  onBack,
}) {
  const rolLower = String(currentUser?.rol || '').toLowerCase();
  const tienePermiso =
    rolLower.includes('admin') || rolLower.includes('tecn') || rolLower.includes('técn');

  const primerItem = itemInicial || (Array.isArray(inventario) ? inventario[0] : null);

  const [modo, setModo] = useState(
    itemInicial ? 'existente' : Array.isArray(inventario) && inventario.length > 0 ? 'existente' : 'nuevo'
  );
  const [selectedId, setSelectedId] = useState(
    primerItem?.codigo || primerItem?.id || ''
  );

  const [codigo, setCodigo] = useState(itemInicial?.codigo || itemInicial?.id || '');
  const [nombre, setNombre] = useState(itemInicial?.nombre || '');
  const [categoria, setCategoria] = useState(itemInicial?.categoria || 'Repuestos');
  const [precioUnitario, setPrecioUnitario] = useState(
    primerItem?.precio !== undefined ? String(primerItem.precio) : '0'
  );
  const [cantidadEntrante, setCantidadEntrante] = useState(1);
  const [stockMinimo, setStockMinimo] = useState(
    itemInicial?.stockMinimo !== undefined ? String(itemInicial.stockMinimo) : '3'
  );
  const [ubicacion, setUbicacion] = useState(
    primerItem?.ubicacion || 'Almacén Principal'
  );
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (modo === 'existente' && Array.isArray(inventario) && inventario.length > 0) {
      const actual =
        inventario.find((it) => String(it.codigo || it.id) === String(selectedId)) ||
        itemInicial ||
        inventario[0];

      if (actual) {
        const idActual = actual.codigo || actual.id || '';
        setSelectedId(idActual);
        setPrecioUnitario(actual.precio !== undefined ? String(actual.precio) : '0');
        setUbicacion(actual.ubicacion || 'Almacén Principal');
      }
    } else if (modo === 'nuevo' && !itemInicial) {
      setCodigo('');
      setNombre('');
      setCategoria('Repuestos');
      setPrecioUnitario('0');
      setStockMinimo('3');
      setUbicacion('Almacén Principal');
    }
  }, [modo, itemInicial, inventario, selectedId]);

  if (!tienePermiso) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-10">
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

        <div className="bg-white p-8 rounded-xl border border-rose-200 shadow-sm space-y-3 text-center">
          <h1 className="text-xl font-bold text-rose-700 uppercase">Acceso Restringido</h1>
          <p className="text-xs text-gray-700">
            Solo los cargos <span className="font-bold">Técnico</span> y{' '}
            <span className="font-bold">Administrador</span> pueden agregar stock al inventario.
          </p>
        </div>
      </main>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const entradaNum = parseInt(cantidadEntrante, 10);
    if (!Number.isFinite(entradaNum) || entradaNum <= 0) {
      setErrorMsg('Ingresa una cantidad entrante mayor a 0.');
      return;
    }

    if (modo === 'existente') {
      const target = inventario.find(
        (it) => String(it.codigo || it.id) === String(selectedId)
      );
      if (!target) {
        setErrorMsg('Selecciona un repuesto existente o cambia a "Registrar nuevo repuesto".');
        return;
      }

      const precioPrevio = Math.max(0, parseNum(target.precio ?? target.precioUnitario, 0));
      const precioIngresado =
        precioUnitario !== '' && parseNum(precioUnitario, -1) >= 0
          ? parseNum(precioUnitario, precioPrevio)
          : precioPrevio;

      const stockActualPrevio = parseNum(target.stock ?? target.stockActual, 0);
      const nuevoStock = stockActualPrevio + entradaNum;
      const actualizado = {
        ...target,
        stock: nuevoStock,
        stockActual: nuevoStock,
        precio: precioIngresado,
        ubicacion: ubicacion.trim() || target.ubicacion || 'Almacén Principal',
      };

      if (onSaveStock) {
        onSaveStock({ type: 'update', item: actualizado, cantidadAgregada: entradaNum });
      }
      return;
    }

    const codigoLimpio = codigo.trim() || `REP-${Date.now().toString().slice(-4)}`;
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) {
      setErrorMsg('Escribe el nombre del nuevo repuesto o material.');
      return;
    }

    const nuevoItem = {
      id: codigoLimpio,
      codigo: codigoLimpio,
      nombre: nombreLimpio,
      categoria: categoria.trim() || 'Repuestos',
      precio: Math.max(0, parseNum(precioUnitario, 0)),
      stock: entradaNum,
      stockActual: entradaNum,
      stockMinimo: Math.max(0, parseNum(stockMinimo, 1)),
      ubicacion: ubicacion.trim() || 'Almacén Principal',
      registradoPor: currentUser?.nombre || 'Usuario',
    };

    if (onSaveStock) {
      onSaveStock({ type: 'create', item: nuevoItem, cantidadAgregada: entradaNum });
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
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
          ENTRADA DE ALMACÉN • TÉCNICOS Y ADMINISTRADORES
        </span>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mt-1 uppercase">
          AGREGAR STOCK / NUEVO REPUESTO
        </h1>
      </div>

      {errorMsg && (
        <div className="mb-5 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6 text-xs"
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={inventario.length === 0}
            onClick={() => setModo('existente')}
            className={`px-4 py-2 rounded-lg font-semibold border cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              modo === 'existente'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            Sumar a repuesto existente
          </button>
          <button
            type="button"
            onClick={() => setModo('nuevo')}
            className={`px-4 py-2 rounded-lg font-semibold border cursor-pointer ${
              modo === 'nuevo'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            Registrar nuevo repuesto en almacén
          </button>
        </div>

        {modo === 'existente' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Seleccionar Repuesto Existente
              </label>
              <select
                value={selectedId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedId(val);
                  const found = inventario.find((it) => String(it.codigo || it.id) === String(val));
                  if (found) {
                    setPrecioUnitario(found.precio !== undefined ? String(found.precio) : '0');
                    setUbicacion(found.ubicacion || 'Almacén Principal');
                  }
                }}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              >
                {inventario.map((it) => {
                  const idVal = it.codigo || it.id;
                  return (
                    <option key={idVal} value={idVal}>
                      {idVal} — {it.nombre} (Stock: {parseNum(it.stock ?? it.stockActual, 0)})
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Cantidad que Llega (a sumar)
              </label>
              <input
                type="number"
                min="1"
                value={cantidadEntrante}
                onChange={(e) => setCantidadEntrante(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Precio Unitario ($ COP)
              </label>
              <input
                type="number"
                min="0"
                value={precioUnitario}
                onChange={(e) => setPrecioUnitario(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Ubicación</label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Código</label>
              <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ej. REP-BAT-01"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Nombre del Repuesto / Material
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Batería Lenovo IdeaPad"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Categoría</label>
              <input
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Ej. Baterías, Pantallas, Insumos"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Precio Unitario ($ COP)
              </label>
              <input
                type="number"
                min="0"
                value={precioUnitario}
                onChange={(e) => setPrecioUnitario(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Stock Inicial / Cantidad Entrante
              </label>
              <input
                type="number"
                min="1"
                value={cantidadEntrante}
                onChange={(e) => setCantidadEntrante(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Stock Mínimo</label>
              <input
                type="number"
                min="0"
                value={stockMinimo}
                onChange={(e) => setStockMinimo(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-semibold text-gray-700 mb-1">Ubicación</label>
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Ej. Estantería A-1"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-800"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg uppercase tracking-wider transition cursor-pointer"
          >
            Guardar Stock en Inventario
          </button>
          <button
            type="button"
            onClick={onBack}
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg uppercase tracking-wider transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  );
}