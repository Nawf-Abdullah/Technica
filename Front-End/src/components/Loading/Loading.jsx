import './Loading.css'
import LoaderImage from '../../images/heart-beats.png'

const Loading = ()=>{
    return <div className='loading'>
        <img src={LoaderImage} alt='loading' />
        <p>Loading... </p>
    </div>
}

export default Loading