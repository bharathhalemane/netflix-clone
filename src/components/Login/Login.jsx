import "./Login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react"
import AuthContext from "../../context/AuthContext/AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const onChangeUsername = e => {
        setUsername(e.target.value);
    }

    const onChangePassword = e => {
        setPassword(e.target.value);
    }

    const onSubmitSuccess = jwtToken => {
        Cookies.set("jwt_token", jwtToken, { expires: 30 });
        login({
            username,
            password
        })
        navigate("/");
    }

    const onSubmitLoginForm = async (e) => {
        e.preventDefault();
        try {
            const url = "https://apis.ccbp.in/login"

            const options = {
                method: "POST",
                body: JSON.stringify({ username, password })
            }
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                setPassword("");
                setUsername("");
                setError("");
                onSubmitSuccess(data.jwt_token);
            } else {
                setError(data.error_msg);
            }
        } catch (err) {
            console.log(err)
        }

    }


    return <div className="login-page">
        <div>
            <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1769703370/Group_7399_h5htip.png" alt="Netflix Logo" />
        </div>
        <div className="login-form-container">
            <form className="form-container" onSubmit={onSubmitLoginForm}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">USERNAME</label><br />
                    <input type="text" id="username" placeholder="Enter Username" value={username} onChange={onChangeUsername} />
                </div>
                <div>
                    <label htmlFor="password">PASSWORD</label><br />
                    <input type="password" id="password" placeholder="Enter Password" value={password} onChange={onChangePassword} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
}

export default Login;