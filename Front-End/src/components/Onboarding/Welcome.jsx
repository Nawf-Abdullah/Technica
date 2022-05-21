import Button from '../Button/Button'
import {useState,useRef,useEffect} from 'react'
import AddPic from '../../images/user.png'
import '../../pages/Onboarding.css'
import LoadPic from '../../images/heart-beats.png'

function Welcome({screen,setScreen,setFormData,formData}) {
    const fileInput = useRef(null)
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    const [thefinalFile,setTheFinalFile] = useState() 



    useEffect(() => {
         if (!selectedFile) {
             setPreview(undefined)
             return
         }
         const objectUrl = URL.createObjectURL(selectedFile)
         setPreview(objectUrl)
         return () => URL.revokeObjectURL(objectUrl)
     }, [selectedFile])
     
     const handleSubmit = (e)=>{
        try{
            e.preventDefault()
        }catch(err){
            console.log(err)
        }
        setScreen(2)
    }

    useEffect(()=>{
        const changingProfile = async ()=>{
        setFormData((prevValue)=>{
            return {...prevValue,profile_pic:thefinalFile}
        })}
        changingProfile()
    },[thefinalFile])

    const handleChange = (e)=>{
        setFormData(prevValue=>{
            return {...prevValue,[e.target.name]:e.target.value}
        })
    }
    //<a href="https://www.flaticon.com/free-icons/heart-beat" title="heart-beat icons">Heart-beat icons created by flatart_icons - Flaticon</a>

     const onSelectFile = async (e) => {
         setPreview(LoadPic)
         if (!e.target.files || e.target.files.length === 0) {
             setSelectedFile(undefined)
             return
         }
         setSelectedFile(e.target.files[0])  
         var reader = new FileReader();
         reader.readAsDataURL(e.target.files[0]);
         reader.onload = async ()=>{
            setTheFinalFile(reader.result)
         }
     }
  
    return<div className="welcome">
        <h1>Hello, How should I call you?</h1>
        <form onSubmit={handleSubmit}>
            <div className="profile">
            <input type='file' ref={fileInput} hidden={true} onChange={onSelectFile}/>
            <img src={preview?preview:AddPic} name='profile_img' alt='profile' onClick={() => fileInput.current.click()} />
            </div>
            <div className='name'>
                <input type='text' onChange={handleChange} name='first_name' placeholder='First Name' value={formData.first_name}/>
                <input type='text' onChange={handleChange} name='last_name' placeholder='Last Name' value={formData.last_name}/>
            </div>
            <Button>Next</Button>
        </form>
    </div>
}

export default Welcome