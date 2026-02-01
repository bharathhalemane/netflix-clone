import './Account.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
const Account = () => {
    const navigate = useNavigate()
    const userdata= JSON.parse(localStorage.getItem("userData"))
    console.log(userdata)
    const {username, password} = userdata
    const hidePassword = "*".repeat(password.length)

    const logout = () => {
        localStorage.removeItem("userData")
        Cookies.remove("jwt_token")
        navigate("/login")
    }
    
    return <div className='account-page'>
        <Navbar />
        <div className='account-details-container'>
            <h1>Account</h1>
            <hr />
            <div className='membership-details'>
                <h1>Member ship</h1>
                <div>
                    <p className='username'>{username}@gmail.com</p>
                    <p className='password'>Password: {hidePassword}</p>
                </div>
            </div>
            <hr />
            <div className='planDetails'>
                <h1>Plan Details</h1>
                <p>Premium <span>Ultra HD</span></p>
            </div>
            <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
        <Footer />
    </div>
}

export default Account 