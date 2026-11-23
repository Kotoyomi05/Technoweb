import React, { useMemo, useState } from 'react';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';

export default function MedidorDispositivosView({
  ordenInicial = '',
  equipoInicial = '',
  onSaveMedicion,
  onBack,
}) {
  const [ordenId, setOrdenId] = useState(ordenInicial);
  const [equipoNombre, setEquipoNombre] = useState(equipoInicial || 'Equipo en diagnóstico');

  // Medición de voltaje (ej. sensor de voltaje 0V - 25V / batería / rieles)
  const [voltajeMedido, setVoltajeMedido] = useState('12.0');
  const [voltajeNominal, setVoltajeNominal] = useState('12.0');
  const [toleranciaVoltaje, setToleranciaVoltaje] = useState('0.8');

  // Estado de memoria RAM
  const [estadoRam, setEstadoRam] = useState('Operativa');
  const [detalleRam, setDetalleRam] = useState('Sin errores detectados en prueba de memoria');

  // Estado de tarjeta gráfica (GPU)
  const [estadoGpu, setEstadoGpu] = useState('Operativa');
  const [detalleGpu, setDetalleGpu] = useState('Salida de video y estabilidad térmica correctas');

  const [notasTecnico, setNotasTecnico] = useState('');
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const diagnosticoVoltaje = useMemo(() => {
    const med = parseFloat(voltajeMedido);
    const nom = parseFloat(voltajeNominal);
    const tol = parseFloat(toleranciaVoltaje);

    if (Number.isNaN(med) || Number.isNaN(nom) || Number.isNaN(tol)) {
      return {
        estado: 'Sin lectura',
        badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
      };
    }

    const diff = Math.abs(med - nom);
    if (diff <= tol) {
      return {
        estado: 'Voltaje Estable',
        badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      };
    }
    if (diff <= tol * 1.8) {
      return {
        estado: 'Voltaje en Alerta',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    }
    return {
      estado: 'Fuera de Rango',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    };
  }, [voltajeMedido, voltajeNominal, toleranciaVoltaje]);

  const estadoGeneral = useMemo(() => {
    const hayFalloCritico =
      diagnosticoVoltaje.estado === 'Fuera de Rango' ||
      estadoRam === 'Con fallos' ||
      estadoRam === 'No detectada' ||
      estadoGpu === 'Con fallos' ||
      estadoGpu === 'No detectada';

    if (hayFalloCritico) {
      return {
        texto: 'Requiere revisión / reemplazo de componente',
        boxClass: 'bg-rose-50 border-rose-200 text-rose-800',
      };
    }

    const hayAlerta =
      diagnosticoVoltaje.estado === 'Voltaje en Alerta' ||
      estadoRam === 'Degradada' ||
      estadoGpu === 'Degradada';

    if (hayAlerta) {
      return {
        texto: 'Operativo con observaciones',
        boxClass: 'bg-amber-50 border-amber-200 text-amber-900',
      };
    }

    return {
      texto: 'Componentes en buen estado',
      boxClass: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    };
  }, [diagnosticoVoltaje.estado, estadoRam, estadoGpu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!ordenId.trim()) {
      setStatusMsg({
        type: 'error',
        text: 'Ingresa el ID de la orden a la que deseas asociar esta medición.',
      });
      return;
    }

    const payload = {
      voltajeMedido: voltajeMedido === '' ? null : Number(voltajeMedido),
      voltajeNominal: voltajeNominal === '' ? null : Number(voltajeNominal),
      diagnosticoVoltaje: diagnosticoVoltaje.estado,
      estadoRam,
      detalleRam: detalleRam.trim(),
      estadoGpu,
      detalleGpu: detalleGpu.trim(),
      notasTecnico: [
        equipoNombre.trim() ? `Equipo: ${equipoNombre.trim()}` : '',
        notasTecnico.trim(),
      ]
        .filter(Boolean)
        .join(' — '),
    };

    setSaving(true);
    try {
      const res = await fetch(
        `${API_URL}/ordenes/${encodeURIComponent(ordenId.trim())}/mediciones`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'No se pudo guardar la medición en MongoDB');
      }

      if (onSaveMedicion) {
        onSaveMedicion(data);
      }

      setStatusMsg({
        type: 'success',
        text: `Medición guardada en la orden ${ordenId.trim()} dentro de MongoDB.`,
      });
    } catch (err) {
      console.error(err);
      setStatusMsg({
        type: 'error',
        text:
          err.message ||
          'No se pudo guardar la medición. Revisa que el backend esté corriendo y el ID de orden exista.',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase block">
            DIAGNÓSTICO DE HARDWARE • VOLTAJE, RAM Y GPU
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight uppercase">
            MEDIDOR DE DISPOSITIVOS
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Registra y evalúa el voltaje/batería, la memoria RAM y la tarjeta gráfica del equipo.
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 transition cursor-pointer"
          >
            ← Volver
          </button>
        )}
      </div>

      {statusMsg.text && (
        <div
          className={`px-4 py-3 rounded-xl text-xs font-medium border ${
            statusMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-700'
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <div className={`border rounded-2xl p-4 text-xs font-semibold ${estadoGeneral.boxClass}`}>
        Estado general del hardware:{' '}
        <span className="font-extrabold">{estadoGeneral.texto}</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              ID de la Orden en MongoDB
            </label>
            <input
              type="text"
              value={ordenId}
              onChange={(e) => setOrdenId(e.target.value)}
              placeholder="Ej. 1042"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Equipo Evaluado
            </label>
            <input
              type="text"
              value={equipoNombre}
              onChange={(e) => setEquipoNombre(e.target.value)}
              placeholder="Ej. Portátil HP / PC Escritorio"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          {/* Voltaje / Batería */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase">Voltaje / Batería</h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${diagnosticoVoltaje.badgeClass}`}
              >
                {diagnosticoVoltaje.estado}
              </span>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Voltaje Medido (V)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="25"
                value={voltajeMedido}
                onChange={(e) => setVoltajeMedido(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Nominal (V)</label>
                <input
                  type="number"
                  step="0.1"
                  value={voltajeNominal}
                  onChange={(e) => setVoltajeNominal(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Tolerancia (±V)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={toleranciaVoltaje}
                  onChange={(e) => setToleranciaVoltaje(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Memoria RAM */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase">Memoria (RAM)</h2>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Estado</label>
              <select
                value={estadoRam}
                onChange={(e) => setEstadoRam(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Operativa">Operativa</option>
                <option value="Degradada">Degradada / Inestable</option>
                <option value="Con fallos">Con fallos</option>
                <option value="No detectada">No detectada</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Observación de prueba
              </label>
              <input
                type="text"
                value={detalleRam}
                onChange={(e) => setDetalleRam(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>

          {/* Tarjeta Gráfica (GPU) */}
          <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-gray-900 uppercase">Tarjeta Gráfica (GPU)</h2>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Estado</label>
              <select
                value={estadoGpu}
                onChange={(e) => setEstadoGpu(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Operativa">Operativa</option>
                <option value="Degradada">Degradada / Temperaturas altas</option>
                <option value="Con fallos">Con fallos / Artefactos</option>
                <option value="No detectada">No detectada</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Observación de prueba
              </label>
              <input
                type="text"
                value={detalleGpu}
                onChange={(e) => setDetalleGpu(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </section>
        </div>

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1">
              Notas del Técnico
            </label>
            <textarea
              rows={3}
              value={notasTecnico}
              onChange={(e) => setNotasTecnico(e.target.value)}
              placeholder="Detalles adicionales de voltaje, batería, RAM o tarjeta gráfica..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white shadow-sm transition cursor-pointer"
            >
              {saving ? 'Guardando medición...' : 'Guardar Medición'}
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}