import React, { useState } from 'react';

export default function ConfiguracionBackupView({ onBack }) {
  const [enableBackup, setEnableBackup] = useState(true);
  const [frecuencia, setFrecuencia] = useState('Diario - 02:00');
  const [tipoBackup, setTipoBackup] = useState('Completo (Semanal) + Diferencial (Diario)');
  const [retencion, setRetencion] = useState('30 Días');

  const [ubicacion, setUbicacion] = useState({
    nasLocal: true,
    awsS3: true,
    encriptacion: true,
  });

  const [notificaciones, setNotificaciones] = useState({
    correoExitoso: true,
    alertaFallo: true,
  });

  const handleUbicacionChange = (key) => {
    setUbicacion(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNotifChange = (key) => {
    setNotificaciones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Botón Volver */}
      <button 
        onClick={onBack} 
        className="text-sm text-blue-600 hover:underline mb-4 flex items-center space-x-1 cursor-pointer font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        <span>Volver al Dashboard</span>
      </button>

      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight uppercase">
          CONFIGURACIÓN AVANZADA DEL SISTEMA - MÓDULO DE BACKUP Y RECUPERACIÓN (PA-10)
        </h1>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Panel Principal (2 Columnas) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Configuración de Copias de Seguridad */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Configuración de Copias de Seguridad
            </h3>

            {/* Políticas de Backup */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Políticas de Backup:</h4>

              <label className="flex items-center space-x-2 text-xs text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableBackup}
                  onChange={() => setEnableBackup(!enableBackup)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Habilitar copias de seguridad automáticas.</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Frecuencia:
                  </label>
                  <select
                    value={frecuencia}
                    onChange={(e) => setFrecuencia(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Diario - 02:00">Diario - 02:00</option>
                    <option value="Cada 12 Horas">Cada 12 Horas</option>
                    <option value="Semanal">Semanal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Tipo de Backup:
                  </label>
                  <select
                    value={tipoBackup}
                    onChange={(e) => setTipoBackup(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="Completo (Semanal) + Diferencial (Diario)">Completo + Diferencial</option>
                    <option value="Solo Completo Diario">Solo Completo Diario</option>
                    <option value="Incremental Continuo">Incremental Continuo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Retención de Backups:
                  </label>
                  <select
                    value={retencion}
                    onChange={(e) => setRetencion(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  >
                    <option value="15 Días">15 Días</option>
                    <option value="30 Días">30 Días</option>
                    <option value="90 Días">90 Días</option>
                    <option value="1 Año">1 Año</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ubicación de Almacenamiento */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Ubicación de Almacenamiento:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ubicacion.nasLocal}
                    onChange={() => handleUbicacionChange('nasLocal')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Servidor Local (NAS Principal)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ubicacion.awsS3}
                    onChange={() => handleUbicacionChange('awsS3')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Almacenamiento en la Nube (AWS S3 - Configurado)</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ubicacion.encriptacion}
                    onChange={() => handleUbicacionChange('encriptacion')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Encriptación de Backups (AES-256)</span>
                </label>
              </div>
            </div>

            {/* Alertas y Notificaciones */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800">Alertas y Notificaciones:</h4>
              <div className="space-y-2 text-xs text-gray-700">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificaciones.correoExitoso}
                    onChange={() => handleNotifChange('correoExitoso')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enviar notificación por correo al completar el backup.</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificaciones.alertaFallo}
                    onChange={() => handleNotifChange('alertaFallo')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enviar alerta crítica si el backup falla.</span>
                </label>
              </div>
            </div>
          </div>

          {/* Card 2: Restauración del Sistema */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Restauración del Sistema
            </h3>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800">Puntos de Restauración Disponibles:</h4>

              <div className="space-y-2 text-xs text-gray-800 font-medium">
                <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="restauracion" className="text-blue-600 focus:ring-blue-500" />
                    <span>10/09/2024 02:00 (Completo)</span>
                  </div>
                  <button className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded text-[11px] font-semibold transition cursor-pointer">
                    [Restaurar]
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="restauracion" className="text-blue-600 focus:ring-blue-500" />
                    <span>09/09/2024 02:00 (Diferencial)</span>
                  </div>
                  <button className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 px-3 py-1 rounded text-[11px] font-semibold transition cursor-pointer">
                    [Restaurar]
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer">
                  [Botón: Ver Historial de Restauraciones]
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Paneles Laterales de Resumen (1 Columna) */}
        <div className="space-y-6">
          
          {/* Resumen de Backups PA-10 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Resumen de Backups PA-10:
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-gray-500 font-medium block">Último Backup Exitoso:</span>
                <span className="font-bold text-gray-900 text-xs mt-0.5 block">[10/09/2024 02:00]</span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block mb-0.5">Estado Actual:</span>
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                  <span>🟢</span>
                  <span>Protegido</span>
                </span>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium block">Espacio Ocupado (Nube):</span>
                <span className="font-bold text-gray-900 text-sm mt-0.5 block">[15.4 GB]</span>
              </div>
            </div>
          </div>

          {/* Historial de Tareas (Ejemplos) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 text-base border-b border-gray-100 pb-3">
              Historial de Tareas (Ejemplos):
            </h3>

            <div className="space-y-3 text-xs font-medium text-gray-800">
              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Info] Backup Diario Exitoso</p>
                <p className="text-gray-600 text-[11px]">10/09/2024 02:00</p>
              </div>

              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Info] Backup Diferencial Exitoso</p>
                <p className="text-gray-600 text-[11px]">09/09/2024 02:00</p>
              </div>

              <div className="p-2.5 bg-gray-50 border border-gray-100 rounded-lg space-y-0.5">
                <p className="font-bold text-gray-900">[Info] Verificación de Integridad</p>
                <p className="text-gray-600 text-[11px]">08/09/2024 03:00</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Botones de Acción Inferiores */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            PF-25: GUARDAR CONFIGURACIÓN PA-10
          </button>
          <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
            RESTAURAR VALORES PREDETERMINADOS (PA-10)
          </button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition shadow-sm cursor-pointer">
          FORZAR COPIA DE SEGURIDAD AHORA
        </button>
      </div>
    </main>
  );
}