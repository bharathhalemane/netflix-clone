import './NotFound.css'
import {Link} from 'react-router-dom'
const NotFound = () => {
    return <div className="notfound-page">
        <h1>Lost Your Way?</h1>
        <p>we are sorry the page you requested could not be found <br/>Please go back to the homepage.</p>
        <Link to="/"><button>Go to Home</button></Link>
    </div>
}

export default NotFound 
