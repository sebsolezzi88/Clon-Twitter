import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Page404 from './pages/Page404';
function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/registro' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Page404/>}/>
      </Routes>
    </>
  )
}

export default App
