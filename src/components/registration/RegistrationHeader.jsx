import { useNavigate } from "react-router-dom";
import "../../styles/RegHeader.css";
 
function RegistrationHeader() {
    const navigate = useNavigate();
    return (
        <header className="registration-header">

            <div className="registration-logo">
                <img src="/images/clientlogin.png" alt="Symbiosis International University" />
            </div>

            <div className="registration-login">
                <span>Already have an account?</span> 
                <button type="button" className="registration-signin"  onClick={() => navigate("/")} >
                    Sign In
                    <i className="fa-solid fa-arrow-right"></i>
                </button>
            </div>

        </header>
    );
}

export default RegistrationHeader;