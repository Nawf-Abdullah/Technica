import axios from 'axios'
import { useState } from 'react'
import Button from '../Button/Button'
import ProfileCard from '../Card/ProfileCard'
import './DoctorBoard.css'

const DoctorBoard = ({user})=>{
    const [patient,setPatient] = useState(null)
    const [meetingLink,setMeetingLink] = useState('')
    const [prescription,setPrescription] = useState(user.prescription)
    const handleChange = (e)=>{
        setMeetingLink(e.target.value)
    }
    const [sentlink,setSentLink] = useState(false)
    const handleSubmit = async (e)=>{
        try{e.preventDefault()}catch(err){console.log(err)}
       const response = await axios.put('http://localhost:8000/meetinglink',
       {patient_id:patient.user_id,link:meetingLink})
       setSentLink(true)
    }

    const handlePrescritionChange = (e)=>{
        setPrescription(e.target.prescription)
    }
    return <div className='doctor-board'>
        {!patient?<ul>
            {user.waiting_list.map((patient,index)=>{
                return <li key={index} ><h3>{patient.name}</h3> <p>{patient.reason}</p><Button  handleClick={async ()=>{
                    console.log(patient.patient_id)
                    try{
                    const response =await axios.get(`http://localhost:8000/user?userId=${patient.patient_id}`)
                    setPatient(response.data[0])
                    }catch(err){
                        console.log(err)
                    }
                }}>Meet</Button><Button styles='secondary' handleClick={async (e)=>{
                    const name = patient.name
                    await axios.put(`http://localhost:8000/dismiss/${name}/${patient.patient_id}`) 
                    console.log('removed',name)
                }}>Remove</Button></li>
            })}
        </ul>:<>
            <form onSubmit={handleSubmit}>
                <ProfileCard user={patient} show_addons={true} />
                {!sentlink?<input 
                    type='url' 
                    name='google_meet_link' 
                    placeholder='Paste the google meet link here'
                    onChange={handleChange}
                    value={meetingLink}
                    required
                />:<><h1>Connect your google meet in a new tab</h1>
                    
                        <textarea name='precription' onChange={handlePrescritionChange} value={prescription}></textarea>
                        <Button handleClick={async (e)=>{
                            try{
                                e.preventDefault()
                            }catch(err){
                                console.log(err)
                            }
                            await axios.put(`http://localhost:8000/prescription/${patient.user_id}`,{prescription:prescription})
                            console.log('done')
                        }}>Done</Button>
                
                </>}
                <Button>Join</Button>
            </form>
        </>}
    </div>
}

export default DoctorBoard