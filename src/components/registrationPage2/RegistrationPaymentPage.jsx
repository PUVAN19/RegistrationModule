import { useMemo, useState } from "react";
import { completePayment } from "../../api/paymentApi";
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
    onPaymentSuccess
}) {

    const { lines, total } = useMemo(
        () => computeFees(formData),
        [formData]
    );

    const [paymentMethod, setPaymentMethod] = useState("upi");

    const [cardDetails, setCardDetails] = useState({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const [upiId, setUpiId] = useState("");

    const [selectedUpiApp, setSelectedUpiApp] = useState("");

    const [isProcessing, setIsProcessing] = useState(false);

    const [isPaid, setIsPaid] = useState(false);

    const [paymentResult, setPaymentResult] = useState(null);

    const [errors, setErrors] = useState({});


    /* =====================================================
       CARD HOLDER NAME
    ===================================================== */

    const handleCardNameChange = (event) => {

        let value = event.target.value;

        value = value.replace(/[^a-zA-Z\s]/g, "");
        value = value.replace(/\s{2,}/g, " ");

        setCardDetails((previous) => ({
            ...previous,
            cardName: value
        }));

        setErrors((previous) => ({
            ...previous,
            cardName: ""
        }));
    };


    /* =====================================================
       CARD NUMBER
    ===================================================== */

    const handleCardNumberChange = (event) => {

        let value = event.target.value;

        value = value.replace(/\D/g, "");
        value = value.substring(0, 16);

        const formattedValue = value
            .replace(/(.{4})/g, "$1 ")
            .trim();

        setCardDetails((previous) => ({
            ...previous,
            cardNumber: formattedValue
        }));

        setErrors((previous) => ({
            ...previous,
            cardNumber: ""
        }));
    };


    /* =====================================================
       EXPIRY
    ===================================================== */

    const handleExpiryChange = (event) => {

        let value = event.target.value;

        value = value.replace(/\D/g, "");
        value = value.substring(0, 4);

        if (value.length >= 3) {
            value =
                value.substring(0, 2) +
                "/" +
                value.substring(2);
        }

        setCardDetails((previous) => ({
            ...previous,
            expiry: value
        }));

        setErrors((previous) => ({
            ...previous,
            expiry: ""
        }));
    };


    /* =====================================================
       CVV
    ===================================================== */

    const handleCvvChange = (event) => {

        let value = event.target.value;

        value = value.replace(/\D/g, "");
        value = value.substring(0, 4);

        setCardDetails((previous) => ({
            ...previous,
            cvv: value
        }));

        setErrors((previous) => ({
            ...previous,
            cvv: ""
        }));
    };


    /* =====================================================
       CARD VALIDATION
    ===================================================== */

    const validateCard = () => {

        const newErrors = {};

        const cardName =
            cardDetails.cardName.trim();

        const cardNumber =
            cardDetails.cardNumber.replace(/\s/g, "");

        const expiry =
            cardDetails.expiry;

        const cvv =
            cardDetails.cvv;


        if (!cardName) {

            newErrors.cardName =
                "Cardholder name is required.";

        }
        else if (cardName.length < 2) {

            newErrors.cardName =
                "Please enter a valid cardholder name.";

        }


        if (!cardNumber) {

            newErrors.cardNumber =
                "Card number is required.";

        }
        else if (cardNumber.length !== 16) {

            newErrors.cardNumber =
                "Card number must contain 16 digits.";

        }


        if (!expiry) {

            newErrors.expiry =
                "Expiry date is required.";

        }
        else {

            const match =
                expiry.match(/^(\d{2})\/(\d{2})$/);

            if (!match) {

                newErrors.expiry =
                    "Enter expiry as MM/YY.";

            }
            else {

                const month =
                    parseInt(match[1], 10);

                const year =
                    parseInt(match[2], 10);

                const currentDate =
                    new Date();

                const currentYear =
                    currentDate.getFullYear() % 100;

                const currentMonth =
                    currentDate.getMonth() + 1;


                if (
                    month < 1 ||
                    month > 12
                ) {

                    newErrors.expiry =
                        "Enter a valid month.";

                }
                else if (
                    year < currentYear ||
                    (
                        year === currentYear &&
                        month < currentMonth
                    )
                ) {

                    newErrors.expiry =
                        "Card expiry date has passed.";

                }
            }
        }


        if (!cvv) {

            newErrors.cvv =
                "CVV is required.";

        }
        else if (
            cvv.length < 3 ||
            cvv.length > 4
        ) {

            newErrors.cvv =
                "CVV must contain 3 or 4 digits.";

        }


        return newErrors;
    };


    /* =====================================================
       UPI VALIDATION
    ===================================================== */

    const validateUpi = () => {

        const newErrors = {};

        if (!upiId.trim()) {

            newErrors.upiId =
                "UPI ID is required.";

        }
        else if (
            !/^[a-zA-Z0-9._-]+@[a-zA-Z]{2,}$/.test(
                upiId.trim()
            )
        ) {

            newErrors.upiId =
                "Enter a valid UPI ID.";

        }

        return newErrors;
    };


  const handlePay = async (event) => {
    event.preventDefault();

    if (isProcessing) {
        return;
    }

    let validationErrors = {};

    if (paymentMethod === "card") {
        validationErrors = validateCard();
    } else if (paymentMethod === "upi") {
        validationErrors = validateUpi();
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }

    setErrors({});
    setIsProcessing(true);

    try {
        const {
            confirmEmail,
            photo,
            signature,
            idProof,
            academicCertificate,
            ...registrationData
        } = formData;

        const response = await completePayment({
            amount: total,
            paymentMethod: paymentMethod,
            upiId: paymentMethod === "upi" ? upiId : null,
            registration: registrationData
        });

        console.log("Complete payment response:", response);

        // Axios response OR direct data
        const result = response?.data ?? response;

        console.log("Payment result:", result);

        /*
         * IMPORTANT
         * Payment must actually be successful.
         */
        if (
            !result ||
            String(result.paymentStatus || "").toLowerCase() !== "success"
        ) {
            throw new Error(
                result?.message ||
                "Payment failed. Please try again."
            );
        }

        /*
         * Payment is successful.
         *
         * DO NOT move to Create Account here.
         * First show the payment success screen.
         */
        setPaymentResult(result);
        setIsPaid(true);

    } catch (error) {

        console.error("Payment error:", error);

        setIsPaid(false);
        setPaymentResult(null);

        const message =
            error?.response?.data?.message ||
            error?.response?.data?.title ||
            error?.message ||
            "Something went wrong while processing payment.";

        alert(message);

    } finally {
        setIsProcessing(false);
    }
};

    /* =====================================================
       SUCCESS SCREEN
    ===================================================== */

   if (isPaid) {
    return (
        <div className="payment-success">

            <div className="payment-success-stamp">
                <i className="fa-solid fa-check"></i>
            </div>

            <h2>
                Payment Successful
            </h2>

            <p>
                Your payment has been completed successfully.
                <br />
                You can now continue to create your account.
            </p>

            <div className="success-details">

                <div className="success-detail">
                    <span>Registration Number</span>

                    <strong>
                        {paymentResult?.regNumber || "-"}
                    </strong>
                </div>

                <div className="success-detail">
                    <span>Student ID</span>

                    <strong>
                        {paymentResult?.studentId || "-"}
                    </strong>
                </div>

                <div className="success-detail">
                    <span>Payment Status</span>

                    <strong className="payment-success-status">
                        {paymentResult?.paymentStatus || "Success"}
                    </strong>
                </div>

            </div>

            <div className="success-email-message">

                A confirmation has been sent to{" "}

                <strong>
                    {formData.primaryEmail}
                </strong>

                .

                <br />

                Your payment has been successfully recorded.

            </div>

            <button
    type="button"
    className="btn btn-danger px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2"
    onClick={() => {
        if (onPaymentSuccess) {
            onPaymentSuccess(paymentResult);
        }
    }}
>
    Continue to Create Account
    <i className="fa-solid fa-arrow-right"></i>
</button>
        </div>
    );
}


    /* =====================================================
       PAYMENT PAGE
    ===================================================== */

    return (

        <div className="payment-page">

            <div className="payment-layout">


                {/* =================================================
                   LEFT - ORDER SUMMARY
                ================================================= */}

                <div className="payment-order">

                    <div className="payment-order-header">

                        <div className="payment-order-icon">
                            <i className="fa-solid fa-receipt"></i>
                        </div>

                        <div>
                            <h2>
                                Payment Summary
                            </h2>

                            <p>
                                Review your application fees
                            </p>
                        </div>

                    </div>


                    {/* Applicant */}

                    <div className="payment-applicant">

                        <div className="payment-avatar">

                            {(
                                formData.applicantName ||
                                "A"
                            )
                                .charAt(0)
                                .toUpperCase()}

                        </div>

                        <div>

                            <strong>
                                {
                                    formData.applicantName ||
                                    "Applicant"
                                }
                            </strong>

                            <span>
                                {
                                    formData.primaryEmail ||
                                    "No email provided"
                                }
                            </span>

                        </div>

                    </div>


                    {/* Fee lines */}

                    <div className="payment-fees">

                        {lines.map((line) => (

                            <div
                                className="payment-fee-row"
                                key={line.label}
                            >

                                <span>
                                    {line.label}
                                </span>

                                <strong>
                                    ₹
                                    {line.amount.toLocaleString(
                                        "en-IN"
                                    )}
                                </strong>

                            </div>

                        ))}

                    </div>


                    {/* Total */}

                    <div className="payment-total">

                        <span>
                            Total payable
                        </span>

                        <strong>
                            ₹
                            {total.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>


                    {/* Secure */}

                    <div className="payment-trust">

                        <div>
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>

                        <span>
                            Secure payment
                            <small>
                                Your payment information is protected.
                            </small>
                        </span>

                    </div>


                    {/* Back */}

                    <button
                        type="button"
                        className="payment-back"
                        onClick={onBack}
                        disabled={isProcessing}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                        Back to Review
                    </button>

                </div>


                {/* =================================================
                   RIGHT - PAYMENT
                ================================================= */}

                <div className="payment-method-card">

                    <div className="payment-method-header">

                        <div>

                            <h2>
                                Complete Payment
                            </h2>

                            <p>
                                Choose your preferred payment method
                            </p>

                        </div>

                        <div className="payment-amount-badge">

                            ₹
                            {total.toLocaleString("en-IN")}

                        </div>

                    </div>


                    {/* Payment tabs */}

                    <div className="payment-method-tabs">

                        <button
                            type="button"
                            className={
                                paymentMethod === "upi"
                                    ? "payment-method-tab active"
                                    : "payment-method-tab"
                            }
                            onClick={() => {
                                setPaymentMethod("upi");
                                setErrors({});
                            }}
                        >

                            <i className="fa-solid fa-mobile-screen-button"></i>

                            <span>
                                UPI
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                paymentMethod === "card"
                                    ? "payment-method-tab active"
                                    : "payment-method-tab"
                            }
                            onClick={() => {
                                setPaymentMethod("card");
                                setErrors({});
                            }}
                        >

                            <i className="fa-regular fa-credit-card"></i>

                            <span>
                                Card
                            </span>

                        </button>


                        <button
                            type="button"
                            className={
                                paymentMethod === "netbanking"
                                    ? "payment-method-tab active"
                                    : "payment-method-tab"
                            }
                            onClick={() => {
                                setPaymentMethod("netbanking");
                                setErrors({});
                            }}
                        >

                            <i className="fa-solid fa-building-columns"></i>

                            <span>
                                Net Banking
                            </span>

                        </button>

                    </div>


                    <form
                        className="payment-form"
                        onSubmit={handlePay}
                    >


                        {/* =================================================
                           UPI
                        ================================================= */}

                        {paymentMethod === "upi" && (

                            <div className="upi-payment">

                                <div className="upi-heading">

                                    <div className="upi-icon">
                                        <i className="fa-solid fa-mobile-screen"></i>
                                    </div>

                                    <div>
                                        <h3>
                                            Pay using UPI
                                        </h3>

                                        <p>
                                            Enter your UPI ID to continue
                                        </p>
                                    </div>

                                </div>


                                <div className="upi-apps">

                                    <button
                                        type="button"
                                        className={
                                            selectedUpiApp === "gpay"
                                                ? "upi-app active"
                                                : "upi-app"
                                        }
                                        onClick={() => {
                                            setSelectedUpiApp("gpay");
                                            setUpiId("");
                                            setErrors({});
                                        }}
                                    >
                                        <span className="upi-app-logo">
                                            G
                                        </span>

                                        <span>
                                            Google Pay
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        className={
                                            selectedUpiApp === "phonepe"
                                                ? "upi-app active"
                                                : "upi-app"
                                        }
                                        onClick={() => {
                                            setSelectedUpiApp("phonepe");
                                            setUpiId("");
                                            setErrors({});
                                        }}
                                    >
                                        <span className="upi-app-logo">
                                            P
                                        </span>

                                        <span>
                                            PhonePe
                                        </span>
                                    </button>


                                    <button
                                        type="button"
                                        className={
                                            selectedUpiApp === "paytm"
                                                ? "upi-app active"
                                                : "upi-app"
                                        }
                                        onClick={() => {
                                            setSelectedUpiApp("paytm");
                                            setUpiId("");
                                            setErrors({});
                                        }}
                                    >
                                        <span className="upi-app-logo">
                                            P
                                        </span>

                                        <span>
                                            Paytm
                                        </span>
                                    </button>

                                </div>


                                <div className="payment-or">
                                    <span>OR</span>
                                </div>


                                <div className="payment-field">

                                    <label>
                                        UPI ID
                                        <span>*</span>
                                    </label>

                                    <div className="upi-input-wrapper">

                                        <i className="fa-solid fa-at"></i>

                                        <input
                                            type="text"
                                            value={upiId}
                                            onChange={(event) => {
                                                setUpiId(
                                                    event.target.value
                                                );

                                                setErrors(
                                                    (previous) => ({
                                                        ...previous,
                                                        upiId: ""
                                                    })
                                                );
                                            }}
                                            placeholder="example@upi"
                                            className={
                                                errors.upiId
                                                    ? "payment-input error"
                                                    : "payment-input"
                                            }
                                            disabled={isProcessing}
                                        />

                                    </div>

                                    {errors.upiId && (
                                        <small className="payment-error">
                                            {errors.upiId}
                                        </small>
                                    )}

                                </div>


                                <div className="upi-info">

                                    <i className="fa-solid fa-circle-info"></i>

                                    <span>
                                        You will receive a payment
                                        request in your UPI application.
                                    </span>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                           CARD
                        ================================================= */}

                        {paymentMethod === "card" && (

                            <div className="card-payment">

                                <div className="card-mini">

                                    <div className="card-mini-top">

                                        <span>
                                            SET 2026
                                        </span>

                                        <i className="fa-brands fa-cc-visa"></i>

                                    </div>

                                    <div className="card-mini-number">

                                        {cardDetails.cardNumber ||
                                            "•••• •••• •••• ••••"}

                                    </div>

                                    <div className="card-mini-bottom">

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


                                <div className="payment-field">

                                    <label>
                                        Cardholder Name
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={cardDetails.cardName}
                                        onChange={handleCardNameChange}
                                        placeholder="Name on card"
                                        maxLength={60}
                                        className={
                                            errors.cardName
                                                ? "payment-input error"
                                                : "payment-input"
                                        }
                                        disabled={isProcessing}
                                    />

                                    {errors.cardName && (
                                        <small className="payment-error">
                                            {errors.cardName}
                                        </small>
                                    )}

                                </div>


                                <div className="payment-field">

                                    <label>
                                        Card Number
                                        <span>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={cardDetails.cardNumber}
                                        onChange={handleCardNumberChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                        inputMode="numeric"
                                        className={
                                            errors.cardNumber
                                                ? "payment-input error"
                                                : "payment-input"
                                        }
                                        disabled={isProcessing}
                                    />

                                    {errors.cardNumber && (
                                        <small className="payment-error">
                                            {errors.cardNumber}
                                        </small>
                                    )}

                                </div>


                                <div className="payment-two-columns">

                                    <div className="payment-field">

                                        <label>
                                            Expiry
                                            <span>*</span>
                                        </label>

                                        <input
                                            type="text"
                                            value={cardDetails.expiry}
                                            onChange={handleExpiryChange}
                                            placeholder="MM/YY"
                                            maxLength={5}
                                            inputMode="numeric"
                                            className={
                                                errors.expiry
                                                    ? "payment-input error"
                                                    : "payment-input"
                                            }
                                            disabled={isProcessing}
                                        />

                                        {errors.expiry && (
                                            <small className="payment-error">
                                                {errors.expiry}
                                            </small>
                                        )}

                                    </div>


                                    <div className="payment-field">

                                        <label>
                                            CVV
                                            <span>*</span>
                                        </label>

                                        <input
                                            type="password"
                                            value={cardDetails.cvv}
                                            onChange={handleCvvChange}
                                            placeholder="•••"
                                            maxLength={4}
                                            inputMode="numeric"
                                            className={
                                                errors.cvv
                                                    ? "payment-input error"
                                                    : "payment-input"
                                            }
                                            disabled={isProcessing}
                                        />

                                        {errors.cvv && (
                                            <small className="payment-error">
                                                {errors.cvv}
                                            </small>
                                        )}

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* =================================================
                           NET BANKING
                        ================================================= */}

                        {paymentMethod === "netbanking" && (

                            <div className="netbanking-payment">

                                <div className="upi-heading">

                                    <div className="upi-icon">
                                        <i className="fa-solid fa-building-columns"></i>
                                    </div>

                                    <div>

                                        <h3>
                                            Net Banking
                                        </h3>

                                        <p>
                                            Select your bank to continue
                                        </p>

                                    </div>

                                </div>


                                <div className="bank-grid">

                                    <button
                                        type="button"
                                        className="bank-option"
                                    >
                                        <i className="fa-solid fa-building-columns"></i>
                                        <span>
                                            SBI
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className="bank-option"
                                    >
                                        <i className="fa-solid fa-building-columns"></i>
                                        <span>
                                            HDFC Bank
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className="bank-option"
                                    >
                                        <i className="fa-solid fa-building-columns"></i>
                                        <span>
                                            ICICI Bank
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        className="bank-option"
                                    >
                                        <i className="fa-solid fa-building-columns"></i>
                                        <span>
                                            Axis Bank
                                        </span>
                                    </button>

                                </div>

                                <p className="netbanking-note">
                                    This is currently a demo payment
                                    interface. Connect your payment gateway
                                    for real transactions.
                                </p>

                            </div>

                        )}


                        {/* =================================================
                           PAY
                        ================================================= */}

                        <button
                            type="submit"
                            className="payment-pay-button"
                            disabled={isProcessing}
                        >

                            {isProcessing ? (

                                <>
                                    <i className="fa-solid fa-spinner fa-spin"></i>
                                    Processing Payment...
                                </>

                            ) : (

                                <>
                                    Pay ₹
                                    {total.toLocaleString("en-IN")}

                                    <i className="fa-solid fa-arrow-right"></i>
                                </>

                            )}

                        </button>


                        <div className="payment-bottom-note">

                            <i className="fa-solid fa-lock"></i>

                            <span>
                                100% secure payment
                            </span>

                            <span className="payment-dot">
                                •
                            </span>

                            <span>
                                SSL encrypted
                            </span>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default RegistrationPaymentPage;