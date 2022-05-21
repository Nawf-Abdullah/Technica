import './Navbar.css'
import Cover from '../../images/logos/cover.png'
import { useState } from 'react';
import {CSSTransition} from 'react-transition-group';
import { Menu } from '@mui/icons-material'
import { Close } from '@mui/icons-material';
const {v4:uuidv4} = require('uuid')

const Navbar = ({isLoggedIn,showModal,setShowModal,isSignUp,setIsSignUp})=>{
    const [showElements,setShowElements] = useState(false)
    const NavElements =<><h3>Home</h3>
    <h3>About us</h3>
    <h3 onClick={()=>{
        setIsSignUp(false)
        setShowModal(true)
        console.log('showing Modal')
    }}>Login</h3>
    <h3 onClick={()=>{
        setIsSignUp(true)
        setShowModal(true)
    }}>Sign up</h3>
    <h3>Plans</h3>
    <h3>Book an appointment</h3></>
    return <nav>
        <img className='logo' src={Cover} alt='company logo'/>
        <i className='hamburger' onClick={()=>setShowElements(!showElements)}>{!showElements?<Menu />:<Close />}</i>
        <div key={uuidv4} className={`nav-list`}>
            {NavElements}
        </div>
        <CSSTransition in={showElements} unmountOnExit timeout={500} classNames="menu-primary">
           <div className='nav-list show please'>
            {NavElements}
           </div>
        </CSSTransition>
        
    </nav>
}

export default Navbar;