import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

import Page404 from './pages/Page404';

import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './pages/ProtectedRoute';
import PageMain from './pages/PageMain';
import { PageRegister } from './pages/PageRegister';
import { PageLogin } from './pages/PageLogin';
import PageProfile from './pages/PageProfile';

function App() {


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
