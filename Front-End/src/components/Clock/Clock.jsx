import './Clock.css'
import { useState,useEffect } from 'react'

const Clock = ()=>{
    const [timerDate,setTimerDate] = useState(new Date())

    function refreshClock() {
        setTimerDate(new Date());
    }
    const timerId = setInterval(refreshClock, 1000);  
    return <div className='clock'><p>{timerDate.toLocaleTimeString()}</p></div>
}

export default Clock