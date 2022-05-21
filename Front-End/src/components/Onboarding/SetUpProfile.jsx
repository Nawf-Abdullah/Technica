import Button from '../Button/Button'
import {CSSTransition} from 'react-transition-group';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function SetUpProfile({screen,setScreen,formData,setFormData}) {
    const navigate = useNavigate() 
    const handleChange = (e)=>{
		const value = e.target.type==='checkbox'?e.target.checked:e.target.value;
		const name = e.target.name;
		console.log('value',value);
		console.log('name',name);
		setFormData((prevState)=>({
			...prevState,
			[name]:value
		}))
    }
    const handleClick = ()=>{
        console.log('clicked')
    }

    const handleSubmit =async (e)=>{
        try{
            e.preventDefault()
        }catch(err){
            console.log(err)
        }
        setScreen(3)
        console.table(formData)
        try{
            const response = await axios.put(`http://localhost:8000/user`,{formData:formData})
            console.log(response)
            const success = response.status ===200;
            console.log('submitted')
            if(success) navigate('/dashboard');
            
        }catch(err){
            console.log(err)
        }
    }
    
    return (<div className="SetUp"> <h1>Set up your profile</h1>
        <form onSubmit={handleSubmit}>
            <div className='gender-dob'>
            <div>
            <h2 className='label'>Gender</h2>
			    <div className='multiple-input-container'>
					<input 
						id="man-gender-identity"
						type='radio'
						name='gender_identity'
						value="man"
						onChange={handleChange}
						// checked={formData.gender_identity==='man'}
					/>
				<label htmlFor='man-gender-identity'>Man</label>
					<input 
						id="woman-gender-identity"
						type='radio'
						name='gender_identity'
						placeholder='DD'
						value="woman"
						onChange={handleChange}
						// checked={formData.gender_identity==='woman'}
					/>
				<label htmlFor='woman-gender-identity'>Woman</label>
			    </div>
            </div>
            <div>
                <h2 className='label'>Your Birthday</h2> 
                <div className='date-of-birth'>
                    <input type='number' id='dob_day' name='dob_day' placeholder='DD' onChange={handleChange} value={formData.dob_day} required/>
                    <input type='number' id='dob_month' name='dob_month' placeholder='MM' onChange={handleChange} value={formData.dob_month} required/>
                    <input type='number' id='dob_year' name='dob_year' placeholder='YYYY' onChange={handleChange} value={formData.dob_year} required/>
                </div>
            </div>
            <input type='text' placeholder='Allergies' name='allergic_to' onChange={handleChange} value={formData.allergic_to} required/>  
            </div>
            <Button type='secondary' fun={handleClick}>Next</Button>

        </form>
    </div>)
}
export default SetUpProfile