import { useState,useEffect } from 'react'
import Button from '../Button/Button'
import {CSSTransition} from 'react-transition-group';

function ChooseBloodGroup({screen,setScreen,formData,setFormData}) {
    const [selectedChoice,setSelectedChoice] = useState() 
    const bloodGroup = ['O +ve','O -ve','A +ve','A -ve',"B +ve","B -ve","AB+ve","AB-ve"]
    const handleSubmit = (e)=>{
        try{
            e.preventDefault()
        }catch(err){
            console.log(err)
        }
        console.table(formData)
        setScreen(3)
    }

    useEffect(()=>{
        setFormData(prevValue=>{
            return {...prevValue,bloodGroup:bloodGroup[selectedChoice]}
        })
    },[selectedChoice])

    const handleChange = (e)=>{
        setFormData(prevValue=>{
            return {...prevValue,[e.target.name]:e.target.value}
        })
    }
    return <div className="chooseBlood">
        <form onSubmit={handleSubmit}>
       <h1>What describes you?</h1>
       <h2 className='bloody'>Select your Blood Group</h2>
        <div className='cardholder'>
            {bloodGroup.map((field,index)=>{return <div key={index} 
            className={index===selectedChoice?'card active':'card'} 
            onClick={()=>{ setSelectedChoice(index)}}><h3>{field}</h3></div>})}
        </div>
    <div className='height-weight'>
        <input onChange={handleChange} type='number' name='height' placeholder='height cm'/>
        <input onChange={handleChange} type='number' name='weight' placeholder='weight kg'/>
    </div>
        <Button type='secondary'>Create your profile</Button>
        </form>
    </div>
}

export default ChooseBloodGroup