import React, { useState } from 'react';
import NuevaOrdenView from './views/NuevaOrdenView';
import FichaTecnicaView from './views/FichaTecnicaView';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginView from './views/LoginView';
import RecuperarPasswordView from './views/RecuperarPasswordView';
import ConfirmacionRecuperacionView from './views/ConfirmacionRecuperacionView';
import ResetPasswordView from './views/ResetPasswordView';
import ConfirmacionCambioPasswordView from './views/ConfirmacionCambioPasswordView';
import DashboardView from './views/DashboardView';
import OrdenesView from './views/OrdenesView';
import DiagnosticoInteractivoView from './views/DiagnosticoInteractivoView';
import DetalleOrdenView from './views/DetalleOrdenView';
import DiagnosticoView from './views/DiagnosticoView';
import GestionAsignacionView from './views/GestionAsignacionView';
import ConfirmacionView from './views/ConfirmacionView';
import HistorialClienteView from './views/HistorialClienteView';
import AsignarRepuestoView from './views/AsignarRepuestoView';
import ConfirmacionRepuestosView from './views/ConfirmacionRepuestosView';
import CierreOrdenView from './views/CierreOrdenView';
import ConfirmacionCierreView from './views/ConfirmacionCierreView';
import InventarioView from './views/InventarioView';
import PerfilUsuarioView from './views/PerfilUsuarioView';
import GestionUsuariosView from './views/GestionUsuariosView';
import ConfiguracionGlobalView from './views/ConfiguracionGlobalView';
import RegistroAuditoriaView from './views/RegistroAuditoriaView';
import SoporteAyudaView from './views/SoporteAyudaView';
import GestionGarantiasView from './views/GestionGarantiasView';
import PanelSeguridadView from './views/PanelSeguridadView';
import CentroAnaliticaView from './views/CentroAnaliticaView';
import CentroAyudaView from './views/CentroAyudaView';
import ConfiguracionServicioView from './views/ConfiguracionServicioView';
import ConfiguracionRecursosTecnicosView from './views/ConfiguracionRecursosTecnicosView';
import ConfiguracionInventarioView from './views/ConfiguracionInventarioView';
import ConfiguracionGarantiasView from './views/ConfiguracionGarantiasView';
import ConfiguracionCalidadView from './views/ConfiguracionCalidadView';
import ConfiguracionSeguridadAccesoView from './views/ConfiguracionSeguridadAccesoView';
import ConfiguracionIntegracionesView from './views/ConfiguracionIntegracionesView';
import ConfiguracionAuditoriaCumplimientoView from './views/ConfiguracionAuditoriaCumplimientoView';
import ConfiguracionComunicacionesView from './views/ConfiguracionComunicacionesView';
import ConfiguracionBackupView from './views/ConfiguracionBackupView';
import ConfiguracionTallerView from './views/ConfiguracionTallerView';
import ConfiguracionCatalogosView from './views/ConfiguracionCatalogosView';
import ConfiguracionRolesPermisosView from './views/ConfiguracionRolesPermisosView';
import ConfiguracionGarantiasSLAView from './views/ConfiguracionGarantiasSLAView';
import ConfiguracionCalidadQAView from './views/ConfiguracionCalidadQAView';
import ConfiguracionSeguridadAvanzadaView from './views/ConfiguracionSeguridadAvanzadaView';
import ConfiguracionIntegracionesExportacionView from './views/ConfiguracionIntegracionesExportacionView';
import ConfiguracionMensajesExportacionView from './views/ConfiguracionMensajesExportacionView';
import ConfiguracionComunicacionesNotificacionesView from './views/ConfiguracionComunicacionesNotificacionesView';
import { mockUser } from './data/userData';


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentView, setCurrentView] = useState('main'); 
  const [cancelMessage, setCancelMessage] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentView('main');
    setCancelMessage(false);
  };

  const handleLogout = () => {
    // Si guardas datos de sesión en localStorage, límpialos aquí:
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    
    // Cambia el estado de autenticación para que renderice el LoginView
    setIsAuthenticated(false);
    
    // Opcional: Reinicia la pestaña activa al dashboard para cuando vuelvas a entrar
    setActiveTab('dashboard');
  };


  const handleCancelNewOrder = () => {
    setCurrentView('main');
    setCancelMessage(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between font-sans text-gray-800">
      <div>
        
        <Navbar 
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        user={mockUser}
        onNavigate={(tab) => {
        setActiveTab(tab);
        setCurrentView('main');
        }} 
      onLogout={handleLogout}
      onOpenProfile={() => {
      setActiveTab('perfil');
       setCurrentView('main');
      }} 
      />

        {!isAuthenticated ? (
          <>
            {authView === 'login' && (
              <LoginView 
                onLoginSuccess={() => setIsAuthenticated(true)} 
                onForgotPassword={() => setAuthView('forgot')}
              />
            )}
            {authView === 'forgot' && (
              <RecuperarPasswordView 
                onBackToLogin={() => setAuthView('login')}
                onSendSuccess={() => setAuthView('confirmRecovery')}
              />
            )}
            {authView === 'confirmRecovery' && (
              <ConfirmacionRecuperacionView 
                onBackToLogin={() => setAuthView('resetPassword')}
              />
            )}
            {authView === 'resetPassword' && (
              <ResetPasswordView 
                onBackToLogin={() => setAuthView('login')}
                onSuccess={() => setAuthView('confirmChange')}
              />
            )}
            {authView === 'confirmChange' && (
              <ConfirmacionCambioPasswordView 
                onBackToLogin={() => setAuthView('login')}
                onForgotPassword={() => setAuthView('forgot')}
              />
            )}
          </>
        ) : (
          <>
            {activeTab === 'dashboard' && <DashboardView />}
            
            {activeTab === 'ordenes' && currentView === 'main' && (
              <OrdenesView 
                onViewDetail={() => { setCurrentView('detalle'); setCancelMessage(false); }} 
                onNewOrder={() => { setCurrentView('nueva'); setCancelMessage(false); }}
                cancelMessage={cancelMessage}
                onDismissMessage={() => setCancelMessage(false)}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'nueva' && (
              <NuevaOrdenView 
                onBack={handleCancelNewOrder} 
                onSaveSuccess={() => setCurrentView('confirmacion')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'confirmacion' && (
              <ConfirmacionView 
                onGoToOrders={() => setCurrentView('main')}
                onCreateAnother={() => setCurrentView('nueva')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'detalle' && (
              <DetalleOrdenView 
                onBack={() => setCurrentView('main')} 
                onOpenDiagnostico={() => setCurrentView('diagnostico')}
                onOpenGestionarRepuestos={() => setCurrentView('asignarRepuesto')}
                onRegistrarCierre={() => setCurrentView('cierre')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'cierre' && (
              <CierreOrdenView 
                onBack={() => setCurrentView('detalle')} 
                onGenerarFactura={() => setCurrentView('confirmacionCierre')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'confirmacionCierre' && (
              <ConfirmacionCierreView 
                onGoToOrders={() => setCurrentView('main')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'diagnostico' && (
              <DiagnosticoView 
                onBack={() => setCurrentView('detalle')} 
                onOpenHistorial={() => setCurrentView('historial')}
                onOpenAsignarRepuesto={() => setCurrentView('asignarRepuesto')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'historial' && (
              <HistorialClienteView onBack={() => setCurrentView('diagnostico')} />
            )}

            {activeTab === 'ordenes' && currentView === 'asignarRepuesto' && (
              <AsignarRepuestoView 
                onBack={() => setCurrentView('diagnostico')} 
                onConfirmSuccess={() => setCurrentView('confirmacionRepuestos')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'confirmacionRepuestos' && (
              <ConfirmacionRepuestosView 
                onGoToDetail={() => setCurrentView('detalle')} 
                onAssignMore={() => setCurrentView('asignarRepuesto')}
              />
            )}

            {activeTab === 'inventario' && <InventarioView />}

            {activeTab === 'perfil' && (
              <PerfilUsuarioView 
                user={mockUser} 
                onBack={() => setActiveTab('dashboard')} 
              />
            )}

            {activeTab === 'usuarios' && (
              <GestionUsuariosView onBack={() => setActiveTab('dashboard')} />
            )}

            {activeTab === 'configuracion' && (
              <ConfiguracionGlobalView onBack={() => setActiveTab('dashboard')} />
            )}

            {activeTab === 'auditoria' && (
              <RegistroAuditoriaView onBack={() => setActiveTab('dashboard')} />
            )}

            {activeTab === 'soporte' && (
              <SoporteAyudaView onBack={() => setActiveTab('dashboard')} />
            )}

            {activeTab === 'ordenes' && currentView === 'fichaTecnica' && (
          <FichaTecnicaView 
          onBack={() => setCurrentView('detalle')} 
          onSolicitarRepuestos={() => setCurrentView('asignarRepuesto')}
          />
            )}

            {activeTab === 'ordenes' && currentView === 'asignacion' && (
           <GestionAsignacionView 
            onBack={() => setCurrentView('main')} 
            onViewDetail={() => setCurrentView('detalle')}
            />
            )}

            {activeTab === 'ordenes' && currentView === 'diagnosticoInteractivo' && (
             <DiagnosticoInteractivoView 
            onBack={() => setCurrentView('detalle')}
            onRegistrarResultado={() => setCurrentView('diagnostico')}
            />
              )}

              {activeTab === 'garantias' && (
              <GestionGarantiasView 
              onBack={() => setActiveTab('dashboard')} 
              onViewDetail={() => { setActiveTab('ordenes'); setCurrentView('detalle'); }}
            />
              )}

              {activeTab === 'seguridad' && (
              <PanelSeguridadView onBack={() => setActiveTab('dashboard')} /> 
              )}

              {activeTab === 'analitica' && (
              <CentroAnaliticaView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'soporteAyuda' && (
              <CentroAyudaView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionServicio' && (
              <ConfiguracionServicioView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionTecnica' && (
              <ConfiguracionRecursosTecnicosView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionInventario' && (
              <ConfiguracionInventarioView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionGarantias' && (
               <ConfiguracionGarantiasView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionCalidad' && (
              <ConfiguracionCalidadView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionSeguridadAcceso' && (
              <ConfiguracionSeguridadAccesoView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionIntegraciones' && (
              <ConfiguracionIntegracionesView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionAuditoriaCumplimiento' && (
              <ConfiguracionAuditoriaCumplimientoView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionComunicaciones' && (
              <ConfiguracionComunicacionesView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionBackup' && (
              <ConfiguracionBackupView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionTaller' && (
              <ConfiguracionTallerView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionCatalogos' && (
              <ConfiguracionCatalogosView onBack={() => setActiveTab('dashboard')} /> 
              )}

              {activeTab === 'configuracionRolesPermisos' && (
              <ConfiguracionRolesPermisosView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionGarantiasSLA' && (
              <ConfiguracionGarantiasSLAView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionCalidadQA' && (
              <ConfiguracionCalidadQAView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionSeguridadAvanzada' && (
             <ConfiguracionSeguridadAvanzadaView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionIntegracionesExportacion' && (
            <ConfiguracionIntegracionesExportacionView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionMensajesExportacion' && (
             <ConfiguracionMensajesExportacionView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionComunicacionesNotificaciones' && (
             <ConfiguracionComunicacionesNotificacionesView onBack={() => setActiveTab('dashboard')} />
              )}

              {activeTab === 'configuracionBackupRecuperacion' && (
              <ConfiguracionBackupRecuperacionView onBack={() => setActiveTab('dashboard')} />
              )}


          </>
        )}
      </div>
      <Footer />
    </div>
  );
}