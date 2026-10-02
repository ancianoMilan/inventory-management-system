import "./css/login.css";
import { useState } from "react";
function Login({onLogin}){ 
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        onLogin(username, password);
    }
    return(
        <>
            <div className="main">
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <h2>Login</h2>
                            <p>Enter your credentials to continue</p>
                        </div>
                        
                        <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
                            <div className="inputContainer">
                                    <div className="form-group">
                                        <div className="input-wrapper">
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email" 
                                                required 
                                                autoComplete="email"
                                                value={username}
                                                onChange={(e) => setUserName(e.target.value)}
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                        <span className="error-message" id="emailError"></span>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-wrapper">
                                            <input 
                                                type="password" 
                                                id="password" 
                                                name="password" 
                                                required 
                                                autoComplete="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label htmlFor="password">Password</label>
                                            <button type="button" className="password-toggle" id="passwordToggle" aria-label="Toggle password visibility">
                                                <span className="toggle-icon"></span>
                                            </button>
                                        </div>
                                        <span className="error-message" id="passwordError"></span>
                                    </div>
                                    
                            </div>

                            <div className="forgotPassword-container">
                                <div>
                                    <p className="accountExampleGuide"><span>Email</span><span>Password</span></p>
                                    <p className="accountExample"><span>admin@gmail.com</span> <span>test123</span></p>
                                    <p className="accountExample"><span>manager@gmail.com</span> <span>test123</span></p>
                                    <p className="accountExample"><span>employee@gmail.com</span> <span>test123</span></p>
                                </div>
                            </div>

                            <button type="submit" className="login-btn">
                                <span className="btn-text">Login</span>
                                <span className="btn-loader"></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;