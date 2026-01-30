import './Navbar.css'
import {Link} from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";

const Navbar = props => {
    const { activeId } = props

    
    return (
        <nav className="navbar">
            <div className='links-container'>
                <div className="navbar-logo">
                    <img
                        src="https://res.cloudinary.com/dfomcgwro/image/upload/v1769703370/Group_7399_h5htip.png"
                        alt="Netflix Logo"
                    />
                </div>
                <div className="navbar-links">
                    <Link to="/"><button className={activeId === "home" ? "active-button" : ""} type="button">Home</button></Link>
                    <Link to="/popular"><button className={activeId === "popular" ? "active-button" : ""} type="button">Popular</button></Link>
                </div>
            </div>
            <div className='avatar-container'>
                <div className="navbar-search">
                    <Link to="/search"><IoMdSearch color="white" size={20} /></Link>
                </div>
                <div className="navbar-avatar"> 
                    <Link to="/profile"><img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1769708073/Group_anj9qw.png" alt="User Avatar" width={30}/></Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar