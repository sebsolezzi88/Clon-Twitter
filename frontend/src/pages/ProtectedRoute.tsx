import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../storage/authStorage';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, renderiza la ruta anidada
  return <Outlet />;
};

export default ProtectedRoute;