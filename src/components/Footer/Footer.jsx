import './Footer.css'
import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return <div className="footer-section">
        <div className='contact-icons'>
            <FaGoogle color='#f3f3f3'/>
            <FaTwitter color='#f3f3f3'/>
            <FaInstagram color='#f3f3f3'/>
            <FaYoutube color='#f3f3f3'/>
        </div>
        <div className="contact"><p>Contact Us</p></div>
    </div>
}

export default Footer