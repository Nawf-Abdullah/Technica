import Welcome from '../components/Onboarding/Welcome'
import ChooseBloodGroup from '../components/Onboarding/ChooseBloodGroup'
import SetUpProfile from '../components/Onboarding/SetUpProfile'
import { useState } from 'react'
import './Onboarding.css'
import { CSSTransition } from 'react-transition-group'
import {useCookies} from 'react-cookie'

const Onboarding = ()=>{
    const [screen,setScreen] = useState(1)
    const [cookies,setCookie,removeCookie]=useCookies(['user'])
    const [formData,setFormData] = useState({
        user_id:cookies.UserId,
        first_name:'',
        last_name:'',
        dob_day:'',
        dob_month:'',
        dob_year:'',
        bloodGroup:'',
        age:'',
        profile_pic:'',
        allergic_to:'',
        disease:'',
        prescription:'',
        type:'patient',
        meetingLink:''
    })
    const screens = [<Welcome setScreen={setScreen}/>,
    <ChooseBloodGroup setScreen={setScreen}/>,
    <SetUpProfile setScreen={setScreen}/>,]
    console.log(screen)
    return <div className='onboarding'>
        <div className='onboarding-form'>
            <CSSTransition in={screen===1} unmountOnExit timeout={500} classNames="onboard-forms">
                <Welcome setScreen={setScreen} setFormData={setFormData} formData={formData}/>
            </CSSTransition>
            <CSSTransition in={screen===2} unmountOnExit timeout={500} classNames="onboard-forms">
                <ChooseBloodGroup setScreen={setScreen} formData={formData} setFormData={setFormData} />
            </CSSTransition>
            <CSSTransition in={screen===3} unmountOnExit timeout={500} classNames="onboard-forms">
                <SetUpProfile setScreen={setScreen} setFormData={setFormData} formData={formData} />
            </CSSTransition>
        </div>
    </div>
}

export default Onboarding