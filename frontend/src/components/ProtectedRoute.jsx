import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const { isAuthenticated, loading } = useAuth();

  // Esperar mientras se verifica la autenticación
  if (loading) {
    return <div>Cargando...</div>; // Puedes usar un componente de loading más elaborado
  }

  // Una vez que termine la carga, decidir si redirigir o mostrar el contenido
  return !isAuthenticated ? (
    <Navigate to="/login" replace={true} />
  ) : (
    children
  );
}

export default ProtectedRoute