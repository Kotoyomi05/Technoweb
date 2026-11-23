// src/data/userData.js

export const usersList = [
  {
    id: 1,
    nombre: 'Administrador General',
    email: 'admin@techserviceweb.com',
    password: 'Admin123',
    rol: 'Administrador',
    telefono: '(555) 100-2000',
    direccion: 'Sede Principal - Taller Central',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 2,
    nombre: 'Jack Rowe',
    email: 'tecnico@techserviceweb.com',
    password: 'Tecnico123',
    rol: 'Tecnico',
    telefono: '(555) 123-4567',
    direccion: 'Banco de Trabajo #2',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 3,
    nombre: 'Cliente Demo',
    email: 'cliente@techserviceweb.com',
    password: 'Cliente123*',
    rol: 'Cliente',
    telefono: '(555) 987-6543',
    direccion: 'Calle 10 # 5-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
  },
  {
    id: 4,
    nombre: 'Cliente Demo',
    email: 'ladie7854@gmail.com',
    password: 'Cliente123*',
    rol: 'Cliente',
    telefono: '(555) 987-6543',
    direccion: 'Calle 10 # 5-20',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256'
  }
];

// Mantenemos mockUser por compatibilidad con vistas de perfil existentes
export const mockUser = usersList[1];