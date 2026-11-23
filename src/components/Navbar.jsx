import React, { useState, useRef, useEffect } from 'react';

function normalizarRol(rol = '') {
  return String(rol || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export default function Navbar({
  activeTab,
  setActiveTab,
  user,
  onNavigate,
  onLogout,
  onOpenProfile,
  onSearchClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const nombreUsuario = user?.nombre || 'Usuario';
  const rolUsuario = user?.rol || '';
  const esCliente = normalizarRol(rolUsuario).includes('client');

  const irAPestana = (tab) => {
    const pestanasRestringidasCliente = ['inventario', 'usuarios', 'medidor', 'configuracion'];
    if (esCliente && pestanasRestringidasCliente.includes(tab)) {
      tab = 'ordenes';
    }

    if (typeof onNavigate === 'function') {
      onNavigate(tab);
    } else if (typeof setActiveTab === 'function') {
      setActiveTab(tab);
    }
    setMenuOpen(false);
  };

  const navItems = [
    { key: 'dashboard', label: 'Inicio', soloPersonal: false },
    { key: 'ordenes', label: 'Órdenes', soloPersonal: false },
    { key: 'inventario', label: 'Inventario', soloPersonal: true },
    { key: 'usuarios', label: 'Usuarios', soloPersonal: true },
    { key: 'medidor', label: 'Medidor de voltaje', soloPersonal: true },
  ].filter((item) => !(esCliente && item.soloPersonal));

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Marca / Logo */}
        <button
          type="button"
          onClick={() => irAPestana('dashboard')}
          className="flex items-center gap-2.5 text-left cursor-pointer shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
            ↑
          </span>
          <span className="font-extrabold text-gray-900 tracking-tight text-sm sm:text-base uppercase">
            TECHSERVICE WEB
          </span>
        </button>

        {/* Navegación principal + acciones derechas */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex items-center gap-4 sm:gap-6 overflow-x-auto">
            {navItems.map((item) => {
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => irAPestana(item.key)}
                  className={`py-1 text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="h-5 w-px bg-gray-200 hidden sm:block" />

          <button
            type="button"
            onClick={() => {
              if (typeof onSearchClick === 'function') {
                onSearchClick();
              } else {
                irAPestana('ordenes');
              }
            }}
            aria-label="Buscar"
            className="p-1.5 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition cursor-pointer shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Perfil / Menú de usuario */}
          <div className="relative shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2.5 px-2 py-1 rounded-xl hover:bg-gray-100 transition cursor-pointer"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={nombreUsuario}
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  {nombreUsuario.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="hidden md:block text-left leading-tight">
                <div className="text-xs font-semibold text-gray-800">
                  Hola!, {nombreUsuario}
                </div>
                {rolUsuario && (
                  <div className="text-[11px] text-gray-500">{rolUsuario}</div>
                )}
              </div>
              <span className="text-xs text-gray-500">⌄</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    if (typeof onOpenProfile === 'function') {
                      onOpenProfile();
                    } else {
                      irAPestana('perfil');
                    }
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 font-medium cursor-pointer"
                >
                  Mi Perfil
                </button>
                {!esCliente && (
                  <button
                    type="button"
                    onClick={() => irAPestana('configuracion')}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 font-medium cursor-pointer"
                  >
                    Configuración
                  </button>
                )}
                <div className="border-t border-gray-100 my-1" />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    if (typeof onLogout === 'function') {
                      onLogout();
                    }
                  }}
                  className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}