import './ProfileCard.css'

const ProfileCard = ({user,show_addons})=>{
    const year = new Date().getFullYear()
    console.log(year)
    return <div className='profile-card'>
        <img src={user.profile_pic} alt=''/>
        <h2>{user.first_name} {user.last_name}</h2>
        <div>
            <div className='details'>
                <div className='weight'>
                    <h3>Weight</h3>
                    <p>{user.weight} kg</p>
                </div>
                <div className='height'>
                    <h3>Height</h3>
                    <p>{user.height} cm</p>
                </div>
                <div className='status'>
                    <h3>Health Status</h3>
                    <p>Healthy</p>
                </div>
            </div>
            {show_addons&&
            <div className='details'>
                <div className='allergic-to'>
                    <h3>Allergies</h3>
                    <p>{user.allergic_to}</p>
                </div>
                <div className='age'>
                    <h3>Age</h3>
                    <p>{(year-Number(user.dob_year))}</p>
                </div>
                <div className='prescition'>
                    <h3>Tablets</h3>
                    <p>{user.prescription}</p>
                    </div>
            </div>}
        </div>
    </div>
}

export default ProfileCard