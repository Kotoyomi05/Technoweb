import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';

function quitarCargoSiExiste(nombreRaw = '') {
  const texto = String(nombreRaw || '').trim();
  if (!texto) return 'Usuario';
  const sinParentesis = texto.replace(/\s*\([^)]*\)\s*$/, '').trim();
  const partesGuion = sinParentesis.split(/\s+[-–—|]\s+/);
  return partesGuion[0]?.trim() || 'Usuario';
}

function leerArchivoComoDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        nombre: file.name,
        tipo: file.type || 'application/octet-stream',
        tamano: file.size,
        dataUrl: reader.result,
        url: reader.result,
      });
    };
    reader.onerror = () => reject(new Error(`No se pudo leer el archivo ${file.name}`));
    reader.readAsDataURL(file);
  });
}

function formatearTamano(bytes = 0) {
  if (!bytes) return '0 KB';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DiagnosticoView({
  orden,
  currentUser,
  onSaveDiagnostico,
  onBack,
}) {
  const ordenData = orden || {};
  const idOrdenDisplay = ordenData.idOrden || ordenData._id || '—';
  const estadoActualBadge = ordenData.estado || 'EN PROCESO - Diagnóstico';
  const clienteDisplay = ordenData.cliente || ordenData.nombreCliente || 'Cliente no especificado';

  const partesEquipo = [ordenData.tipoEquipo, ordenData.marca, ordenData.modelo].filter(Boolean);
  const equipoDisplay =
    partesEquipo.length > 0 ? partesEquipo.join(' ') : 'Equipo no especificado';

  const [formData, setFormData] = useState({
    detalleDiagnostico: '',
    estadoActualizado: 'En Proceso',
    proximosPasos: '',
    adjuntos: [],
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const estadoLower = String(ordenData.estado || '').toLowerCase();
    let estadoInicialSelect = 'En Proceso';
    if (estadoLower.includes('aprob')) {
      estadoInicialSelect = 'Pendiente de Aprobación';
    } else if (estadoLower.includes('repuest')) {
      estadoInicialSelect = 'Esperando Repuestos';
    } else if (estadoLower.includes('inconveniente')) {
      estadoInicialSelect = 'Ha surgido un inconveniente';
    } else if (estadoLower.includes('finaliz')) {
      estadoInicialSelect = 'Finalizado';
    }

    setFormData((prev) => ({
      ...prev,
      estadoActualizado: estadoInicialSelect,
    }));
  }, [ordenData._id, ordenData.idOrden, ordenData.estado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMsg('');
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const filesList = Array.from(e.target.files || []);
    if (filesList.length === 0) return;

    setErrorMsg('');
    try {
      const archivosLeidos = await Promise.all(filesList.map(leerArchivoComoDataUrl));
      setFormData((prev) => ({
        ...prev,
        adjuntos: [...prev.adjuntos, ...archivosLeidos],
      }));
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error al procesar los archivos adjuntos.');
    } finally {
      e.target.value = '';
    }
  };

  const handleRemoveAdjunto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      adjuntos: prev.adjuntos.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg('');

    const detalleLimpio = formData.detalleDiagnostico.trim();
    const proximosLimpios = formData.proximosPasos.trim();

    if (!detalleLimpio && !proximosLimpios && formData.adjuntos.length === 0) {
      setErrorMsg(
        'Ingresa el detalle del diagnóstico técnico, los próximos pasos o adjunta un archivo antes de guardar.'
      );
      return;
    }

    setSubmitting(true);

    const responsableSinCargo = quitarCargoSiExiste(
      currentUser?.nombre || ordenData.tecnicoAsignado || 'Usuario'
    );

    const adjuntosPrevios = Array.isArray(ordenData.adjuntos) ? ordenData.adjuntos : [];
    const adjuntosCombinados = [...adjuntosPrevios, ...formData.adjuntos];
    const ultimoAdjunto =
      formData.adjuntos[formData.adjuntos.length - 1] ||
      ordenData.imagenDiagnostico ||
      ordenData.adjuntoDiagnostico ||
      adjuntosCombinados[adjuntosCombinados.length - 1] ||
      null;

    const detalleFinal =
      detalleLimpio || ordenData.detalleDiagnostico || ordenData.notaTecnica || '';
    const proximosFinales = proximosLimpios || ordenData.proximosPasos || '';

    const nuevoPasoSeguimiento = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      titulo: `Avance / Diagnóstico (${formData.estadoActualizado})`,
      accion: `Avance / Diagnóstico (${formData.estadoActualizado})`,
      responsable: responsableSinCargo,
      notaTecnica: detalleFinal,
      proximosPasos: proximosFinales,
      adjuntos: formData.adjuntos,
    };

    const seguimientoActualizado = [
      ...(Array.isArray(ordenData.seguimiento) ? ordenData.seguimiento : []),
      nuevoPasoSeguimiento,
    ];

    const payloadActualizacion = {
      estado: formData.estadoActualizado,
      detalleDiagnostico: detalleFinal,
      notaTecnica: detalleFinal,
      proximosPasos: proximosFinales,
      adjuntos: adjuntosCombinados,
      ...(ultimoAdjunto
        ? {
            imagenDiagnostico: ultimoAdjunto,
            adjuntoDiagnostico: ultimoAdjunto,
          }
        : {}),
      seguimiento: seguimientoActualizado,
    };

    const ordenId = ordenData._id || ordenData.idOrden;
    let docFinal = {
      ...ordenData,
      ...payloadActualizacion,
    };

    if (ordenId) {
      try {
        const res = await fetch(`${API_URL}/ordenes/${ordenId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadActualizacion),
        });
        if (res.ok) {
          const data = await res.json().catch(() => null);
          const servidorDoc = data?.orden || data;
          if (servidorDoc && typeof servidorDoc === 'object') {
            docFinal = {
              ...docFinal,
              ...servidorDoc,
              estado: servidorDoc.estado || payloadActualizacion.estado,
              detalleDiagnostico:
                servidorDoc.detalleDiagnostico || payloadActualizacion.detalleDiagnostico,
              proximosPasos: servidorDoc.proximosPasos || payloadActualizacion.proximosPasos,
              imagenDiagnostico:
                servidorDoc.imagenDiagnostico || payloadActualizacion.imagenDiagnostico || null,
              adjuntoDiagnostico:
                servidorDoc.adjuntoDiagnostico || payloadActualizacion.adjuntoDiagnostico || null,
              seguimiento:
                Array.isArray(servidorDoc.seguimiento) && servidorDoc.seguimiento.length > 0
                  ? servidorDoc.seguimiento
                  : seguimientoActualizado,
            };
          }
        }
      } catch {
        // Si el backend no tiene aún este PATCH, se conserva la actualización en el estado
      }
    }

    setSubmitting(false);

    if (onSaveDiagnostico) {
      onSaveDiagnostico(docFinal, nuevoPasoSeguimiento);
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      {/* Encabezado Principal */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight uppercase">
          REGISTRO DE DIAGNÓSTICO Y AVANCE DE ORDEN
        </h1>
      </div>

      {/* Tarjeta del Formulario */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        {/* Título de la sección y estado */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Actualización de Orden #{idOrdenDisplay}
          </h2>
          <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-medium self-start sm:self-auto">
            {estadoActualBadge}
          </span>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECCIÓN 1: INFORMACIÓN BÁSICA (NO EDITABLE) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Información Básica (No editable):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={clienteDisplay}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Equipo</label>
                <input
                  type="text"
                  readOnly
                  disabled
                  value={equipoDisplay}
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-xs font-medium text-gray-800 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: FORMULARIO DE AVANCE */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Formulario de Avance:
            </h3>

            {/* Detalle del Diagnóstico Técnico */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Detalle del Diagnóstico Técnico
              </label>
              <textarea
                name="detalleDiagnostico"
                rows="3"
                value={formData.detalleDiagnostico}
                onChange={handleChange}
                placeholder="Describa detalladamente los hallazgos técnicos...&#10;Ejemplo: Se desarma el equipo y se encuentra corto circuito en la etapa de alimentación de la placa madre..."
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              ></textarea>
            </div>

            {/* Estado Actualizado de la Orden */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Estado Actualizado de la Orden
              </label>
              <select
                name="estadoActualizado"
                value={formData.estadoActualizado}
                onChange={handleChange}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                <option value="En Proceso">En Proceso</option>
                <option value="Pendiente de Aprobación">Pendiente de Aprobación</option>
                <option value="Esperando Repuestos">Esperando Repuestos</option>
                <option value="Ha surgido un inconveniente">Ha surgido un inconveniente</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </div>

            {/* Próximos Pasos / Acciones a Seguir */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Próximos Pasos / Acciones a Seguir
              </label>
              <textarea
                name="proximosPasos"
                rows="2"
                value={formData.proximosPasos}
                onChange={handleChange}
                placeholder="Indique las siguientes acciones...&#10;Ejemplo: Solicitar cotización de repuestos al cliente..."
                className="w-full bg-white border border-gray-300 rounded-lg p-3 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              ></textarea>
            </div>

            {/* Adjuntos (Opcional) */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Adjuntos (Opcional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-12 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      ></path>
                    </svg>
                    <span className="text-xs font-semibold">
                      Subir Imagen/Documento de Diagnóstico
                    </span>
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {formData.adjuntos.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-xs">
                  {formData.adjuntos.map((file, index) => (
                    <li
                      key={`${file.nombre}-${index}`}
                      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5"
                    >
                      <span className="text-gray-800 font-medium truncate">
                        {file.nombre}{' '}
                        <span className="text-gray-500 font-normal">
                          ({formatearTamano(file.tamano)})
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAdjunto(index)}
                        className="text-rose-600 hover:underline font-semibold ml-3 cursor-pointer"
                      >
                        Quitar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* SECCIÓN 3: BOTONES DE ACCIÓN */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              {submitting
                ? 'Guardando...'
                : 'PF-04: GUARDAR DIAGNÓSTICO Y ACTUALIZAR ORDEN'}
            </button>
            <button
              type="button"
              onClick={onBack}
              className="w-full sm:w-auto bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
            >
              CANCELAR Y VOLVER
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}