import './MainPage.css'
import Player from '../Player/Player'
import { Vaccines } from '@mui/icons-material'
import  Vaccine from '../../images/vaccine.png'
import Button from '../Button/Button'
import ProfileCard from '../Card/ProfileCard'
import Clock from '../Clock/Clock'
const MainPage = ({tracks,trackId,setTrackId,user})=>{
    return <div className='MainPage'>
    <div>
        <div className='get-your-vaccines'>
            <img src={Vaccine} alt='vaccine'/>
            <div><h2>Get your Vaccines Fast!</h2>
                <p>Still not vaccinated?</p>
                <Button><Vaccines /> Get vaccinated</Button>
            </div>
        </div>
        <Clock />
    </div>
        
        <div>
            <div className='relax-you'>
                <Player tracks={tracks} trackId={trackId} setTrackId={setTrackId} />
                {user&&<ProfileCard user={user}/>}
            </div>
        </div>
    </div>
}

export default MainPage