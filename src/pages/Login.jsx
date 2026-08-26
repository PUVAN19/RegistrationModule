import InformationPanel from "../components/login/InformationPanel";
import LoginCard from "../components/login/LoginCard";
import "../styles/login.css";

// Login.jsx
function Login() {
    return (
        <main className="login-page">
            <div className="login-background"></div>
            <div className="login-overlay"></div>

            <div className="login-container">
                
                    <div className="login-left">
                         <InformationPanel />
                         <div className="left-footer">
                            © All Rights Reserved.
                            <span>Technology by </span>
                            <a
                                href="https://ishinfo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ISHINFO
                            </a>
                        </div>
                    </div>
                    

                <div className="login-right">
                    <LoginCard />
                </div>
                
            </div>

           
        </main>
    );
}

export default Login;

