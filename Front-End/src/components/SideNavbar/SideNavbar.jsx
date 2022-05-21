import './SideNavbar.css'
import { Dashboard } from '@mui/icons-material'
import { Healing } from '@mui/icons-material'
import { Flag } from '@mui/icons-material'
import { AddAlert } from '@mui/icons-material'
import { Phone } from '@mui/icons-material'
import { Bookmark } from '@mui/icons-material'
import {useCookies} from 'react-cookie'
import { useState } from 'react'
import { LogoutSharp } from '@mui/icons-material'

const SideNavbar = ({color,setColor,screenId,setScreenId,trackId})=>{

    const [cookie,setCookie,removeCookie] = useCookies(['user'])


    return <div className='side-navbar'>
        <ul className={trackId>=0&&'light'} >
            <li className={screenId===0&&'active'} onClick={()=>setScreenId(0)}><Dashboard /><span>Dashboard</span></li>
            <li className={screenId===1&&'active'} onClick={()=>setScreenId(1)}><Healing /><span>Health Status</span></li>
            <li className={screenId===2&&'active'} onClick={()=>setScreenId(2)}><Phone /><span>Speak to the Doctor</span></li>
            <li><AddAlert /><span>Emergency </span></li>
            <li><Flag /><span>Report</span></li>
            <li className={screenId===3&&'active'} onClick={()=>setScreenId(3)}><Bookmark /><span>Book appointment</span></li>
            <li  onClick={()=>{
                removeCookie('UserId',cookie.UserId)
		        removeCookie('AuthToken',cookie.AuthToken)
                window.location.href = '/'
            }}><LogoutSharp /><span>Logout</span></li>
        </ul>
    </div>
}

export default SideNavbar