import './Player.css'
import { PlayCircle } from '@mui/icons-material'
import { useState } from 'react'

const Player = ({tracks,trackId,setTrackId})=>{
    const [theoldAudio,setTheOldAudio] = useState(new Audio())

    const changeTrack = async (track,index)=>{
        await theoldAudio.pause()
        setTrackId(index)
        let audio = await new Audio(track.audio)
        await setTheOldAudio(audio)
        theoldAudio.play()
    }
    return <div className='player'>
        <ul>
            {tracks.map((track,index)=>{
                console.log(index)
               return <li key={index}><PlayCircle onClick={()=>changeTrack(track,index)}/> <span><h4>{track.name}</h4><p className='credit'>{track.credit}</p></span></li>
            })}
        </ul>
    </div>
}

export default Player