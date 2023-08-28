import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from './component/register';
import Login from './component/login';
import Wallet from './component/wallet';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div>
      <BrowserRouter>
          <Toaster/>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
          <Route path="/home" element={<Wallet/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
