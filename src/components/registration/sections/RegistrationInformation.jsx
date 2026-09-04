const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
];

const categoryOptions = [
    { value: "open", label: "Open Category" },
    { value: "sc", label: "SC" },
    { value: "st", label: "ST" },
    { value: "obc", label: "OBC" }
];

const pwdOptions = [
    { value: "no", label: "No" },
    { value: "yes", label: "Yes" }
];

function RegistrationInformation({formData,onChange, validationErrors = {}}) {

    const handleApplicantNameChange = (event) => {
        let value = event.target.value;

        // Letters and spaces only
        value = value.replace(/[^a-zA-Z\s]/g, "");
        // Prevent multiple spaces
        value = value.replace(/\s{2,}/g, " ");

        onChange({
            target: {
                name: "applicantName",
                value: value
            }
        });
    };

    // Today's date - prevents selecting future DOB
    const today = new Date().toISOString().split("T")[0];

    return (
        <section className="registration-section">

            <div className="section-header">
                <div className="section-icon">
                    <i className="fa-solid fa-user"></i>
                </div>

                <div>
                    <h2>Personal Information</h2>
                    <p>
                        Enter your personal details exactly as they
                        appear on your official documents.
                    </p>
                </div>
            </div>

            <hr />

            <div className="form-grid">

                {/* Applicant Name */}

                <div className="form-field span-full">

                    <label
                        className="form-label"
                        htmlFor="applicantName"
                    >
                        Applicant Name
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                        id="applicantName"
                        type="text"
                        name="applicantName"
                        className="form-control"
                        value={formData.applicantName || ""}
                        onChange={handleApplicantNameChange}
                        placeholder="Enter full name as per 10th mark sheet"
                        maxLength={100}
                        autoComplete="name"
                    />

                    {validationErrors.applicantName && (
                        <small className="text-danger">
                            {validationErrors.applicantName}
                        </small>
                    )}

                </div>


                {/* Date of Birth */}

                <div className="form-field">

                    <label
                        className="form-label"
                        htmlFor="dateOfBirth"
                    >
                        Date of Birth
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        className="form-control"
                        value={
                            formData.dateOfBirth
                                ? new Date(formData.dateOfBirth)
                                    .toISOString()
                                    .split("T")[0]
                                : ""
                        }
                        max={today}
                        onChange={onChange}
                      onKeyDown={(e) => e.preventDefault()}
                    />

                    {validationErrors.dateOfBirth && (
                        <small className="text-danger">
                            {validationErrors.dateOfBirth}
                        </small>
                    )}

                </div>


                {/* Gender */}

                <div className="form-field">

                    <label
                        className="form-label"
                        htmlFor="gender"
                    >
                        Gender
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="gender"
                        name="gender"
                        className="form-select"
                        value={formData.gender || ""}
                        onChange={onChange}
                    >
                        <option value="">
                            Select Gender
                        </option>

                        {genderOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {validationErrors.gender && (
                        <small className="text-danger">
                            {validationErrors.gender}
                        </small>
                    )}

                </div>


                {/* Category */}

                <div className="form-field">

                    <label
                        className="form-label"
                        htmlFor="category"
                    >
                        Category
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category || ""}
                        onChange={onChange}
                    >
                        <option value="">
                            Select Category
                        </option>

                        {categoryOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {validationErrors.category && (
                        <small className="text-danger">
                            {validationErrors.category}
                        </small>
                    )}

                </div>


                {/* PwD */}

                <div className="form-field">

                    <label
                        className="form-label"
                        htmlFor="pwdStatus"
                    >
                        Person with Disability (PwD)
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="pwdStatus"
                        name="pwdStatus"
                        className="form-select"
                        value={formData.pwdStatus || ""}
                        onChange={onChange}
                    >
                        <option value="">
                            Select
                        </option>

                        {pwdOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>

                    {validationErrors.pwdStatus && (
                        <small className="text-danger">
                            {validationErrors.pwdStatus}
                        </small>
                    )}

                </div>

            </div>

        </section>
    );
}

export default RegistrationInformation;