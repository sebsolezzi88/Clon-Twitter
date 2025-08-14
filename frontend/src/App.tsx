import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/registro' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
