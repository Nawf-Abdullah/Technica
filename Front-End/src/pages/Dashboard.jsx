import './Dashboard.css'
import SideNavbar from '../components/SideNavbar/SideNavbar'
import MainPage from '../components/Dashboard/MainPage'
import Nature from '../Videos/Nature.mp4'
import Sea from '../Videos/Beach.mp4'
import Flying from '../Videos/Flying.mp4'
import BeachAudio from '../Audios/Beach.mp3'
import ForestAudio from '../Audios/Forest.mp3'
import BirdsAudio from '../Audios/Birds.mp3'
import { useState,useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import HealthStatus from '../components/Dashboard/HealthStatus'
import MeetDoctor from '../components/Dashboard/MeetDoctor'
import BookAppointment from '../components/Dashboard/BookAppointment'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import DoctorBoard from '../components/Dashboard/DoctorBoard'
import Loading from '../components/Loading/Loading'

const Dashboard = ()=>{
    const tracks = [
        {name:'Nature',video:Nature,audio:ForestAudio,credit:'Video by Kelly L'},
        {name:'Sky',video:Flying,audio:BirdsAudio,credit:'Video by Pixabay'},
        {name:'Beach', video:Sea,audio:BeachAudio,credit:'Video by Enrique Hoyos'}
    ]
    const [trackId,setTrackId] = useState(-1)
    const [screenId,setScreenId] = useState(0)
    const [color,setColor] = ('normal')
    const [cookie,setCookie,removeCookie] = useCookies(['user'])
    const [user,setUser] = useState(null)
    useEffect(()=>{
        
        const fetchData = async ()=>{
        
        const response = await axios.get(`http://localhost:8000/user?userId=${cookie.UserId}`)
        setUser(response.data[0])
        console.log(user)
    }
    fetchData()
},[])
    
useEffect(()=>{
    const resetLink = async ()=>{
        await axios.put('http://localhost:8000/meetinglink',{patient_id:cookie.UserId,link:''})
    }
},[user])

    return <>{user ? <>
    {trackId>=0&&<video autoPlay muted loop id="backgroundVideo">
        <source src={tracks[trackId].video} type="video/mp4" />
    </video>}
    <div className='dashboard'>
        <div className='real-dashboard'>
        <SideNavbar color={color} setColor={setColor} screenId={screenId} setScreenId={setScreenId} trackId={trackId} />
       {user.type==='patient'?<> <CSSTransition in={screenId===0} unmountOnExit timeout={500} classNames="dashboard-element">
            <MainPage user={user} tracks={tracks} trackId={trackId} setTrackId= {setTrackId}/>
        </CSSTransition>
        <CSSTransition in={screenId===1} unmountOnExit timeout={500} classNames="dashboard-element">
            <HealthStatus user={user} />
        </CSSTransition>
        <CSSTransition in={screenId===2} unmountOnExit timeout={500} classNames="dashboard-element">
            <MeetDoctor user={user} />
        </CSSTransition>
        <CSSTransition in={screenId===3} unmountOnExit timeout={500} classNames="dashboard-element">
            <BookAppointment user={user} />
        </CSSTransition></>:<DoctorBoard user={user} />}
        </div>
    </div></>:<Loading />}
    </>
}

export default Dashboard