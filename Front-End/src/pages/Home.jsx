import './Home.css'
import VideoCall2 from '../images/videocall1.png'
import Button from '../components/Button/Button'
import Feature1 from '../images/doctor.png'
import Feature2 from '../images/undraw_fitness.svg'
import Feature3 from '../images/undraw_private_data.svg'
import { Vaccines } from '@mui/icons-material'
import Vaccine from '../images/vaccine.png'
import { Newspaper } from '@mui/icons-material'
import Newsletter from '../images/undraw_mailbox.svg'
import AuthModal from '../components/AuthModal/AuthModal'
import {CSSTransition} from 'react-transition-group';

const Home = ({showModal,setShowModal,isSignUp,setIsSignUp})=>{


    return <div className="home">
        <CSSTransition in={showModal} unmountOnExit timeout={500} classNames="theauthmodal">
            <AuthModal isSignUp={isSignUp} setShowModal={setShowModal}/>
        </CSSTransition>
       
        <section className="main-sections">
            <div>
                <h1>Tech Hospital <br/><span>Your virtual health companion</span></h1>
                <p className="tagline">500+ doctors available to help you</p>
                <div className='button-container'>
                    <Button handleClick={()=>{
                        setIsSignUp(true)
                        setShowModal(true)
                        console.log('showing Modal')
                    }}>Get Started </Button>
                    <Button styles='secondary' handleClick={()=>{
                        setIsSignUp(false)
                        setShowModal(true)
                        console.log('showing Modal')
                    }}>Log in</Button>
                </div>
            </div>
            <img src={VideoCall2} alt=""/>
        </section>
        <section className='features'>
            <h2>Features</h2>
            <div className='features-container'>
                <div className='feature'>
                    <img src={Feature1} alt='Doctor talking'/>
                    <p className='tagline'>
                        600+ Virtually trained imaginary doctors ready to help
                    </p>
                </div>
                <div className='feature'>
                    <img src={Feature2} alt=' fitness'/>
                    <p className='tagline'>
                        Daily health and fitness tips
                    </p>
                </div>
                <div className='feature'>
                    <img src={Feature3} alt="privacy"/>
                    <p className='tagline'>
                        We keep your information private
                    </p>
                </div>
            </div>
        </section>
        <section className='vaccine'>
        <h2>Vaccine! Vaccine!</h2>
            <div className='inner-vaccine'>
                <img src={Vaccine} alt='vaccine'/>
                <div>
                    <p className='tagline'>Come and get your Covaxin fast!<br /> Book your slots</p>
                  <Button>Get vaccinated <Vaccines /></Button>
                </div>
            </div>
        </section>
        <section className='footer'>
            <h2>Sign up for our news letter</h2>
            <div>
                <img src={Newsletter} alt=''/>
                <form>
                    <input type='email' name='email'/>
                    <Button styles='secondary'>Signup <Newspaper /></Button>
                </form>
            </div>
        </section>
    </div>
}

export default Home