import { useState } from "react";

function CreateAccount({
    studentId,
    email,
    onAccountCreated
}) {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

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
            const response = await fetch(
                "https://localhost:7001/api/StudentAccount/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        studentId: studentId,
                        email: email,
                        password: password,
                        confirmPassword: confirmPassword
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Unable to create account."
                );
            }

            console.log("Account created:", result);

            setSuccess(true);

            if (onAccountCreated) {
                onAccountCreated(result);
            }

        } catch (error) {
            console.error("Create account error:", error);

            setError(
                error.message ||
                "Something went wrong while creating your account."
            );
        } finally {
            setIsCreating(false);
        }
    };

    if (success) {
        return (
            <div className="account-success">

                <div className="account-success-icon">
                    <i className="fa-solid fa-check"></i>
                </div>

                <h2>Account Created Successfully</h2>

                <p>
                    Your student login account has been created.
                </p>

                <div className="account-info">
                    <div>
                        <strong>Student ID</strong>
                        <span>{studentId}</span>
                    </div>

                    <div>
                        <strong>Email</strong>
                        <span>{email}</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="pay-button"
                    onClick={() => {
                        window.location.href = "/login";
                    }}
                >
                    Continue to Login
                </button>

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

                    <div className="form-field">

                        <label className="form-label">
                            Student ID
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={studentId || ""}
                            readOnly
                        />

                    </div>

                    {/* Email */}

                    <div className="form-field">

                        <label className="form-label">
                            Email Address
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={email || ""}
                            readOnly
                        />

                    </div>

                    {/* Password */}

                    <div className="form-field">

                        <label className="form-label">
                            Set Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            disabled={isCreating}
                        />

                    </div>

                    {/* Confirm Password */}

                    <div className="form-field">

                        <label className="form-label">
                            Retype Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Retype password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            disabled={isCreating}
                        />

                    </div>

                    {/* Error */}

                    {error && (
                        <div className="account-error">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}

                    {/* Create */}

                    <button
                        type="submit"
                        className="pay-button"
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