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


function RegistrationInformation({ formData, onChange }) {

    const handleDateChange = (event) => {
        onChange({
            target: {
                name: "dateOfBirth",
                value: event.target.value
            }
        });
    };

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

                <div className="form-field span-full">
                    <label className="form-label" htmlFor="applicantName">
                        Applicant Name
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                        id="applicantName"
                        type="text"
                        name="applicantName"
                        className="form-control"
                        value={formData.applicantName || ""}
                        onChange={onChange}
                        placeholder="Enter full name as per 10th mark sheet"
                        maxLength={100}
                        required
                    />
                </div>

                <div className="form-field">
                    <label className="form-label" htmlFor="dateOfBirth">
                        Date of Birth
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <input
                        id="dateOfBirth"
                        type="date"
                        name="dateOfBirth"
                        className="form-control"
                        value={formData.dateOfBirth || ""}
                        onChange={handleDateChange}
                        required
                    />
                </div>

                <div className="form-field">
                    <label className="form-label" htmlFor="gender">
                        Gender
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="gender"
                        name="gender"
                        className="form-select"
                        value={formData.gender || ""}
                        onChange={onChange}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        {genderOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label className="form-label" htmlFor="category">
                        Category
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="category"
                        name="category"
                        className="form-select"
                        value={formData.category || ""}
                        onChange={onChange}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-field">
                    <label className="form-label" htmlFor="pwdStatus">
                        Person with Disability (PwD)
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="pwdStatus"
                        name="pwdStatus"
                        className="form-select"
                        value={formData.pwdStatus || ""}
                        onChange={onChange}
                        required
                    >
                        <option value="" disabled>Select</option>
                        {pwdOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

        </section>
    );
}

export default RegistrationInformation;
