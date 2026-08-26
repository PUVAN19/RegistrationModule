const nationalityOptions = [
    { value: "indian", label: "Indian" },
    { value: "other", label: "Other" }
];

const countryCodes = ["+91", "+1", "+44", "+61"];


function AddressCommunication({ formData, onChange }) {

    return (
        <section className="registration-section">

            <div className="section-header">

                <div className="section-icon">
                    <i className="fa-solid fa-address-book"></i>
                </div>

                <div>
                    <h2>Contact Information</h2>
                    <p>
                        We'll use these details to send your admit
                        card and important updates.
                    </p>
                </div>

            </div>

            <hr />

            <div className="form-grid">

                {/* Mobile Number */}

                <div className="form-field">

                    <label className="form-label" htmlFor="mobileNumber">
                        Mobile Number
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <div className="phone-field">

                        <select
                            name="countryCode"
                            value={formData.countryCode || "+91"}
                            onChange={onChange}
                            className="form-select"
                            aria-label="Country code"
                        >
                            {countryCodes.map((code) => (
                                <option key={code} value={code}>
                                    {code}
                                </option>
                            ))}
                        </select>

                        <input
                            id="mobileNumber"
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber || ""}
                            onChange={onChange}
                            placeholder="Enter mobile number"
                            maxLength={10}
                            className="form-control"
                        />

                    </div>

                </div>


                {/* Primary Email */}

                <div className="form-field">
                    <label className="form-label" htmlFor="primaryEmail">
                        Primary Email
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                        id="primaryEmail"
                        type="email"
                        name="primaryEmail"
                        className="form-control"
                        value={formData.primaryEmail || ""}
                        onChange={onChange}
                        placeholder="Enter primary email"
                        maxLength={150}
                        required
                    />
                </div>


                {/* Confirm Email */}

                <div className="form-field">
                    <label className="form-label" htmlFor="confirmEmail">
                        Retype Primary Email
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                        id="confirmEmail"
                        type="email"
                        name="confirmEmail"
                        className="form-control"
                        value={formData.confirmEmail || ""}
                        onChange={onChange}
                        placeholder="Re-enter primary email"
                        maxLength={150}
                        required
                    />
                </div>


                {/* Nationality */}

                <div className="form-field">
                    <label className="form-label" htmlFor="nationality">
                        Nationality
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="nationality"
                        name="nationality"
                        className="form-select"
                        value={formData.nationality || ""}
                        onChange={onChange}
                        required
                    >
                        <option value="" disabled>Select Nationality</option>
                        {nationalityOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>


                {/* NRI Candidate */}

                <div className="form-field span-full">

                    <label className="form-label">
                        Are you a NRI candidate?
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <div className="radio-pill-group">

                        <label className={`radio-pill ${formData.isNri === "yes" ? "is-checked" : ""}`}>
                            <input
                                type="radio"
                                name="isNri"
                                value="yes"
                                checked={formData.isNri === "yes"}
                                onChange={onChange}
                            />
                            Yes
                        </label>

                        <label className={`radio-pill ${formData.isNri === "no" ? "is-checked" : ""}`}>
                            <input
                                type="radio"
                                name="isNri"
                                value="no"
                                checked={formData.isNri === "no"}
                                onChange={onChange}
                            />
                            No
                        </label>

                    </div>

                </div>


                {/* NRI Admission */}

                {formData.isNri === "yes" && (

                    <div className="form-field span-full">

                        <label className="form-label">
                            Do you wish to take admission under NRI
                            <span className="text-danger ms-1">*</span>
                        </label>

                        <div className="radio-pill-group">

                            <label className={`radio-pill ${formData.nriAdmission === "yes" ? "is-checked" : ""}`}>
                                <input
                                    type="radio"
                                    name="nriAdmission"
                                    value="yes"
                                    checked={formData.nriAdmission === "yes"}
                                    onChange={onChange}
                                />
                                Yes
                            </label>

                            <label className={`radio-pill ${formData.nriAdmission === "no" ? "is-checked" : ""}`}>
                                <input
                                    type="radio"
                                    name="nriAdmission"
                                    value="no"
                                    checked={formData.nriAdmission === "no"}
                                    onChange={onChange}
                                />
                                No
                            </label>

                        </div>

                    </div>

                )}

            </div>

        </section>
    );
}

export default AddressCommunication;
