
import './App.css'
import { Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from "./pages/Login";
import Secondpage from './pages/Secondpage';
import axios from 'axios';




function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path ='/' element={<Home/>}/>
      <Route path = '/register' element={<Register/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path='/secondpage' element={<Secondpage/>}/>
    </Routes>
      
    </>
  )
}

export default App
