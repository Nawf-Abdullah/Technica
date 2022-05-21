import './BookAppointment.css'
import { FormControl,InputLabel,Select,MenuItem } from '@mui/material'

const BookAppointment = ()=>{
    const handleChange = (e)=>{
        console.log(e.target.value)
    }
    return <form>
        <input name='date' type='date' className='date'/>
        <FormControl fullWidth>
        <InputLabel id="place">Place</InputLabel>
        <Select
            labelId="place"
            id="place"
            value={''}
            label="place"
            onChange={handleChange}
        >
            <MenuItem value={'Delhi'}>Delhi</MenuItem>
            <MenuItem value={'Chennai'}>Chennai</MenuItem>
            <MenuItem value={'Hyderabad'}>Hyderabad</MenuItem>
            <MenuItem value={'Bangalore'}>Bangalore</MenuItem>
        </Select>
        </FormControl>
    </form>
}

export default BookAppointment 