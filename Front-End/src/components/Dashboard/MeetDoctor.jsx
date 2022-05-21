import './MeetDoctor.css'
import Button from '../Button/Button'
import ProfileCard from '../Card/ProfileCard'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {useCookies} from 'react-cookie'

const MeetDoctor = ({user})=>{
    const [patient,setPatient] = useState(user)
    const [cookie,setCookies,removeCookie] = useCookies(['user'])
    const [isDisabled,setIsDisabled] = useState(false)
    const [reason,setReason] = useState('')

    const handleChange = (e)=>{
        setReason(e.target.value)
    }
    useEffect(()=>{
        const fetchUser =async ()=>{
            const response = await axios.get(`http://localhost:8000/user?userId=${cookie.UserId}`)
            setPatient(response.data[0])
            if(patient.meetingLink.length>=4){
                setIsDisabled(false)
            }
        }

        setInterval(()=>{
            fetchUser()
        },30000)
    })
    return <div className='meetdoctor'>
            <ProfileCard user={user}/>
            <input type='text' name='reason' onChange={handleChange} value={reason} required/>
            <Button handleClick={async ()=>{
              if(patient.meetingLink.length<4) { setIsDisabled(true)
                console.log(user)
                const patient_id = await user.user_id
                const name = await user.first_name
                console.log(patient_id,name)
                const response = await axios.put(`http://localhost:8000/waiting/${name}/${patient_id}/${reason}`) 
                console.log(response)}else{
                    window.open(patient.meetingLink, "_blank")
                }
            }} Disabled={isDisabled} >{isDisabled?<>Please Stay</>:<>Meet your doctor</>}</Button>
    </div>
}

export default MeetDoctor