import React, { useState, useRef, useEffect } from 'react';

export default function Navbar({ activeTab, setActiveTab, onOpenProfile, onLogout, user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7"></path>
            </svg>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-gray-900">
            TECHSERVICE WEB
          </span>
        </div>

        {/* Links de Navegación & Perfil */}
        <div className="flex items-center space-x-8">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`transition cursor-pointer ${activeTab === 'dashboard' ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('ordenes')}
              className={`transition cursor-pointer ${activeTab === 'ordenes' ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Órdenes
            </button>
            <button
              onClick={() => setActiveTab('inventario')}
              className={`transition cursor-pointer ${activeTab === 'inventario' ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Inventario
            </button>
          </nav>

          <div className="flex items-center space-x-4 border-l border-gray-200 pl-6">
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

            {/* Avatar y Menú Desplegable de Usuario */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2.5 cursor-pointer focus:outline-none p-1 rounded-lg hover:bg-gray-50 transition"
              >
                <img 
                  src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
                  alt={user?.nombre || "Usuario"} 
                  className="w-8 h-8 rounded-full object-cover border border-gray-200"
                />
                <span className="text-xs font-semibold text-gray-700">
                  Hola!, {user?.nombre || "Jack Rowe"}
                </span>
                <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Menú Desplegable */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-bold text-gray-900">{user?.nombre || "Jack Rowe"}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user?.email || "jack.rowe@techserviceweb.com"}</p>
                  </div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      if (onOpenProfile) onOpenProfile();
                    }}
                    className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 transition cursor-pointer font-medium"
                  >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>Configurar Perfil</span>
                  </button>

                  <div className="border-t border-gray-100 my-1"></div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full text-left px-4 py-2.5 text-rose-600 hover:bg-rose-50 flex items-center space-x-2 transition cursor-pointer font-semibold"
                  >
                    <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </header>
  );
}