import React, { useState, useEffect, useMemo } from 'react';
import NuevaOrdenView from './views/NuevaOrdenView';
import FichaTecnicaView from './views/FichaTecnicaView';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PortalSeguimientoClienteView from './components/PortalSeguimientoClienteView';
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
import SolicitudCompraView from './views/SolicitudCompraView';
import AgregarStockView from './views/AgregarStockView';
import HistorialPedidosView from './views/HistorialPedidosView';
import PerfilUsuarioView from './views/PerfilUsuarioView';
import GestionUsuariosView from './views/GestionUsuariosView';
import ConfiguracionGlobalView from './views/ConfiguracionGlobalView';
import RegistroAuditoriaView from './views/RegistroAuditoriaView';
import ConfiguracionBackupRecuperacionView from './views/ConfiguracionBackupRecuperacionView';
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
import ConfiguracionBackupRecuperacionViewAlias from './views/ConfiguracionBackupRecuperacionView';
import MedidorDispositivosView from './views/MedidorDispositivosView';
import { mockUser, usersList } from './data/userData';

const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:4000/api';
const ACCESS_REQUESTS_STORAGE_KEY = 'techservice_access_requests';
const USERS_STORAGE_KEY = 'techservice_users_list';
const AUTH_STORAGE_KEY = 'techservice_is_authenticated';
const ORDENES_STORAGE_KEY = 'techservice_ordenes';
const INVENTARIO_STORAGE_KEY = 'techservice_inventario';
const SOLICITUDES_COMPRA_STORAGE_KEY = 'techservice_solicitudes_compra';
const ENTRADAS_STOCK_STORAGE_KEY = 'techservice_entradas_stock';
const DEFAULT_USER_PASSWORD = 'techno123';
const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256';
const TABS_RESTRINGIDOS_CLIENTE = ['inventario', 'usuarios', 'medidor', 'configuracion'];

const ORDENES_INICIALES_DEMO = [
  {
    idOrden: '1041',
    cliente: 'Cliente Demo',
    nombreCliente: 'Cliente Demo',
    correoCliente: 'cliente@techserviceweb.com',
    telefonoCliente: '(555) 987-6543',
    ubicacionCliente: 'Calle 10 # 5-20',
    direccionCliente: 'Calle 10 # 5-20',
    tipoEquipo: 'Laptop',
    marca: 'Lenovo',
    modelo: 'ThinkPad T14',
    numeroSerie: 'LN-T14-8821',
    descripcionFalla: 'No enciende ni carga la batería con el cargador original.',
    observaciones: 'Incluye cargador USB-C 65W.',
    estado: 'EN PROCESO - Ingresado',
    cerrada: false,
    entregado: false,
    tecnicoAsignado: '',
    fechaCreacion: '2026-11-26T08:00:00.000Z',
    createdAt: '2026-11-26T08:00:00.000Z',
  },
  {
    idOrden: '1042',
    cliente: 'Valeria Gómez',
    nombreCliente: 'Valeria Gómez',
    correoCliente: 'ladie7854@gmail.com',
    telefonoCliente: '(555) 987-6543',
    ubicacionCliente: 'Carrera 15 # 12-40',
    direccionCliente: 'Carrera 15 # 12-40',
    tipoEquipo: 'PC de Escritorio',
    marca: 'ASUS',
    modelo: 'Prime B550M-A',
    numeroSerie: 'AS-B550-4410',
    descripcionFalla: 'Reinicios aleatorios bajo carga y temperatura elevada en CPU.',
    observaciones: 'Solo torre, sin monitor ni periféricos.',
    estado: 'EN PROCESO - Ingresado',
    cerrada: false,
    entregado: false,
    tecnicoAsignado: '',
    fechaCreacion: '2026-11-26T08:05:00.000Z',
    createdAt: '2026-11-26T08:05:00.000Z',
  },
];

function normalizarTexto(valor = '') {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function esRolCliente(usuario) {
  return normalizarTexto(usuario?.rol).includes('client');
}

function leerOrdenIdDesdeUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const porQuery = params.get('orden') || params.get('id') || params.get('order') || params.get('portal');
    if (porQuery) return String(porQuery).trim();

    const hash = String(window.location.hash || '');
    const matchHash = hash.match(/portal\/([^/?#]+)/i);
    if (matchHash?.[1]) return decodeURIComponent(matchHash[1]).trim();
  } catch {
    // Ignorar errores de URL
  }
  return '';
}

function limpiarParametroOrdenEnUrl() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.delete('orden');
    url.searchParams.delete('id');
    url.searchParams.delete('order');
    url.searchParams.delete('portal');
    window.history.replaceState({}, '', url.toString());
  } catch {
    // Ignorar errores de history
  }
}

function puedeAccederAOrden(orden, usuario) {
  if (!orden) return false;
  const rol = normalizarTexto(usuario?.rol);
  if (!rol || rol.includes('admin')) return true;

  if (rol.includes('tecn')) {
    const miNombre = normalizarTexto(usuario?.nombre);
    const asignado = normalizarTexto(orden?.tecnicoAsignado);
    return Boolean(miNombre) && asignado === miNombre;
  }

  if (rol.includes('client')) {
    const miCorreo = normalizarTexto(usuario?.email);
    const miNombre = normalizarTexto(usuario?.nombre);
    const correoOrden = normalizarTexto(
      orden?.correoCliente || orden?.emailCliente || orden?.correo
    );
    const clienteOrden = normalizarTexto(orden?.cliente || orden?.nombreCliente);
    return (
      (Boolean(miCorreo) && correoOrden === miCorreo) ||
      (Boolean(miNombre) && clienteOrden === miNombre)
    );
  }

  return false;
}

function loadInitialUsers() {
  try {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Si hay error de lectura, usar mock inicial
  }
  return usersList;
}

function asegurarClientesDesdeOrdenes(listaOrdenes = [], listaUsuarios = []) {
  const mapa = new Map();

  (Array.isArray(listaUsuarios) ? listaUsuarios : []).forEach((u, idx) => {
    const key = String(u?.email || u?.id || `u-${idx}`).trim().toLowerCase();
    if (key) mapa.set(key, u);
  });

  (Array.isArray(listaOrdenes) ? listaOrdenes : []).forEach((ord, idx) => {
    const nombre = String(ord?.cliente || ord?.nombreCliente || '').trim();
    const correoRaw = String(
      ord?.correoCliente || ord?.emailCliente || ord?.correo || ''
    )
      .trim()
      .toLowerCase();

    if (!nombre && !correoRaw) return;

    const slug = normalizarTexto(nombre || `cliente-${idx}`).replace(/[^a-z0-9]+/g, '.');
    const correo = correoRaw || `${slug || 'cliente'}.${ord?.idOrden || idx}@cliente.local`;

    const yaExiste = Array.from(mapa.values()).some((u) => {
      const uMail = String(u?.email || '').trim().toLowerCase();
      const uNom = normalizarTexto(u?.nombre);
      return (correoRaw && uMail === correoRaw) || (nombre && uNom === normalizarTexto(nombre));
    });

    if (!yaExiste) {
      mapa.set(correo, {
        id: `cli-ord-${ord?._id || ord?.idOrden || idx + 1}`,
        nombre: nombre || correo,
        email: correo,
        password: DEFAULT_USER_PASSWORD,
        rol: 'Cliente',
        telefono: ord?.telefonoCliente || ord?.telefono || 'No registrado',
        direccion:
          ord?.ubicacionCliente || ord?.direccionCliente || ord?.direccion || 'No registrada',
        ubicacion:
          ord?.ubicacionCliente || ord?.direccionCliente || ord?.direccion || 'No registrada',
        avatar: DEFAULT_AVATAR,
      });
    }
  });

  return Array.from(mapa.values());
}

function cargarUsuariosConClientes() {
  const baseUsers = loadInitialUsers();
  const mapa = new Map();

  (Array.isArray(baseUsers) ? baseUsers : []).forEach((u, idx) => {
    const key = String(u?.email || u?.id || idx).trim().toLowerCase();
    if (key) mapa.set(key, u);
  });

  (Array.isArray(usersList) ? usersList : []).forEach((u, idx) => {
    const key = String(u?.email || u?.id || `base-${idx}`).trim().toLowerCase();
    if (key && !mapa.has(key)) {
      mapa.set(key, u);
    }
  });

  return asegurarClientesDesdeOrdenes(ORDENES_INICIALES_DEMO, Array.from(mapa.values()));
}

function loadSavedSessionUser() {
  try {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed && (parsed.email || parsed.nombre)) {
        return parsed;
      }
    }
  } catch {
    // Ignorar errores de lectura en localStorage
  }
  return mockUser;
}

function loadSavedAuthState() {
  try {
    const flag = localStorage.getItem(AUTH_STORAGE_KEY);
    const savedUser = localStorage.getItem('userData');
    return flag === 'true' && Boolean(savedUser);
  } catch {
    return false;
  }
}

function getOrdenKey(o) {
  return String(o?._id || o?.idOrden || o?.id || '');
}

function fusionarOrdenes(locales = [], remotas = []) {
  const mapa = new Map();

  (Array.isArray(locales) ? locales : []).forEach((o) => {
    const k = getOrdenKey(o);
    if (k) mapa.set(k, o);
  });

  (Array.isArray(remotas) ? remotas : []).forEach((o) => {
    const k = getOrdenKey(o);
    if (!k) return;
    const previa = mapa.get(k);
    const yaCerradaLocal = previa?.cerrada === true || previa?.entregado === true;
    const tecnicoPrevio = String(previa?.tecnicoAsignado || '').trim();
    const tecnicoRemoto = String(o?.tecnicoAsignado || '').trim();
    const tieneTecnicoRemoto =
      Boolean(tecnicoRemoto) &&
      tecnicoRemoto.toLowerCase() !== '[sin asignar]' &&
      tecnicoRemoto.toLowerCase() !== 'sin asignar';

    mapa.set(k, {
      ...previa,
      ...o,
      estado: yaCerradaLocal ? previa.estado : o.estado || previa?.estado,
      estadoFinal: yaCerradaLocal
        ? previa.estadoFinal || previa.estado
        : o.estadoFinal || previa?.estadoFinal,
      cerrada: yaCerradaLocal ? true : Boolean(o.cerrada),
      entregado: yaCerradaLocal ? true : Boolean(o.entregado || o.cerrada),
      mesaTrabajo: o?.mesaTrabajo || previa?.mesaTrabajo || null,
      fechaSalida: o?.fechaSalida || previa?.fechaSalida || null,
      tecnicoAsignado: tieneTecnicoRemoto ? tecnicoRemoto : tecnicoPrevio || o.tecnicoAsignado || '',
    });
  });

  return Array.from(mapa.values());
}

function cargarOrdenesIniciales() {
  try {
    const saved = localStorage.getItem(ORDENES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return fusionarOrdenes(parsed, ORDENES_INICIALES_DEMO);
      }
    }
  } catch {
    // Si falla localStorage, usar órdenes iniciales
  }
  return ORDENES_INICIALES_DEMO;
}

export default function App() {
  const [portalOrdenId, setPortalOrdenId] = useState(leerOrdenIdDesdeUrl);
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    leerOrdenIdDesdeUrl() ? true : loadSavedAuthState()
  );
  const [users, setUsers] = useState(cargarUsuariosConClientes);
  const [currentUser, setCurrentUser] = useState(loadSavedSessionUser);
  const [ordenes, setOrdenes] = useState(cargarOrdenesIniciales);
  const [inventario, setInventario] = useState(() => {
    try {
      const saved = localStorage.getItem(INVENTARIO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [solicitudesCompra, setSolicitudesCompra] = useState(() => {
    try {
      const saved = localStorage.getItem(SOLICITUDES_COMPRA_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [entradasStock, setEntradasStock] = useState(() => {
    try {
      const saved = localStorage.getItem(ENTRADAS_STOCK_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedInventoryItem, setSelectedInventoryItem] = useState(null);
  const [ultimosRepuestosAsignados, setUltimosRepuestosAsignados] = useState([]);
  const [accessRequests, setAccessRequests] = useState(() => {
    try {
      const saved = localStorage.getItem(ACCESS_REQUESTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [authView, setAuthView] = useState('login');
  const [activeTab, setActiveTab] = useState(() =>
    leerOrdenIdDesdeUrl() ? 'portalCliente' : 'dashboard'
  );
  const [currentView, setCurrentView] = useState('main');
  const [cancelMessage, setCancelMessage] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordenPortalActual = useMemo(() => {
    if (!portalOrdenId) return null;
    const target = normalizarTexto(portalOrdenId);
    return (
      ordenes.find(
        (o) =>
          normalizarTexto(o?.idOrden) === target ||
          normalizarTexto(o?._id) === target ||
          normalizarTexto(o?.id) === target
      ) || null
    );
  }, [portalOrdenId, ordenes]);

  const portalUsuarioInvitado = useMemo(() => {
    if (!portalOrdenId) return null;
    return {
      id: `portal-${portalOrdenId}`,
      nombre: ordenPortalActual?.cliente || ordenPortalActual?.nombreCliente || 'Cliente',
      email: ordenPortalActual?.correoCliente || '',
      rol: 'Cliente',
      avatar: DEFAULT_AVATAR,
    };
  }, [portalOrdenId, ordenPortalActual]);

  const activeUser = portalUsuarioInvitado
    ? portalUsuarioInvitado
    : isAuthenticated && currentUser?.email
    ? users.find(
        (u) => (u.email || '').toLowerCase() === (currentUser.email || '').toLowerCase()
      ) || currentUser
    : currentUser;

  useEffect(() => {
    const handleUrlChange = () => {
      const idEnUrl = leerOrdenIdDesdeUrl();
      setPortalOrdenId(idEnUrl);
      if (idEnUrl) {
        setIsAuthenticated(true);
        setActiveTab('portalCliente');
        setCurrentView('main');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  useEffect(() => {
    if (!portalOrdenId) return;
    let activo = true;

    fetch(`${API_URL}/ordenes/${encodeURIComponent(portalOrdenId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const doc = data?.orden || data;
        if (activo && doc && (doc._id || doc.idOrden || doc.id)) {
          setOrdenes((prev) => fusionarOrdenes([doc], prev));
        }
      })
      .catch(() => {});

    return () => {
      activo = false;
    };
  }, [portalOrdenId]);

  useEffect(() => {
    try {
      localStorage.setItem(ACCESS_REQUESTS_STORAGE_KEY, JSON.stringify(accessRequests));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [accessRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDENES_STORAGE_KEY, JSON.stringify(ordenes));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [ordenes]);

  useEffect(() => {
    if (!Array.isArray(ordenes) || ordenes.length === 0) return;
    setUsers((prev) => asegurarClientesDesdeOrdenes(ordenes, prev));
  }, [ordenes]);

  useEffect(() => {
    try {
      localStorage.setItem(INVENTARIO_STORAGE_KEY, JSON.stringify(inventario));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [inventario]);

  useEffect(() => {
    try {
      localStorage.setItem(SOLICITUDES_COMPRA_STORAGE_KEY, JSON.stringify(solicitudesCompra));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [solicitudesCompra]);

  useEffect(() => {
    try {
      localStorage.setItem(ENTRADAS_STOCK_STORAGE_KEY, JSON.stringify(entradasStock));
    } catch {
      // Ignorar si localStorage no está disponible
    }
  }, [entradasStock]);

  useEffect(() => {
    if (portalUsuarioInvitado || !isAuthenticated || !currentUser?.email) return;
    const updatedMatch = users.find(
      (u) => (u.email || '').toLowerCase() === (currentUser.email || '').toLowerCase()
    );
    if (updatedMatch && JSON.stringify(updatedMatch) !== JSON.stringify(currentUser)) {
      try {
        localStorage.setItem('userData', JSON.stringify(updatedMatch));
      } catch {
        // Ignorar si localStorage no está disponible
      }
    }
  }, [users, isAuthenticated, currentUser, portalUsuarioInvitado]);

  useEffect(() => {
    let active = true;

    async function syncFromMongo() {
      try {
        const [usersRes, reqRes, ordenesRes, invRes, solRes] = await Promise.all([
          fetch(`${API_URL}/users`),
          fetch(`${API_URL}/access-requests`),
          fetch(`${API_URL}/ordenes`),
          fetch(`${API_URL}/inventario`),
          fetch(`${API_URL}/solicitudes-compra`),
        ]);

        if (usersRes.ok) {
          const mongoUsers = await usersRes.json();
          if (active && Array.isArray(mongoUsers) && mongoUsers.length > 0) {
            setUsers((prev) => {
              const mapa = new Map();
              mongoUsers.forEach((u, idx) => {
                const k = String(u?.email || u?.id || idx).trim().toLowerCase();
                if (k) mapa.set(k, u);
              });
              (Array.isArray(prev) ? prev : []).forEach((u, idx) => {
                const k = String(u?.email || u?.id || `local-${idx}`).trim().toLowerCase();
                if (k && !mapa.has(k)) mapa.set(k, u);
              });
              return Array.from(mapa.values());
            });
          }
        }

        if (reqRes.ok) {
          const mongoReqs = await reqRes.json();
          if (active && Array.isArray(mongoReqs)) {
            setAccessRequests(mongoReqs);
          }
        }

        if (ordenesRes.ok) {
          const mongoOrdenes = await ordenesRes.json();
          const listaOrdenes = Array.isArray(mongoOrdenes)
            ? mongoOrdenes
            : mongoOrdenes?.ordenes || [];
          if (active && Array.isArray(listaOrdenes) && listaOrdenes.length > 0) {
            setOrdenes((prev) =>
              fusionarOrdenes(prev, fusionarOrdenes(ORDENES_INICIALES_DEMO, listaOrdenes))
            );
          }
        }

        if (invRes.ok) {
          const mongoInv = await invRes.json();
          const listaInv = Array.isArray(mongoInv)
            ? mongoInv
            : mongoInv?.items || mongoInv?.inventario || [];
          if (active && Array.isArray(listaInv) && listaInv.length > 0) {
            setInventario(listaInv);
          }
        }

        if (solRes.ok) {
          const mongoSol = await solRes.json();
          const listaSol = Array.isArray(mongoSol)
            ? mongoSol
            : mongoSol?.solicitudes || [];
          if (active && Array.isArray(listaSol) && listaSol.length > 0) {
            setSolicitudesCompra(listaSol);
          }
        }
      } catch {
        // Si el backend no está encendido aún, sigue funcionando con estado + localStorage
      }
    }

    syncFromMongo();
    return () => {
      active = false;
    };
  }, []);

  const resolverPestanaSegura = (tab) => {
    const usuarioReferencia = portalUsuarioInvitado ? currentUser : activeUser;
    if (esRolCliente(usuarioReferencia) && TABS_RESTRINGIDOS_CLIENTE.includes(tab)) {
      return 'ordenes';
    }
    return tab;
  };

  const handleRegistrarClienteDesdeOrden = (datosCliente = {}, stamp = '') => {
    const nombreLimpio = String(datosCliente?.nombre || datosCliente?.cliente || '').trim();
    const correoLimpio = String(
      datosCliente?.email || datosCliente?.correo || datosCliente?.correoCliente || ''
    )
      .trim()
      .toLowerCase();
    const telefonoLimpio = String(
      datosCliente?.telefono || datosCliente?.telefonoCliente || ''
    ).trim();
    const ubicacionLimpia = String(
      datosCliente?.direccion ||
        datosCliente?.ubicacion ||
        datosCliente?.ubicacionCliente ||
        datosCliente?.direccionCliente ||
        ''
    ).trim();

    if (!nombreLimpio && !correoLimpio) return;

    const claveBase = correoLimpio || normalizarTexto(nombreLimpio).replace(/\s+/g, '.');

    setUsers((prevUsers) => {
      const idxExistente = prevUsers.findIndex((u) => {
        const correoU = String(u?.email || '').trim().toLowerCase();
        const nombreU = normalizarTexto(u?.nombre);
        return (
          (correoLimpio && correoU === correoLimpio) ||
          (!correoLimpio && nombreLimpio && nombreU === normalizarTexto(nombreLimpio))
        );
      });

      let nextUsers;
      if (idxExistente >= 0) {
        nextUsers = prevUsers.map((u, i) =>
          i === idxExistente
            ? {
                ...u,
                nombre: nombreLimpio || u.nombre,
                email: correoLimpio || u.email,
                telefono: telefonoLimpio || u.telefono || '',
                direccion: ubicacionLimpia || u.direccion || '',
                ubicacion: ubicacionLimpia || u.ubicacion || u.direccion || '',
                rol: u.rol || 'Cliente',
              }
            : u
        );
      } else {
        const nuevoCliente = {
          id: stamp || Date.now(),
          nombre: nombreLimpio || correoLimpio,
          email: correoLimpio || `${claveBase}@cliente.local`,
          password: DEFAULT_USER_PASSWORD,
          rol: 'Cliente',
          telefono: telefonoLimpio,
          direccion: ubicacionLimpia,
          ubicacion: ubicacionLimpia,
          avatar: DEFAULT_AVATAR,
        };
        nextUsers = [...prevUsers, nuevoCliente];
        fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoCliente),
        }).catch(() => {});
      }

      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
      } catch {
        // Ignorar si localStorage no está disponible
      }

      return nextUsers;
    });
  };

  const handleSaveSolicitudCompra = (nuevaSolicitud) => {
    setSolicitudesCompra((prev) => [nuevaSolicitud, ...prev]);
    fetch(`${API_URL}/solicitudes-compra`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaSolicitud),
    }).catch(() => {});
    setSelectedInventoryItem(null);
    setCurrentView('main');
  };

  const handleSaveStock = ({ type, item, cantidadAgregada }, stamp = '') => {
    if (!item) return;

    const entradaRegistro = {
      id: `ENT-${String(stamp || '').slice(-6) || '000001'}`,
      tipo: type || 'update',
      codigo: item.codigo || item.id || '—',
      nombre: item.nombre,
      cantidadAgregada:
        Number(cantidadAgregada) || Number(item.stock ?? item.stockActual) || 0,
      stockResultante: Number(item.stock ?? item.stockActual) || 0,
      ubicacion: item.ubicacion || 'Almacén Principal',
      registradoPor: activeUser?.nombre || 'Usuario',
      fecha: stamp ? new Date(stamp).toLocaleDateString('es-CO') : '',
    };

    setEntradasStock((prev) => [entradaRegistro, ...prev]);
    fetch(`${API_URL}/inventario/entradas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entradaRegistro),
    }).catch(() => {});

    if (type === 'update') {
      const targetId = item.codigo || item.id;
      setInventario((prev) =>
        prev.map((it) => {
          if (String(it.codigo || it.id) !== String(targetId)) return it;
          const precioConservado =
            item.precio !== undefined && item.precio !== null && item.precio !== ''
              ? Number(item.precio)
              : Number(it.precio ?? it.precioUnitario ?? 0) || 0;
          return {
            ...it,
            ...item,
            precio: precioConservado,
          };
        })
      );
      if (targetId) {
        fetch(`${API_URL}/inventario/${targetId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        }).catch(() => {});
      }
    } else {
      const itemNormalizado = {
        ...item,
        precio: Number(item.precio ?? item.precioUnitario ?? 0) || 0,
      };
      setInventario((prev) => [itemNormalizado, ...prev]);
      fetch(`${API_URL}/inventario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemNormalizado),
      }).catch(() => {});
    }

    setSelectedInventoryItem(null);
    setCurrentView('main');
  };

  const handleDescontarStock = (repuestosAsignados = []) => {
    if (!Array.isArray(repuestosAsignados) || repuestosAsignados.length === 0) return;

    setInventario((prev) =>
      prev.map((item) => {
        const itemId = String(item.codigo || item.id || item._id);
        const match = repuestosAsignados.find((a) => String(a.id) === itemId);
        if (!match) return item;

        const stockActualNum =
          Number(item.stock ?? item.stockActual ?? item.cantidad ?? 0) || 0;
        const descontar = Number(match.cantidad) || 0;
        const nuevoStock = Math.max(0, stockActualNum - descontar);
        const precioConservado =
          Number(item.precio ?? item.precioUnitario ?? match.precio ?? 0) || 0;

        const actualizado = {
          ...item,
          stock: nuevoStock,
          stockActual: nuevoStock,
          precio: precioConservado,
        };

        if (itemId) {
          fetch(`${API_URL}/inventario/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock: nuevoStock, stockActual: nuevoStock }),
          }).catch(() => {});
        }

        return actualizado;
      })
    );
  };

  const handleAssignTecnico = async (ordenActual, tecnicoNombre) => {
    if (!ordenActual || !tecnicoNombre) return;

    const ordenId = ordenActual._id || ordenActual.idOrden;
    const tecnicoObj = users.find(
      (u) => normalizarTexto(u?.nombre) === normalizarTexto(tecnicoNombre)
    );
    const mesaTecnico =
      tecnicoObj?.mesaTrabajo || tecnicoObj?.bancoTrabajo || ordenActual.mesaTrabajo || null;

    const ordenActualizada = {
      ...ordenActual,
      tecnicoAsignado: tecnicoNombre,
      mesaTrabajo: mesaTecnico,
    };

    setSelectedOrder(ordenActualizada);
    setOrdenes((prev) => {
      const existe = prev.some((o) => getOrdenKey(o) === String(ordenId));
      const next = existe
        ? prev.map((o) =>
            getOrdenKey(o) === String(ordenId) ? { ...o, ...ordenActualizada } : o
          )
        : [ordenActualizada, ...prev];
      try {
        localStorage.setItem(ORDENES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignorar si localStorage no está disponible
      }
      return next;
    });

    if (!ordenId) return;

    try {
      const res = await fetch(`${API_URL}/ordenes/${ordenId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tecnicoAsignado: tecnicoNombre,
          mesaTrabajo: mesaTecnico,
        }),
      });
      if (res.ok) {
        const guardada = await res.json().catch(() => null);
        if (guardada && (guardada._id || guardada.idOrden || guardada.orden)) {
          const doc = guardada.orden || guardada;
          const tecnicoFinal = doc.tecnicoAsignado || tecnicoNombre;
          const mesaFinal = doc.mesaTrabajo || mesaTecnico;
          setSelectedOrder((prev) => ({
            ...prev,
            ...doc,
            tecnicoAsignado: tecnicoFinal,
            mesaTrabajo: mesaFinal,
          }));
          setOrdenes((prev) =>
            prev.map((o) =>
              getOrdenKey(o) === String(ordenId)
                ? { ...o, ...doc, tecnicoAsignado: tecnicoFinal, mesaTrabajo: mesaFinal }
                : o
            )
          );
        }
      }
    } catch {
      // Queda persistido en estado y localStorage aunque el PATCH responda 404 o falle
    }
  };

  const handleAssignMesaTrabajo = (targetUserId, nuevaMesa) => {
    const roleLower = (activeUser?.rol || '').toLowerCase();
    if (!roleLower.includes('admin')) return;

    const mesaLimpia = String(nuevaMesa || '').trim() || null;

    setUsers((prevUsers) => {
      const nextUsers = prevUsers.map((u) => {
        const coincide =
          String(u.id) === String(targetUserId) || String(u._id) === String(targetUserId);
        if (!coincide) return u;
        return {
          ...u,
          mesaTrabajo: mesaLimpia,
        };
      });

      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
        const updatedTarget = nextUsers.find(
          (u) => String(u.id) === String(targetUserId) || String(u._id) === String(targetUserId)
        );
        if (
          updatedTarget &&
          currentUser?.email &&
          (updatedTarget.email || '').toLowerCase() === (currentUser.email || '').toLowerCase()
        ) {
          localStorage.setItem('userData', JSON.stringify(updatedTarget));
        }
      } catch {
        // Ignorar si localStorage no está disponible
      }

      return nextUsers;
    });

    const objetivo = users.find(
      (u) => String(u.id) === String(targetUserId) || String(u._id) === String(targetUserId)
    );
    const identifier = objetivo?._id || objetivo?.id || targetUserId;
    if (identifier) {
      fetch(`${API_URL}/users/${identifier}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mesaTrabajo: mesaLimpia }),
      }).catch(() => {});
    }
  };

  const handleLoginSuccess = (authenticatedUser) => {
    limpiarParametroOrdenEnUrl();
    setPortalOrdenId('');
    if (authenticatedUser) {
      const latestUser =
        users.find(
          (u) => (u.email || '').toLowerCase() === (authenticatedUser.email || '').toLowerCase()
        ) || authenticatedUser;
      setCurrentUser(latestUser);
      try {
        localStorage.setItem('userData', JSON.stringify(latestUser));
      } catch {
        // Ignorar si localStorage no está disponible
      }
    }
    setIsAuthenticated(true);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } catch {
      // Ignorar si localStorage no está disponible
    }
    setActiveTab('dashboard');
    setCurrentView('main');
  };

  const handleResetPassword = (targetEmail, newPassword) => {
    const cleanEmail = targetEmail.trim().toLowerCase();
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        (u.email || '').toLowerCase() === cleanEmail ? { ...u, password: newPassword } : u
      )
    );

    fetch(`${API_URL}/users/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password: newPassword }),
    }).catch(() => {});
  };

  const handleUpdatePassword = (newPassword) => {
    if (!newPassword || !activeUser) return;

    const updatedUser = { ...activeUser, password: newPassword };
    setCurrentUser(updatedUser);

    setUsers((prevUsers) => {
      const nextUsers = prevUsers.map((u) =>
        (u.email || '').toLowerCase() === (activeUser.email || '').toLowerCase()
          ? { ...u, password: newPassword }
          : u
      );
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
      } catch {
        // Ignorar si localStorage no está disponible
      }
      return nextUsers;
    });

    if (localStorage.getItem('userData')) {
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }

    fetch(`${API_URL}/users/${activeUser._id || activeUser.id}/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: activeUser.email, password: newPassword }),
    }).catch(() => {});
  };

  const handleUpdateAvatar = (newAvatar) => {
    if (!newAvatar || !activeUser) return;

    const updatedUser = { ...activeUser, avatar: newAvatar };
    setCurrentUser(updatedUser);

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        (u.email || '').toLowerCase() === (activeUser.email || '').toLowerCase()
          ? { ...u, avatar: newAvatar }
          : u
      )
    );

    if (localStorage.getItem('userData')) {
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  const handleCreateAccessRequest = (newRequestData, stamp = '') => {
    const normalizedCargo = (newRequestData.cargo || '').toLowerCase().includes('admin')
      ? 'Administrador'
      : 'Técnico';

    const created = {
      id: stamp || 0,
      nombre: (newRequestData.nombre || '').trim(),
      correo: (newRequestData.correo || '').trim().toLowerCase(),
      taller: (newRequestData.taller || '').trim(),
      cargo: normalizedCargo,
      estado: 'Pendiente',
      rolAsignado: null,
      fecha: stamp ? new Date(stamp).toLocaleDateString('es-CO') : '',
    };

    setAccessRequests((prev) => [created, ...prev]);

    fetch(`${API_URL}/access-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(created),
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((savedDoc) => {
        if (savedDoc?._id) {
          setAccessRequests((prev) =>
            prev.map((item) => (item.id === created.id ? { ...item, _id: savedDoc._id } : item))
          );
        }
      })
      .catch(() => {});
  };

  const handleApproveRequest = (requestId, assignedRole, stamp = '') => {
    const roleLower = (activeUser?.rol || '').toLowerCase();
    const isAdmin = roleLower.includes('admin');
    if (!isAdmin) return;

    const targetReq = accessRequests.find(
      (r) => String(r.id) === String(requestId) || String(r._id) === String(requestId)
    );
    if (!targetReq || targetReq.estado !== 'Pendiente') return;

    const candidateRole = assignedRole || targetReq.cargo || 'Técnico';
    const finalRole = candidateRole.toLowerCase().includes('admin')
      ? 'Administrador'
      : 'Técnico';

    const cleanEmail = (targetReq.correo || '').trim().toLowerCase();

    setAccessRequests((prev) =>
      prev.map((r) =>
        String(r.id) === String(requestId) || String(r._id) === String(requestId)
          ? {
              ...r,
              estado: 'Aprobada',
              rolAsignado: finalRole,
              passwordAsignada: DEFAULT_USER_PASSWORD,
            }
          : r
      )
    );

    const newUserPayload = {
      id: stamp || 0,
      nombre: (targetReq.nombre || '').trim(),
      email: cleanEmail,
      password: DEFAULT_USER_PASSWORD,
      rol: finalRole,
      telefono: '',
      direccion: (targetReq.taller || '').trim(),
      mesaTrabajo: null,
      avatar: DEFAULT_AVATAR,
    };

    setUsers((prevUsers) => {
      const existsIndex = prevUsers.findIndex(
        (u) => (u.email || '').trim().toLowerCase() === cleanEmail
      );
      const nextUsers =
        existsIndex >= 0
          ? prevUsers.map((u, idx) =>
              idx === existsIndex
                ? { ...u, nombre: newUserPayload.nombre, rol: finalRole, password: DEFAULT_USER_PASSWORD }
                : u
            )
          : [...prevUsers, newUserPayload];

      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
      } catch {
        // Ignorar si localStorage no está disponible
      }
      return nextUsers;
    });

    const reqIdentifier = targetReq._id || targetReq.id;
    fetch(`${API_URL}/access-requests/${reqIdentifier}/approve`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rolAsignado: finalRole,
        password: DEFAULT_USER_PASSWORD,
        user: newUserPayload,
      }),
    }).catch(() => {});
  };

  const handleRejectRequest = (requestId) => {
    const roleLower = (activeUser?.rol || '').toLowerCase();
    const isAdmin = roleLower.includes('admin');
    if (!isAdmin) return;

    const targetReq = accessRequests.find(
      (r) => String(r.id) === String(requestId) || String(r._id) === String(requestId)
    );

    setAccessRequests((prev) =>
      prev.map((r) =>
        String(r.id) === String(requestId) || String(r._id) === String(requestId)
          ? { ...r, estado: 'Rechazada' }
          : r
      )
    );

    if (targetReq) {
      const reqIdentifier = targetReq._id || targetReq.id;
      fetch(`${API_URL}/access-requests/${reqIdentifier}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {});
    }
  };

  const handleDeleteUser = (targetUserId) => {
    if (!activeUser || !targetUserId) return;

    const targetUser = users.find(
      (u) => String(u.id) === String(targetUserId) || String(u._id) === String(targetUserId)
    );
    if (!targetUser) return;

    const myRole = (activeUser.rol || '').toLowerCase();
    const targetRole = (targetUser.rol || '').toLowerCase();

    const isAdmin = myRole.includes('admin');
    const isTech = myRole.includes('tecn') || myRole.includes('técn');
    const isSelf =
      String(activeUser.id) === String(targetUser.id) ||
      (activeUser.email || '').toLowerCase() === (targetUser.email || '').toLowerCase();

    const targetIsAdmin = targetRole.includes('admin');
    const targetIsTech = targetRole.includes('tecn') || targetRole.includes('técn');
    const targetIsClient = targetRole.includes('client');

    if (targetIsAdmin) {
      return;
    }

    if (isAdmin) {
      if (!targetIsTech && !targetIsClient) return;
    } else if (isTech) {
      const allowedForTech = (targetIsTech && isSelf) || targetIsClient;
      if (!allowedForTech) return;
    } else {
      if (!isSelf || !targetIsClient) return;
    }

    setUsers((prev) => {
      const nextUsers = prev.filter(
        (u) => String(u.id) !== String(targetUserId) && String(u._id) !== String(targetUserId)
      );
      try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
      } catch {
        // Ignorar si localStorage no está disponible
      }
      return nextUsers;
    });

    const userIdentifier = targetUser._id || targetUser.id;
    fetch(`${API_URL}/users/${userIdentifier}`, {
      method: 'DELETE',
    }).catch(() => {});

    if (isSelf) {
      try {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userData');
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        // Ignorar si localStorage no está disponible
      }
      setIsAuthenticated(false);
      setCurrentUser(mockUser);
      setAuthView('login');
      setActiveTab('dashboard');
      setCurrentView('main');
    }
  };

  const handleTabChange = (tab) => {
    if (portalOrdenId) {
      limpiarParametroOrdenEnUrl();
      setPortalOrdenId('');
      if (!loadSavedAuthState()) {
        setIsAuthenticated(false);
        setAuthView('login');
        return;
      }
    }
    setActiveTab(resolverPestanaSegura(tab));
    setCurrentView('main');
    setCancelMessage(false);
  };

  const handleNavigate = (tab, view = 'main') => {
    if (portalOrdenId) {
      limpiarParametroOrdenEnUrl();
      setPortalOrdenId('');
      if (!loadSavedAuthState()) {
        setIsAuthenticated(false);
        setAuthView('login');
        return;
      }
    }
    setActiveTab(resolverPestanaSegura(tab));
    setCurrentView(view);
    setCancelMessage(false);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch {
      // Ignorar si localStorage no está disponible
    }
    limpiarParametroOrdenEnUrl();
    setPortalOrdenId('');
    setIsAuthenticated(false);
    setCurrentUser(mockUser);
    setAuthView('login');
    setActiveTab('dashboard');
    setCurrentView('main');
  };

  const handleCancelNewOrder = () => {
    setCurrentView('main');
    setCancelMessage(true);
  };

  const handleCerrarOrden = (datosCierre = {}, stamp = '') => {
    const ordenObjetivo = datosCierre?.orden || ordenActivaSincronizada;
    if (!ordenObjetivo) {
      setCurrentView('confirmacionCierre');
      return;
    }

    const keyObjetivo = getOrdenKey(ordenObjetivo);
    const estadoLimpio = String(datosCierre?.estadoFinal || 'FINALIZADO - ENTREGADO')
      .replace(/^\[|\]$/g, '')
      .trim();
    const seguimientoPrevio = Array.isArray(ordenObjetivo.seguimiento)
      ? ordenObjetivo.seguimiento
      : [];

    const tecnicoAsignadoObj = users.find(
      (u) => normalizarTexto(u?.nombre) === normalizarTexto(ordenObjetivo?.tecnicoAsignado)
    );
    const mesaMomento =
      ordenObjetivo?.mesaTrabajo ||
      tecnicoAsignadoObj?.mesaTrabajo ||
      tecnicoAsignadoObj?.bancoTrabajo ||
      null;

    const fechaCierreIso = stamp
      ? new Date(stamp).toISOString()
      : datosCierre?.fechaCierre || new Date().toISOString();

    const eventoCierre = {
      id: `cierre-${keyObjetivo || 'orden'}-${stamp || 'ok'}`,
      fecha: fechaCierreIso,
      titulo: `Orden cerrada (${estadoLimpio})`,
      responsable: activeUser?.nombre || 'Usuario',
      notaTecnica: datosCierre?.comentariosFinales || '',
    };

    const camposActualizados = {
      estado: estadoLimpio,
      estadoFinal: estadoLimpio,
      cerrada: true,
      entregado: true,
      mesaTrabajo: mesaMomento,
      fechaSalida: fechaCierreIso,
      comentariosCierre: datosCierre?.comentariosFinales || '',
      garantiaAplicable: datosCierre?.garantiaAplicable || '',
      montoTotal: datosCierre?.montoTotal ?? ordenObjetivo.montoTotal ?? 0,
      seguimiento: [...seguimientoPrevio, eventoCierre],
    };

    setSelectedOrder((prev) =>
      prev && getOrdenKey(prev) === keyObjetivo
        ? { ...prev, ...camposActualizados }
        : { ...ordenObjetivo, ...camposActualizados }
    );

    setOrdenes((prev) => {
      const next = prev.map((o) =>
        getOrdenKey(o) === keyObjetivo ? { ...o, ...camposActualizados } : o
      );
      try {
        localStorage.setItem(ORDENES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignorar si localStorage no está disponible
      }
      return next;
    });

    if (keyObjetivo) {
      fetch(`${API_URL}/ordenes/${keyObjetivo}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(camposActualizados),
      }).catch(() => {});
    }

    setCurrentView('confirmacionCierre');
  };

  const ordenActivaSincronizada = selectedOrder
    ? ordenes.find((o) => getOrdenKey(o) === getOrdenKey(selectedOrder)) || selectedOrder
    : null;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between font-sans text-gray-800">
      <div>
        {isAuthenticated && !portalOrdenId && (
          <Navbar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            user={activeUser}
            onNavigate={(tab) => handleNavigate(tab, 'main')}
            onLogout={handleLogout}
            onOpenProfile={() => {
              setActiveTab('perfil');
              setCurrentView('main');
            }}
          />
        )}

        {portalOrdenId ? (
          <PortalSeguimientoClienteView
            ordenes={ordenes}
            user={activeUser}
            onVolverLogin={handleLogout}
            onNavigate={(tab) => handleNavigate(tab, 'main')}
            onLogout={handleLogout}
            onOpenProfile={() => {
              limpiarParametroOrdenEnUrl();
              setPortalOrdenId('');
              setActiveTab('perfil');
              setCurrentView('main');
            }}
          />
        ) : !isAuthenticated ? (
          <>
            {authView === 'login' && (
              <LoginView
                users={users}
                onLoginSuccess={handleLoginSuccess}
                onForgotPassword={() => setAuthView('forgot')}
                onGoToReset={(targetEmail) => {
                  if (targetEmail) setRecoveryEmail(targetEmail);
                  setAuthView('resetPassword');
                }}
                onCreateAccessRequest={(reqData) =>
                  handleCreateAccessRequest(reqData, Date.now())
                }
              />
            )}
            {authView === 'forgot' && (
              <RecuperarPasswordView
                email={recoveryEmail}
                onBackToLogin={() => setAuthView('login')}
                onSendSuccess={(submittedEmail) => {
                  if (submittedEmail) setRecoveryEmail(submittedEmail);
                  setAuthView('confirmRecovery');
                }}
              />
            )}
            {authView === 'confirmRecovery' && (
              <ConfirmacionRecuperacionView
                email={recoveryEmail}
                onContinueReset={() => setAuthView('resetPassword')}
                onBackToLogin={() => setAuthView('login')}
              />
            )}
            {authView === 'resetPassword' && (
              <ResetPasswordView
                email={recoveryEmail}
                onResetPassword={handleResetPassword}
                onBackToLogin={() => setAuthView('login')}
                onSuccess={() => setAuthView('confirmChange')}
              />
            )}
            {authView === 'confirmChange' && (
              <ConfirmacionCambioPasswordView
                email={recoveryEmail}
                onBackToLogin={() => setAuthView('login')}
                onForgotPassword={() => setAuthView('forgot')}
              />
            )}
          </>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <DashboardView
                user={activeUser}
                ordenes={ordenes}
                onNavigate={(tab, view = 'main') => handleNavigate(tab, view)}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'main' && (
              <OrdenesView
                currentUser={activeUser}
                ordenes={ordenes}
                onSyncOrdenes={setOrdenes}
                onViewDetail={(orden) => {
                  const match =
                    ordenes.find((o) => getOrdenKey(o) === getOrdenKey(orden)) || orden || null;
                  if (!puedeAccederAOrden(match, activeUser)) return;
                  setSelectedOrder(match);
                  setCurrentView('detalle');
                  setCancelMessage(false);
                }}
                onNewOrder={() => {
                  if (esRolCliente(activeUser)) return;
                  setCurrentView('nueva');
                  setCancelMessage(false);
                }}
                cancelMessage={cancelMessage}
                onDismissMessage={() => setCancelMessage(false)}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'nueva' && !esRolCliente(activeUser) && (
              <NuevaOrdenView
                currentUser={activeUser}
                users={users}
                onRegistrarCliente={(datosCliente) =>
                  handleRegistrarClienteDesdeOrden(datosCliente, Date.now())
                }
                onBack={handleCancelNewOrder}
                onSaveSuccess={(createdOrder) => {
                  if (createdOrder && (createdOrder._id || createdOrder.idOrden || createdOrder.orden)) {
                    const doc = createdOrder.orden || createdOrder;
                    setOrdenes((prev) => fusionarOrdenes([doc], prev));
                    handleRegistrarClienteDesdeOrden(
                      {
                        nombre: doc?.cliente || doc?.nombreCliente,
                        email: doc?.correoCliente || doc?.emailCliente || doc?.correo,
                        telefono: doc?.telefonoCliente || doc?.telefono,
                        direccion:
                          doc?.ubicacionCliente || doc?.direccionCliente || doc?.direccion,
                      },
                      Date.now()
                    );
                  }
                  setCurrentView('main');
                }}
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
                orden={ordenActivaSincronizada}
                currentUser={activeUser}
                users={users}
                ordenes={ordenes}
                onAssignTecnico={handleAssignTecnico}
                onBack={() => setCurrentView('main')}
                onOpenDiagnostico={() => setCurrentView('diagnostico')}
                onOpenGestionarRepuestos={() => setCurrentView('asignarRepuesto')}
                onRegistrarCierre={() => setCurrentView('cierre')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'cierre' && !esRolCliente(activeUser) && (
              <CierreOrdenView
                key={ordenActivaSincronizada?._id || ordenActivaSincronizada?.idOrden || 'cierre'}
                orden={ordenActivaSincronizada}
                onBack={() => setCurrentView('detalle')}
                onGenerarFactura={(datosCierre) => handleCerrarOrden(datosCierre, Date.now())}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'confirmacionCierre' && (
              <ConfirmacionCierreView
                orden={ordenActivaSincronizada}
                onGoToOrders={() => setCurrentView('main')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'diagnostico' && !esRolCliente(activeUser) && (
              <DiagnosticoView
                orden={ordenActivaSincronizada}
                currentUser={activeUser}
                onSaveDiagnostico={(ordenActualizada) => {
                  setSelectedOrder(ordenActualizada);
                  setOrdenes((prev) =>
                    prev.map((o) =>
                      getOrdenKey(o) === getOrdenKey(ordenActualizada) ? ordenActualizada : o
                    )
                  );
                  setCurrentView('detalle');
                }}
                onBack={() => setCurrentView('detalle')}
                onOpenHistorial={() => setCurrentView('historial')}
                onOpenAsignarRepuesto={() => setCurrentView('asignarRepuesto')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'historial' && (
              <HistorialClienteView onBack={() => setCurrentView('diagnostico')} />
            )}

            {activeTab === 'ordenes' && currentView === 'asignarRepuesto' && !esRolCliente(activeUser) && (
              <AsignarRepuestoView
                orden={ordenActivaSincronizada}
                inventario={inventario}
                onDescontarStock={handleDescontarStock}
                onBack={() => setCurrentView('detalle')}
                onConfirmSuccess={(dataConfirmacion) => {
                  if (Array.isArray(dataConfirmacion?.repuestos)) {
                    setUltimosRepuestosAsignados(dataConfirmacion.repuestos);
                  }
                  if (dataConfirmacion?.orden) {
                    setSelectedOrder(dataConfirmacion.orden);
                    setOrdenes((prev) =>
                      prev.map((o) =>
                        getOrdenKey(o) === getOrdenKey(dataConfirmacion.orden)
                          ? dataConfirmacion.orden
                          : o
                      )
                    );
                  }
                  setCurrentView('confirmacionRepuestos');
                }}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'confirmacionRepuestos' && (
              <ConfirmacionRepuestosView
                orden={ordenActivaSincronizada}
                repuestosAsignados={ultimosRepuestosAsignados}
                onGoToDetail={() => setCurrentView('detalle')}
                onAssignMore={() => setCurrentView('asignarRepuesto')}
              />
            )}

            {activeTab === 'medidor' && !esRolCliente(activeUser) && (
              <MedidorDispositivosView
                ordenInicial={ordenActivaSincronizada?.idOrden || ''}
                equipoInicial={
                  [
                    ordenActivaSincronizada?.tipoEquipo,
                    ordenActivaSincronizada?.marca,
                    ordenActivaSincronizada?.modelo,
                  ]
                    .filter(Boolean)
                    .join(' ') || ''
                }
                onBack={() => setActiveTab('ordenes')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'medidorDispositivos' && !esRolCliente(activeUser) && (
              <MedidorDispositivosView
                ordenInicial={ordenActivaSincronizada?.idOrden || ''}
                equipoInicial={
                  [
                    ordenActivaSincronizada?.tipoEquipo,
                    ordenActivaSincronizada?.marca,
                    ordenActivaSincronizada?.modelo,
                  ]
                    .filter(Boolean)
                    .join(' ') || ''
                }
                onBack={() => setCurrentView('main')}
              />
            )}

            {activeTab === 'inventario' && currentView === 'main' && !esRolCliente(activeUser) && (
              <InventarioView
                currentUser={activeUser}
                inventario={inventario}
                solicitudesCompra={solicitudesCompra}
                onOpenSolicitudCompra={(item) => {
                  setSelectedInventoryItem(item || null);
                  setCurrentView('solicitudCompra');
                }}
                onOpenAgregarStock={(item) => {
                  setSelectedInventoryItem(item || null);
                  setCurrentView('agregarStock');
                }}
                onOpenHistorialPedidos={() => setCurrentView('historialPedidos')}
                onSolicitarItem={(item) => {
                  setSelectedInventoryItem(item || null);
                  setCurrentView('solicitudCompra');
                }}
              />
            )}

            {activeTab === 'inventario' && currentView === 'solicitudCompra' && !esRolCliente(activeUser) && (
              <SolicitudCompraView
                currentUser={activeUser}
                inventario={inventario}
                itemInicial={selectedInventoryItem}
                onSaveSolicitud={handleSaveSolicitudCompra}
                onBack={() => {
                  setSelectedInventoryItem(null);
                  setCurrentView('main');
                }}
              />
            )}

            {activeTab === 'inventario' && currentView === 'agregarStock' && !esRolCliente(activeUser) && (
              <AgregarStockView
                currentUser={activeUser}
                inventario={inventario}
                itemInicial={selectedInventoryItem}
                onSaveStock={(payload) => handleSaveStock(payload, Date.now())}
                onBack={() => {
                  setSelectedInventoryItem(null);
                  setCurrentView('main');
                }}
              />
            )}

            {activeTab === 'inventario' && currentView === 'historialPedidos' && !esRolCliente(activeUser) && (
              <HistorialPedidosView
                solicitudesCompra={solicitudesCompra}
                entradasStock={entradasStock}
                ordenes={ordenes}
                onBack={() => setCurrentView('main')}
              />
            )}

            {activeTab === 'perfil' && (
              <PerfilUsuarioView
                user={activeUser}
                onUpdateAvatar={handleUpdateAvatar}
                onUpdatePassword={handleUpdatePassword}
                onBack={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'usuarios' && !esRolCliente(activeUser) && (
              <GestionUsuariosView
                currentUser={activeUser}
                users={users}
                ordenes={ordenes}
                accessRequests={accessRequests}
                onAssignMesaTrabajo={handleAssignMesaTrabajo}
                onApproveRequest={(reqId, rol) =>
                  handleApproveRequest(reqId, rol, Date.now())
                }
                onRejectRequest={handleRejectRequest}
                onDeleteUser={handleDeleteUser}
                onBack={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'configuracion' && !esRolCliente(activeUser) && (
              <ConfiguracionGlobalView onBack={() => setActiveTab('dashboard')} />
            )}

            {activeTab === 'auditoria' && !esRolCliente(activeUser) && (
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

            {activeTab === 'ordenes' && currentView === 'asignacion' && !esRolCliente(activeUser) && (
              <GestionAsignacionView
                onBack={() => setCurrentView('main')}
                onViewDetail={() => setCurrentView('detalle')}
              />
            )}

            {activeTab === 'ordenes' && currentView === 'diagnosticoInteractivo' && !esRolCliente(activeUser) && (
              <DiagnosticoInteractivoView
                onBack={() => setCurrentView('detalle')}
                onRegistrarResultado={() => setCurrentView('diagnostico')}
              />
            )}

            {activeTab === 'garantias' && (
              <GestionGarantiasView
                onBack={() => setCurrentView('dashboard')}
                onViewDetail={() => { setActiveTab('ordenes'); setCurrentView('detalle'); }}
              />
            )}

            {activeTab === 'seguridad' && !esRolCliente(activeUser) && (
              <PanelSeguridadView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'analitica' && !esRolCliente(activeUser) && (
              <CentroAnaliticaView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'soporteAyuda' && (
              <CentroAyudaView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionServicio' && !esRolCliente(activeUser) && (
              <ConfiguracionServicioView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionTecnica' && !esRolCliente(activeUser) && (
              <ConfiguracionRecursosTecnicosView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionInventario' && !esRolCliente(activeUser) && (
              <ConfiguracionInventarioView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionGarantias' && !esRolCliente(activeUser) && (
              <ConfiguracionGarantiasView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionCalidad' && !esRolCliente(activeUser) && (
              <ConfiguracionCalidadView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionSeguridadAcceso' && !esRolCliente(activeUser) && (
              <ConfiguracionSeguridadAccesoView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionIntegraciones' && !esRolCliente(activeUser) && (
              <ConfiguracionIntegracionesView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionAuditoriaCumplimiento' && !esRolCliente(activeUser) && (
              <ConfiguracionAuditoriaCumplimientoView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionComunicaciones' && !esRolCliente(activeUser) && (
              <ConfiguracionComunicacionesView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionBackup' && !esRolCliente(activeUser) && (
              <ConfiguracionBackupView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionTaller' && !esRolCliente(activeUser) && (
              <ConfiguracionTallerView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionCatalogos' && !esRolCliente(activeUser) && (
              <ConfiguracionCatalogosView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionRolesPermisos' && !esRolCliente(activeUser) && (
              <ConfiguracionRolesPermisosView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionGarantiasSLA' && !esRolCliente(activeUser) && (
              <ConfiguracionGarantiasSLAView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionCalidadQA' && !esRolCliente(activeUser) && (
              <ConfiguracionCalidadQAView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionSeguridadAvanzada' && !esRolCliente(activeUser) && (
              <ConfiguracionSeguridadAvanzadaView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionIntegracionesExportacion' && !esRolCliente(activeUser) && (
              <ConfiguracionIntegracionesExportacionView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionMensajesExportacion' && !esRolCliente(activeUser) && (
              <ConfiguracionMensajesExportacionView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionComunicacionesNotificaciones' && !esRolCliente(activeUser) && (
              <ConfiguracionComunicacionesNotificacionesView onBack={() => setCurrentView('dashboard')} />
            )}

            {activeTab === 'configuracionBackupRecuperacion' && !esRolCliente(activeUser) && (
              <ConfiguracionBackupRecuperacionViewAlias onBack={() => setCurrentView('dashboard')} />
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}