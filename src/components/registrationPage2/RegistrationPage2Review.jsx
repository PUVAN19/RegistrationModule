function RegistrationPage2Review({
    formData,
    onEditStep,
    onChange,
    onConfirm
}) {

    const getFileName = (file) => {

        if (!file) {
            return "Not uploaded";
        }

        if (typeof file === "string") {
            return file;
        }

        return file.name || "Uploaded";
    };


    return (

        <div className="page2-review">

            <div className="page2-review-introduction">

                <div className="page2-review-icon">
                    <i className="fa-solid fa-check"></i>
                </div>

                <div>

                    <h3>
                        Almost there — check your details
                    </h3>

                    <p>
                        Give everything a once-over. You can jump back
                        to any section to fix something before you
                        confirm.
                    </p>

                </div>

            </div>


            {/* =====================================
                REGISTRATION INFORMATION
            ===================================== */}

            <div className="page2-review-card">

                <div className="page2-review-card-header">

                    <div>

                        <span className="page2-review-number">
                            01
                        </span>

                        <div>

                            <h4>
                                Registration Information
                            </h4>

                            <span>
                                Personal details
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() => onEditStep(1)}
                    >
                        Edit →
                    </button>

                </div>


                <div className="page2-review-grid">

                    <ReviewField
                        label="Applicant Name"
                        value={formData.applicantName}
                    />

                    <ReviewField
                        label="Date of Birth"
                        value={
                            formData.dateOfBirth
                                ? new Date(formData.dateOfBirth).toLocaleDateString()
                                : ""
                        }
                    />

                    <ReviewField
                        label="Gender"
                        value={formData.gender}
                    />

                    <ReviewField
                        label="Category"
                        value={formData.category}
                    />

                    <ReviewField
                        label="PwD Status"
                        value={formData.pwdStatus}
                    />

                </div>

            </div>


            {/* =====================================
                ADDRESS
            ===================================== */}

            <div className="page2-review-card">

                <div className="page2-review-card-header">

                    <div>

                        <span className="page2-review-number">
                            02
                        </span>

                        <div>

                            <h4>
                                Address & Communication
                            </h4>

                            <span>
                                Contact details
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() => onEditStep(2)}
                    >
                        Edit →
                    </button>

                </div>


                <div className="page2-review-grid">

                    <ReviewField
                        label="Mobile Number"
                        value={
                            formData.countryCode
                                ? `${formData.countryCode} ${formData.mobileNumber}`
                                : formData.mobileNumber
                        }
                    />

                    <ReviewField
                        label="Primary Email"
                        value={formData.primaryEmail}
                    />

                    <ReviewField
                        label="Nationality"
                        value={formData.nationality}
                    />

                    <ReviewField
                        label="NRI Status"
                        value={formData.isNri}
                    />

                </div>

            </div>


            {/* =====================================
                TEST DETAILS
            ===================================== */}

            <div className="page2-review-card">

                <div className="page2-review-card-header">

                    <div>

                        <span className="page2-review-number">
                            03
                        </span>

                        <div>

                            <h4>
                                Test Details
                            </h4>

                            <span>
                                Test preferences
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() => onEditStep(3)}
                    >
                        Edit →
                    </button>

                </div>


                <div className="page2-review-grid">

                    <ReviewField
                        label="Test 1 — 02 May 2026"
                        value={
                            formData.testDate1
                                ? [
                                    formData.test1Set ? "SET" : null,
                                    formData.test1Sietee ? "SITEEE" : null
                                ].filter(Boolean).join(" + ") || "Selected"
                                : "Not selected"
                        }
                    />

                    <ReviewField
                        label="Test 1 Cities"
                        value={
                            [formData.test1City1, formData.test1City2, formData.test1City3]
                                .filter(Boolean)
                                .join(", ")
                        }
                    />

                    <ReviewField
                        label="Test 2 — 10 May 2026"
                        value={
                            formData.testDate2
                                ? [
                                    formData.test2Set ? "SET" : null,
                                    formData.test2Sietee ? "SITEEE" : null
                                ].filter(Boolean).join(" + ") || "Selected"
                                : "Not selected"
                        }
                    />

                    <ReviewField
                        label="Test 2 Cities"
                        value={
                            [formData.test2City1, formData.test2City2, formData.test2City3]
                                .filter(Boolean)
                                .join(", ")
                        }
                    />

                </div>

            </div>


            {/* =====================================
                DOCUMENTS
            ===================================== */}

            <div className="page2-review-card">

                <div className="page2-review-card-header">

                    <div>

                        <span className="page2-review-number">
                            04
                        </span>

                        <div>

                            <h4>
                                Upload Documents
                            </h4>

                            <span>
                                Application documents
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() => onEditStep(4)}
                    >
                        Edit →
                    </button>

                </div>


                <div className="page2-review-files">

                    <ReviewFile
                        label="Photograph"
                        file={formData.photo}
                        getFileName={getFileName}
                    />

                </div>

            </div>


            {/* =====================================
                DECLARATION
            ===================================== */}

            <div className="page2-declaration">

                <label
                    htmlFor="declarationAccepted"
                    className={
                        formData.declarationAccepted
                            ? "border-danger bg-danger-subtle"
                            : ""
                    }
                >

                    <span className="check-control">
                        <input
                            type="checkbox"
                            id="declarationAccepted"
                            name="declarationAccepted"
                            checked={formData.declarationAccepted || false}
                            onChange={onChange}
                        />

                        <span className="check-box">
                            <i className="fa-solid fa-check"></i>
                        </span>
                    </span>

                    <span className="page2-declaration-text">
                        I confirm that the information provided in this
                        application is correct and complete to the best
                        of my knowledge, and I understand these details
                        cannot be changed after submission.
                    </span>

                </label>

            </div>


            {/* =====================================
                CONFIRM
            ===================================== */}

            <div className="page2-navigation" style={{ borderTop: "none", marginTop: 0, paddingTop: 0 }}>

                <div />

                <button
                    type="button"
                    className="page2-continue-button"
                    disabled={!formData.declarationAccepted}
                    onClick={onConfirm}
                >
                    Confirm & Proceed to Payment
                    <span>→</span>
                </button>

            </div>

        </div>
    );
}


/* =========================================
   REVIEW FIELD
========================================= */

function ReviewField({
    label,
    value
}) {

    return (

        <div className="page2-review-field">

            <span>
                {label}
            </span>

            <strong>
                {value || "Not provided"}
            </strong>

        </div>
    );
}


/* =========================================
   REVIEW FILE
========================================= */

function ReviewFile({
    label,
    file,
    getFileName
}) {

    return (

        <div className="page2-review-file">

            <div className="page2-file-icon">
                <i className="fa-solid fa-check"></i>
            </div>

            <div>

                <span>
                    {label}
                </span>

                <strong>
                    {getFileName(file)}
                </strong>

            </div>

        </div>
    );
}


export default RegistrationPage2Review;
