import { useState } from "react";
import "../styles/login.scss"
import loginpng from '../assets/loginLend.png'
import logosvg from '../assets/Group.svg'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const gotoDashboard = (e: React.FormEvent) => {
        e.preventDefault();
        const email = (document?.querySelector('input[type="email"]') as HTMLInputElement)?.value;
        const password = (document?.querySelector('input[type="password"]') as HTMLInputElement)?.value;
        const userData = { email, password, loggedInAt: new Date().toISOString() };
        localStorage.setItem("lendsqrUser", JSON?.stringify(userData));
        navigate('/dashboard/users');
    };


    return (
        <div className="login-container">
            <div className="login-left">
                <img src={logosvg} className="logo" alt="The Lendsqr" />
                <img src={loginpng} className="illustration" alt="The image" />
            </div>

            <div className="login-right">
                <div className="login-box">
                    <h1 className="title">Welcome!</h1>
                    <p className="subtitle">Enter details to login.</p>

                    <form className="form" onSubmit={gotoDashboard}>
                        <div className="input-group">
                            <input type="email" placeholder="Email" required />
                        </div>

                        <div className="input-group password-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                            />
                            <span
                                className="show-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </span>
                        </div>

                        <a href="#" className="forgot-link">
                            FORGOT PASSWORD?
                        </a>
                        <button type="submit" className="login-btn">
                            LOG IN
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
