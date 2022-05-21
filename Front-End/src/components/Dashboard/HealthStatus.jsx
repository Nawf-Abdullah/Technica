import './HealthStatus.css'
// import Anatomy from '../Anatomy/Anatomy'

const HealthStatus = ({user})=>{
    return <div className='health-status'>
        <div className='anatomy-model'>
            <p>Couldn't load the model</p>
        </div>
        <div>
            <div className='allergic-report'>
                <h2>Allergic to</h2>
                <p>{user.allergic_to}</p>
            </div>
            <div className='diagnosed'>
                <h2>Diagonse Disease</h2>
                <p>Nothing</p>
            </div>
            <div className='prescription'>
                <h2>Prescription</h2>
                <p>1 {user.prescription}</p>
            </div>
        </div>
    </div>
}

export default HealthStatus