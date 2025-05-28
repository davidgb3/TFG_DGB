import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // Mientras se carga la información del usuario, podemos mostrar un loading o null
    if (loading) {
        return null;
    }

    // Si no hay usuario o el usuario no es admin, redirigir al inicio
    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // Si el usuario es admin, mostrar el contenido protegido
    return children;
};

export default AdminProtectedRoute;