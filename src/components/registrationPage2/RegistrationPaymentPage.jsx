import { useMemo, useState } from "react";

const BASE_FEE = 1000;
const TEST_FEE = 750;

function computeFees(formData) {

    const lines = [
        { label: "Application processing fee", amount: BASE_FEE }
    ];

    if (formData.testDate1) {
        lines.push({ label: "Test 1 — 02 May 2026", amount: TEST_FEE });
    }

    if (formData.testDate2) {
        lines.push({ label: "Test 2 — 10 May 2026", amount: TEST_FEE });
    }

    const total = lines.reduce((sum, line) => sum + line.amount, 0);

    return { lines, total };
}

function generateApplicationId() {
    const random = Math.floor(100000 + Math.random() * 900000);
    return `SET2026-${random}`;
}


function RegistrationPaymentPage({
    formData,
    onBack
}) {

    const { lines, total } = useMemo(
        () => computeFees(formData),
        [formData]
    );

    const [cardDetails, setCardDetails] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const [applicationId] = useState(generateApplicationId);

    const handleCardChange = (event) => {

        const { name, value } = event.target;

        setCardDetails((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const isFormValid =
        cardDetails.cardName.trim().length > 1 &&
        cardDetails.cardNumber.replace(/\s/g, "").length >= 12 &&
        cardDetails.expiry.length >= 4 &&
        cardDetails.cvv.length >= 3;

    const handlePay = (event) => {

        event.preventDefault();

        if (!isFormValid || isProcessing) {
            return;
        }

        setIsProcessing(true);

        // Mock payment processing — no real gateway is called.
        setTimeout(() => {
            setIsProcessing(false);
            setIsPaid(true);
        }, 1400);
    };

    const maskedCardNumber =
        cardDetails.cardNumber
            ? cardDetails.cardNumber
                .replace(/\D/g, "")
                .padEnd(16, "•")
                .replace(/(.{4})/g, "$1 ")
                .trim()
            : "•••• •••• •••• ••••";


    if (isPaid) {
        return (
            <div className="payment-success">

                <div className="payment-success-stamp">
                    <i className="fa-solid fa-check"></i>
                </div>

                <h2>
                    Payment successful
                </h2>

                <p>
                    Your SET / SITEEE 2026 application has been
                    submitted and payment received.
                </p>

                <span className="app-id">
                    Application ID: {applicationId}
                </span>

                <div style={{ fontSize: "12px", color: "var(--ink-soft)" }}>
                    A confirmation has been sent to{" "}
                    <strong>{formData.primaryEmail || "your registered email"}</strong>.
                    Keep your Application ID safe — you'll need it
                    to download your admit card.
                </div>

            </div>
        );
    }


    return (
        <div className="payment-step">

            <div className="payment-shell">

                {/* =====================================
                    FEE SUMMARY
                ===================================== */}

                <div className="payment-summary-card">

                    <div className="applicant-strip">

                        <div className="avatar-dot">
                            {(formData.applicantName || "A").charAt(0).toUpperCase()}
                        </div>

                        <div>
                            <strong>
                                {formData.applicantName || "Applicant"}
                            </strong>

                            <small>
                                {formData.primaryEmail || "No email provided"}
                            </small>
                        </div>

                    </div>

                    {lines.map((line) => (
                        <div className="fee-line" key={line.label}>
                            <span>{line.label}</span>
                            <span>₹{line.amount.toLocaleString("en-IN")}</span>
                        </div>
                    ))}

                    <div className="fee-line fee-total">
                        <span>Total payable</span>
                        <span>₹{total.toLocaleString("en-IN")}</span>
                    </div>

                    <button
                        type="button"
                        className="page2-back-button"
                        style={{ marginTop: "14px", width: "100%", justifyContent: "center" }}
                        onClick={onBack}
                    >
                        <span>←</span>
                        Back to review
                    </button>

                </div>


                {/* =====================================
                    CARD FORM (MOCK)
                ===================================== */}

                <div className="payment-form-card">

                    <div className="payment-card-mock">

                        <div className="chip" />

                        <div className="payment-card-number">
                            {maskedCardNumber}
                        </div>

                        <div className="payment-card-meta">
                            <span>{cardDetails.cardName || "CARDHOLDER NAME"}</span>
                            <span>{cardDetails.expiry || "MM/YY"}</span>
                        </div>

                    </div>

                    <form onSubmit={handlePay}>

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
                                />
                            </div>
                        </div>

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
                                />
                            </div>
                        </div>

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
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="pay-button"
                            disabled={!isFormValid || isProcessing}
                        >
                            {isProcessing
                                ? "Processing…"
                                : `Pay ₹${total.toLocaleString("en-IN")}`
                            }
                        </button>

                        <div className="payment-secure-note">
                            <i className="fa-solid fa-shield-halved"></i>
                            This is a demo payment form — no real transaction is made.
                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default RegistrationPaymentPage;
