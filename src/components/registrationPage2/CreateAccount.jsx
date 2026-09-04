import { useState } from "react";
import { createStudentAccount } from "../../api/accountApi";
import { useNavigate } from "react-router-dom";

function CreateAccount({studentId,email,onAccountCreated}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         setError("");

//         if (password.length < 6) {
//             setError("Password must be at least 6 characters.");
//             return;
//         }

//         if (password !== confirmPassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         setIsCreating(true);

//         try {
//             // const response = await fetch(
//             //     "https://localhost:7001/api/StudentAccount/create",
//             //     {
//             //         method: "POST",
//             //         headers: {
//             //             "Content-Type": "application/json"
//             //         },
//             //         body: JSON.stringify({
//             //             studentId: studentId,
//             //             email: email,
//             //             password: password,
//             //             confirmPassword: confirmPassword
//             //         })
//             //     }
//             // );

//             // const result = await response.json();

//             // if (!response.ok) {
//             //     throw new Error(
//             //         result.message || "Unable to create account."
//             //     );
//             // }
// const result = await createStudentAccount({
//     studentId,
//     email,
//     password,
//     confirmPassword
// });
//             console.log("Account created:", result);

//             setSuccess(true);

//             if (onAccountCreated) {
//                 onAccountCreated(result);
//             }

//         } catch (error) {
//             console.error("Create account error:", error);

//             setError(
//                 error.message ||
//                 "Something went wrong while creating your account."
//             );
//         } finally {
//             setIsCreating(false);
//         }
//     };
const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setIsCreating(true);

    try {

        const result = await createStudentAccount({
            studentId,
            email,
            password,
            confirmPassword
        });

        console.log("Account created:", result);

        setSuccess(true);

        if (onAccountCreated) {
            onAccountCreated(result);
        }

    } catch (error) {

        console.error("Create account error:", error);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.title ||
            error?.message ||
            "Something went wrong while creating your account.";

        setError(message);

    } finally {

        setIsCreating(false);

    }
};
  if (success) {
    return (
        <div className="account-step">

            <div className="account-card account-success">

                <div className="account-success-icon">
                    <i className="fa-solid fa-check"></i>
                </div>

                <h2>Account Created Successfully</h2>

                <p className="account-success-subtitle">
                    Your student login account has been created successfully.
                    You can now use your credentials to login.
                </p>

                <div className="account-credentials">

                    <div className="credential-header">
                        <i className="fa-solid fa-user-lock"></i>

                        <div>
                            <h3>Login Credentials</h3>
                            <span>Keep these details safe</span>
                        </div>
                    </div>

                    {/* Student ID */}
                    <div className="credential-row">

                        <div className="credential-label">
                            <i className="fa-solid fa-id-card"></i>

                            <span>Student ID</span>
                        </div>

                        <strong>
                            {studentId || "-"}
                        </strong>

                    </div>

                    {/* Email */}
                    <div className="credential-row">

                        <div className="credential-label">
                            <i className="fa-solid fa-envelope"></i>

                            <span>Email Address</span>
                        </div>

                        <strong>
                            {email || "-"}
                        </strong>

                    </div>

                    {/* Password */}
                    <div className="credential-row">

                        <div className="credential-label">
                            <i className="fa-solid fa-key"></i>

                            <span>Password</span>
                        </div>

                        <strong className="masked-password">
                            ••••••••••
                        </strong>

                    </div>

                </div>

                <div className="account-login-note">

                    <i className="fa-solid fa-circle-info"></i>

                    <span>
                        Your password is securely stored and cannot be
                        displayed here. Please remember the password you
                        created.
                    </span>

                </div>

               <button
    type="button"
    className="account-button account-login-button"
    onClick={() => navigate("/")}
>
    Continue to Login
    <i className="fa-solid fa-arrow-right"></i>
</button>

            </div>

        </div>
    );
}

    return (
        <div className="account-step">

            <div className="account-card">

                <div className="account-header">

                    <div className="account-icon">
                        <i className="fa-solid fa-user-lock"></i>
                    </div>

                    <h2>Create Your Login Account</h2>

                    <p>
                        Your registration has been completed.
                        Create your login account to continue.
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    {/* Student ID */}

                    <div className="account-field">

                        <label>
                            Student ID
                        </label>

                        <input
                            type="text"
                            className="account-input"
                            value={studentId || ""}
                            readOnly
                        />

                    </div>


                    {/* Email */}

                    <div className="account-field">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="account-input"
                            value={email || ""}
                            readOnly
                        />

                    </div>


                    {/* Password */}

                    <div className="account-field">

                        <label>
                            Set Password
                        </label>

                        <div className="password-wrapper">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                className="account-input password-input"
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                disabled={isCreating}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        previous => !previous
                                    )
                                }
                            >
                                <i
                                    className={
                                        showPassword
                                            ? "fa-solid fa-eye-slash"
                                            : "fa-solid fa-eye"
                                    }
                                ></i>
                            </button>

                        </div>

                    </div>


                    {/* Confirm Password */}

                    <div className="account-field">

                        <label>
                            Confirm Password
                        </label>

                        <div className="password-wrapper">

                            <input
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                className="account-input password-input"
                                placeholder="Retype password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                disabled={isCreating}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        previous => !previous
                                    )
                                }
                            >
                                <i
                                    className={
                                        showConfirmPassword
                                            ? "fa-solid fa-eye-slash"
                                            : "fa-solid fa-eye"
                                    }
                                ></i>
                            </button>

                        </div>

                    </div>


                    {/* Error */}

                    {error && (
                        <div className="account-error">

                            <i className="fa-solid fa-circle-exclamation"></i>

                            <span>{error}</span>

                        </div>
                    )}


                    {/* Create Account */}

                    <button
                        type="submit"
                        className="account-button"
                        disabled={
                            isCreating ||
                            !password ||
                            !confirmPassword
                        }
                    >
                        {isCreating
                            ? "Creating Account..."
                            : "Create Account"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateAccount;