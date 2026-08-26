const educationBackground = [
    { value: "Arts", label: "Arts" },
    { value: "Commerce", label: "Commerce" },
    { value: "Science", label: "Science" },
    { value: "Others", label: "Others" }
];

function AcademicDetails({ formData, onChange }) {
    return (
        <section className="registration-section">

            <div className="section-header">

                <div className="section-icon">
                    <i className="fa-solid fa-graduation-cap"></i>
                </div>

                <div>
                    <h2>Academic Details</h2>
                    <p>
                        Enter your academic qualification details.
                    </p>
                </div>

            </div>

            <hr />

            <div className="form-grid">

                <div className="form-field">
                    <label className="form-label" htmlFor="highestQualification">
                        H.S.C. (10+2 Std)
                        <span className="text-danger ms-1">*</span>
                    </label>

                    <select
                        id="highestQualification"
                        name="highestQualification"
                        className="form-select"
                        value={formData.highestQualification || ""}
                        onChange={onChange}
                        required
                    >
                        <option value="" disabled>Select Qualification</option>
                        {educationBackground.map((option) => (
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

export default AcademicDetails;
