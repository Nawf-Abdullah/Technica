import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState,useEffect } from 'react';
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard';

function App() {
  const [showAuthModal,setShowAuthModal] = useState(false)
  const [isSignUp,setIsSignUp] = useState(false)
  const [location,setLocation] = useState('')
  useEffect(()=>{
    setInterval(()=>{setLocation(window.location.href.split('/')[3])
    console.log(window.location.href.split('/')[3])
  },2000)
  },[location])
  return (
    <div className="App">
     {location!='dashboard'&&<Navbar isLoggedIn={false} showModal={showAuthModal} setShowModal={setShowAuthModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>}
     <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home showModal={showAuthModal} setShowModal={setShowAuthModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp}/>}/>
        <Route path={"/onboarding"} element={<Onboarding/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
