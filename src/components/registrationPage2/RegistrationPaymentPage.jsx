import { useMemo, useState } from "react";

const BASE_FEE = 1000;
const TEST_FEE = 750;

function computeFees(formData) {

    const lines = [
        {
            label: "Application processing fee",
            amount: BASE_FEE
        }
    ];

    if (formData.testDate1) {
        lines.push({
            label: "Test 1 — 02 May 2026",
            amount: TEST_FEE
        });
    }

    if (formData.testDate2) {
        lines.push({
            label: "Test 2 — 10 May 2026",
            amount: TEST_FEE
        });
    }

    const total = lines.reduce(
        (sum, line) => sum + line.amount,
        0
    );

    return {
        lines,
        total
    };
}


function RegistrationPaymentPage({
    formData,
    onBack,
    onPaymentSuccess,
    onCreateAccount
}) {

    const { lines, total } = useMemo(
        () => computeFees(formData),
        [formData]
    );


    // =========================================
    // CARD DETAILS
    // =========================================

    const [cardDetails, setCardDetails] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });


    // =========================================
    // PAYMENT STATE
    // =========================================

    const [isProcessing, setIsProcessing] = useState(false);

    const [isPaid, setIsPaid] = useState(false);

    const [paymentResult, setPaymentResult] = useState(null);


    // =========================================
    // CARD CHANGE
    // =========================================

    const handleCardChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setCardDetails((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =========================================
    // PAYMENT FORM VALIDATION
    // =========================================

    const isFormValid =
        cardDetails.cardName.trim().length > 1 &&
        cardDetails.cardNumber
            .replace(/\s/g, "")
            .length >= 12 &&
        cardDetails.expiry.length >= 4 &&
        cardDetails.cvv.length >= 3;


    // =========================================
    // PROCESS PAYMENT
    // =========================================

    const handlePay = async (event) => {

        event.preventDefault();

        if (!isFormValid || isProcessing) {
            return;
        }

        setIsProcessing(true);

        try {

            // -----------------------------------------
            // Remove frontend-only fields
            // -----------------------------------------

            const {
                confirmEmail,
                photo,
                signature,
                idProof,
                academicCertificate,
                ...registrationData
            } = formData;


            // -----------------------------------------
            // Call ASP.NET Core Web API
            // -----------------------------------------

            const response = await fetch(
                "https://localhost:7001/api/Payment/complete",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        amount: total,
                        registration: registrationData
                    })
                }
            );


            // -----------------------------------------
            // Read API response
            // -----------------------------------------

            const result = await response.json();


            // -----------------------------------------
            // Handle API error
            // -----------------------------------------

            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Payment failed."
                );
            }


            // -----------------------------------------
            // Payment + Registration successful
            // -----------------------------------------

            console.log(
                "Payment and registration completed:",
                result
            );


            setPaymentResult(result);

            setIsPaid(true);


            if (onPaymentSuccess) {
                onPaymentSuccess(result);
            }


        } catch (error) {

            console.error(
                "Payment error:",
                error
            );

            alert(
                error.message ||
                "Something went wrong while processing payment."
            );

        } finally {

            setIsProcessing(false);
        }
    };


    // =========================================
    // DOWNLOAD / PRINT REGISTRATION FORM
    // =========================================

    const handleDownloadRegistration = () => {

        window.print();
    };


    // =========================================
    // MASK CARD NUMBER
    // =========================================

    const maskedCardNumber =
        cardDetails.cardNumber

            ? cardDetails.cardNumber
                .replace(/\D/g, "")
                .padEnd(16, "•")
                .replace(/(.{4})/g, "$1 ")
                .trim()

            : "•••• •••• •••• ••••";


    // =========================================
    // PAYMENT SUCCESS SCREEN
    // =========================================

    if (isPaid) {

        return (

            <div className="payment-success">

                {/* Success Icon */}

                <div className="payment-success-stamp">

                    <i className="fa-solid fa-check"></i>

                </div>


                {/* Title */}

                <h2>
                    Registration successful
                </h2>


                {/* Message */}

                <p>
                    Your SET / SITEEE 2026 application has been
                    submitted and payment received successfully.
                </p>


                {/* Registration Number */}

                <span className="app-id">

                    Registration Number:{" "}

                    {paymentResult?.regNumber || "-"}

                </span>


                {/* Student ID */}

                <span className="app-id">

                    Student ID:{" "}

                    {paymentResult?.studentId || "-"}

                </span>


                {/* Payment Status */}

                <span className="app-id">

                    Payment Status:{" "}

                    {paymentResult?.paymentStatus || "Success"}

                </span>


                {/* Email Message */}

                <div
                    style={{
                        fontSize: "12px",
                        color: "var(--ink-soft)",
                        marginTop: "12px"
                    }}
                >

                    A confirmation has been sent to{" "}

                    <strong>
                        {
                            formData.primaryEmail ||
                            "your registered email"
                        }
                    </strong>

                    .

                    <br />

                    Please keep your Registration Number
                    and Student ID safe.

                </div>


                {/* =================================
                    ACTION BUTTONS
                ================================= */}

                <div
                    className="registration-success-actions"
                    style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        marginTop: "22px"
                    }}
                >

                    {/* Download Registration Form */}

                    <button
                        type="button"
                        className="page2-back-button"
                        onClick={handleDownloadRegistration}
                    >

                        <i className="fa-solid fa-download"></i>

                        &nbsp;

                        Download Registration Form

                    </button>


                    {/* Create Account */}

                    <button
                        type="button"
                        className="pay-button"
                        onClick={onCreateAccount}
                        style={{
                            width: "auto",
                            padding: "10px 20px"
                        }}
                    >

                        Create Account

                        <span style={{ marginLeft: "8px" }}>
                            →
                        </span>

                    </button>

                </div>

            </div>
        );
    }


    // =========================================
    // PAYMENT PAGE
    // =========================================

    return (

        <div className="payment-step">

            <div className="payment-shell">


                {/* =====================================
                    FEE SUMMARY
                ===================================== */}

                <div className="payment-summary-card">


                    {/* Applicant */}

                    <div className="applicant-strip">

                        <div className="avatar-dot">

                            {
                                (
                                    formData.applicantName ||
                                    "A"
                                )
                                    .charAt(0)
                                    .toUpperCase()
                            }

                        </div>


                        <div>

                            <strong>

                                {
                                    formData.applicantName ||
                                    "Applicant"
                                }

                            </strong>


                            <small>

                                {
                                    formData.primaryEmail ||
                                    "No email provided"
                                }

                            </small>

                        </div>

                    </div>


                    {/* Fee Lines */}

                    {lines.map((line) => (

                        <div
                            className="fee-line"
                            key={line.label}
                        >

                            <span>
                                {line.label}
                            </span>


                            <span>

                                ₹
                                {line.amount.toLocaleString("en-IN")}

                            </span>

                        </div>

                    ))}


                    {/* Total */}

                    <div className="fee-line fee-total">

                        <span>
                            Total payable
                        </span>


                        <span>

                            ₹
                            {total.toLocaleString("en-IN")}

                        </span>

                    </div>


                    {/* Back */}

                    <button
                        type="button"
                        className="page2-back-button"
                        style={{
                            marginTop: "14px",
                            width: "100%",
                            justifyContent: "center"
                        }}
                        onClick={onBack}
                        disabled={isProcessing}
                    >

                        <span>
                            ←
                        </span>

                        Back to review

                    </button>

                </div>


                {/* =====================================
                    CARD FORM
                ===================================== */}

                <div className="payment-form-card">


                    {/* Mock Card */}

                    <div className="payment-card-mock">

                        <div className="chip" />


                        <div className="payment-card-number">

                            {maskedCardNumber}

                        </div>


                        <div className="payment-card-meta">

                            <span>

                                {
                                    cardDetails.cardName ||
                                    "CARDHOLDER NAME"
                                }

                            </span>


                            <span>

                                {
                                    cardDetails.expiry ||
                                    "MM/YY"
                                }

                            </span>

                        </div>

                    </div>


                    {/* Card Form */}

                    <form onSubmit={handlePay}>


                        {/* Cardholder Name */}

                        <div className="payment-form-row full">

                            <div className="form-field">

                                <label className="form-label">
                                    Cardholder Name
                                </label>


                                <input
                                    type="text"
                                    name="cardName"
                                    className="form-control"
                                    placeholder="Name on card"
                                    value={cardDetails.cardName}
                                    onChange={handleCardChange}
                                    maxLength={60}
                                    disabled={isProcessing}
                                />

                            </div>

                        </div>


                        {/* Card Number */}

                        <div className="payment-form-row full">

                            <div className="form-field">

                                <label className="form-label">
                                    Card Number
                                </label>


                                <input
                                    type="text"
                                    name="cardNumber"
                                    className="form-control"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardDetails.cardNumber}
                                    onChange={handleCardChange}
                                    maxLength={19}
                                    inputMode="numeric"
                                    disabled={isProcessing}
                                />

                            </div>

                        </div>


                        {/* Expiry + CVV */}

                        <div className="payment-form-row">

                            <div className="form-field">

                                <label className="form-label">
                                    Expiry
                                </label>


                                <input
                                    type="text"
                                    name="expiry"
                                    className="form-control"
                                    placeholder="MM/YY"
                                    value={cardDetails.expiry}
                                    onChange={handleCardChange}
                                    maxLength={5}
                                    disabled={isProcessing}
                                />

                            </div>


                            <div className="form-field">

                                <label className="form-label">
                                    CVV
                                </label>


                                <input
                                    type="password"
                                    name="cvv"
                                    className="form-control"
                                    placeholder="•••"
                                    value={cardDetails.cvv}
                                    onChange={handleCardChange}
                                    maxLength={4}
                                    inputMode="numeric"
                                    disabled={isProcessing}
                                />

                            </div>

                        </div>


                        {/* Pay Button */}

                        <button
                            type="submit"
                            className="pay-button"
                            disabled={
                                !isFormValid ||
                                isProcessing
                            }
                        >

                            {
                                isProcessing
                                    ? "Processing…"
                                    : `Pay ₹${total.toLocaleString("en-IN")}`
                            }

                        </button>


                        {/* Security Note */}

                        <div className="payment-secure-note">

                            <i className="fa-solid fa-shield-halved"></i>

                            This is a demo payment form —
                            no real transaction is made.

                        </div>


                    </form>

                </div>

            </div>

        </div>
    );
}


export default RegistrationPaymentPage;