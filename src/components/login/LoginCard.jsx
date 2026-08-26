// components/login/LoginCard.jsx
import { FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginCard() {
     const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsError, setTermsError] = useState("");

    const navigate = useNavigate();

    const handleRegister = () => {
        if (!termsAccepted) {
            setTermsError(
                "Please accept the Terms & Conditions before registering."
            );
            return;
        }

        setTermsError("");
        navigate("/registration/Page2");
    };
    return (
        <div className="login-card">
            <div className="login-card-body">

                <div className="text-center mb-4">
                    <img
                        src="/images/LoginClientLogo.png"
                        alt="Symbiosis International University"
                        className="login-logo"
                    />
                   
                    <div className="login-divider">
                        <span></span>
                        <FaShieldAlt />
                        <span></span>
                    </div>
                </div>

             <form>
    <div className="mb-3">
        <label className="form-label">SET ID / Email ID</label>

        <div className="login-input">
            <FaUser className="login-input-icon" />

            <input
                type="text"
                className="form-control"
                placeholder="Enter your SET ID / Email ID"
            />
        </div>
    </div>

    <div className="mb-3">
        <label className="form-label">Password</label>

        <div className="login-input">
            <FaLock className="login-input-icon" />

            <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
            />

            <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    </div>

    <div className="captcha-row mb-4">
        <div className="captcha-box">
            <span>7K4P9</span>
        </div>

        <input
            type="text"
            className="form-control captcha-input"
            placeholder="Enter captcha"
        />
    </div>

    <button type="submit" className="btn login-button">
        Sign In
    </button>

    <div className="text-center mt-2">
        <a href="#" className="forgot-password">
            Forgot Password?
        </a>
    </div>
</form>
      <div className="or-divider">
                    <span></span>
                    <span className="or-text">OR</span>
                    <span></span>
                </div>
<div className="terms-section">
    <label className="terms-label">
        <input
            type="checkbox"
            className="terms-checkbox"
            checked={termsAccepted}
            onChange={(e) => {
                setTermsAccepted(e.target.checked);
                setTermsError("");
            }}
        />

        <span>
            I agree to{" "}
            <a href="#" className="terms-link">
                Terms & Conditions
            </a>
        </span>
    </label>

    {termsError && (
        <div className="terms-error">
            <FaShieldAlt />
            <span>{termsError}</span>
        </div>
    )}
</div>
              <div className="register-section">
    <div className="register-text mb-2">
        Don't have an account yet?
    </div>

    <button
        type="button"
        className="register-button"
        onClick={handleRegister}
    >
        <FaUserPlus />
        Register
    </button>
</div>
            </div>
        </div>
    );
}

export default LoginCard;