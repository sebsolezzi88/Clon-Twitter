import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

import Page404 from './pages/Page404';

import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './pages/ProtectedRoute';
import PageMain from './pages/PageMain';
import { PageRegister } from './pages/PageRegister';
import { PageLogin } from './pages/PageLogin';
import PageProfile from './pages/PageProfile';
import { useAuthStore } from './storage/authStorage';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function App() {
 const { user, logout } = useAuthStore();

    useEffect(() => {
        // Solo valida si hay un usuario logueado
        if (user && user.token) {
            try {
                // Decodifica el token para obtener la información de la carga útil
                const decodedToken = jwtDecode(user.token);
                // El tiempo de caducidad (exp) está en segundos, y la fecha actual en milisegundos
                if (decodedToken.exp! * 1000 < Date.now()) {
                    console.log('Token expirado. Cerrando sesión.');
                    logout();
                }
            } catch (error) {
                // Maneja errores de token malformado o inválido
                console.error('Error al decodificar el token:', error);
                logout();
            }
        }
    }, [user, logout]);

  return (
    <>
    <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<PageMain/>}/>
        <Route path='/registro' element={<PageRegister/>}/>
        <Route path='/login' element={<PageLogin/>}/>
        <Route path='*' element={<Page404/>}/>

         <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<PageProfile />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
