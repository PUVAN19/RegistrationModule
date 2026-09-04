const cityOptions = [
    { value: "pune", label: "Pune" },
    { value: "mumbai", label: "Mumbai" },
    { value: "delhi", label: "Delhi" },
    { value: "bangalore", label: "Bangalore" },
    { value: "hyderabad", label: "Hyderabad" },
    { value: "chennai", label: "Chennai" }
];


function TestDetails({
    formData,
    onChange,
    validationErrors = {}
}) {

    return (
        <section className="registration-section">

            {/* =========================================
                SECTION HEADER
            ========================================= */}

            <div className="section-header">

                <div className="section-icon">
                    <i className="fa-solid fa-calendar-check"></i>
                </div>

                <div>
                    <h2>Test Dates</h2>
                    <p>
                        Select the test date(s) you wish to appear for.
                    </p>
                </div>

            </div>


            <div className="section-divider"></div>


            {/* =========================================
                TEST DATE COLUMNS
            ========================================= */}

            <div className="test-date-columns">


                {/* =====================================
                    TEST 1
                ===================================== */}

                <div className="test-date-column">

                    <label className="check-control test-date-option">

                        <input
                            type="checkbox"
                            name="testDate1"
                            checked={formData.testDate1 || false}
                            onChange={onChange}
                        />

                        <span className="check-box">
                            <i className="fa-solid fa-check"></i>
                        </span>

                        <span>
                            Test 1 – 02-May-2026 (Saturday)
                        </span>

                    </label>


                    {/* TEST 1 DETAILS */}

                    <div
                        className={`test-details-accordion ${
                            formData.testDate1 ? "is-open" : ""
                        }`}
                    >

                        <div className="test-details-accordion-inner">

                            <TestDetailsCard
                                prefix="test1"
                                formData={formData}
                                onChange={onChange}
                                validationErrors={validationErrors}
                            />

                        </div>

                    </div>

                </div>


                {/* =====================================
                    TEST 2
                ===================================== */}

                <div className="test-date-column">

                    <label className="check-control test-date-option">

                        <input
                            type="checkbox"
                            name="testDate2"
                            checked={formData.testDate2 || false}
                            onChange={onChange}
                        />

                        <span className="check-box">
                            <i className="fa-solid fa-check"></i>
                        </span>

                        <span>
                            Test 2 – 10-May-2026 (Sunday)
                        </span>

                    </label>


                    {/* TEST 2 DETAILS */}

                    <div
                        className={`test-details-accordion ${
                            formData.testDate2 ? "is-open" : ""
                        }`}
                    >

                        <div className="test-details-accordion-inner">

                            <TestDetailsCard
                                prefix="test2"
                                formData={formData}
                                onChange={onChange}
                                validationErrors={validationErrors}
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================================
                TEST DATE ERROR
            ========================================= */}

            {validationErrors.testDate && (
                <div className="test-validation-error">
                    <i className="fa-solid fa-circle-exclamation"></i>

                    <span>
                        {validationErrors.testDate}
                    </span>
                </div>
            )}

        </section>
    );
}


/* =====================================================
   TEST DETAILS CARD
===================================================== */

function TestDetailsCard({
    prefix,
    formData,
    onChange,
    validationErrors = {}
}) {

    const setChecked =
        formData[`${prefix}Set`] || false;

    const sieteeChecked =
        formData[`${prefix}Sietee`] || false;


    return (

        <div className="test-details-card">


            {/* =========================================
                CHOOSE EXAMINATION
            ========================================= */}

            <div>

                <div className="test-card-label">
                    Choose Examination
                </div>


                <div className="test-examination-row">


                    {/* =================================
                        SET
                    ================================= */}

                    <label
                        className={`check-control test-exam-pill ${
                            setChecked ? "is-checked" : ""
                        }`}
                    >

                        <span className="test-exam-pill-left">

                            <input
                                type="checkbox"
                                name={`${prefix}Set`}
                                checked={setChecked}
                                onChange={onChange}
                            />

                            <span className="check-box">
                                <i className="fa-solid fa-check"></i>
                            </span>

                            <span className="test-exam-pill-name">
                                SET
                            </span>

                        </span>


                        <span className="test-exam-pill-time">
                            09:00 am – 10:00 am
                        </span>

                    </label>


                    {/* =================================
                        SITEEE
                    ================================= */}

                    <label
                        className={`check-control test-exam-pill ${
                            sieteeChecked ? "is-checked" : ""
                        }`}
                    >

                        <span className="test-exam-pill-left">

                            <input
                                type="checkbox"
                                name={`${prefix}Sietee`}
                                checked={sieteeChecked}
                                onChange={onChange}
                            />

                            <span className="check-box">
                                <i className="fa-solid fa-check"></i>
                            </span>

                            <span className="test-exam-pill-name">
                                SITEEE
                            </span>

                        </span>


                        <span className="test-exam-pill-time">
                            11:30 am – 12:30 pm
                        </span>

                    </label>

                </div>


                {/* EXAMINATION ERROR */}

                {validationErrors[`${prefix}Set`] && (
                    <div className="field-validation-error">
                        <i className="fa-solid fa-circle-exclamation"></i>

                        <span>
                            {validationErrors[`${prefix}Set`]}
                        </span>
                    </div>
                )}

            </div>


            {/* =========================================
                TEST CITY
            ========================================= */}

            <div className="test-city-section">

                <div className="test-card-label">
                    Test City Preferences
                </div>


                <div className="test-city-grid">


                    {/* =================================
                        CITY 1
                    ================================= */}

                    <div className="test-city-field">

                        <select
                            name={`${prefix}City1`}
                            className={`form-select ${
                                validationErrors[`${prefix}City1`]
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={
                                formData[`${prefix}City1`] || ""
                            }
                            onChange={onChange}
                        >

                            <option value="">
                                Test City 1
                            </option>

                            {cityOptions.map((city) => (
                                <option
                                    key={city.value}
                                    value={city.value}
                                >
                                    {city.label}
                                </option>
                            ))}

                        </select>


                        {validationErrors[`${prefix}City1`] && (
                            <small className="text-danger">
                                {validationErrors[`${prefix}City1`]}
                            </small>
                        )}

                    </div>


                    {/* =================================
                        CITY 2
                    ================================= */}

                    <div className="test-city-field">

                        <select
                            name={`${prefix}City2`}
                            className={`form-select ${
                                validationErrors[`${prefix}City2`]
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={
                                formData[`${prefix}City2`] || ""
                            }
                            onChange={onChange}
                        >

                            <option value="">
                                Test City 2
                            </option>

                            {cityOptions.map((city) => (
                                <option
                                    key={city.value}
                                    value={city.value}
                                >
                                    {city.label}
                                </option>
                            ))}

                        </select>


                        {validationErrors[`${prefix}City2`] && (
                            <small className="text-danger">
                                {validationErrors[`${prefix}City2`]}
                            </small>
                        )}

                    </div>


                    {/* =================================
                        CITY 3
                    ================================= */}

                    <div className="test-city-field">

                        <select
                            name={`${prefix}City3`}
                            className={`form-select ${
                                validationErrors[`${prefix}City3`]
                                    ? "is-invalid"
                                    : ""
                            }`}
                            value={
                                formData[`${prefix}City3`] || ""
                            }
                            onChange={onChange}
                        >

                            <option value="">
                                Test City 3
                            </option>

                            {cityOptions.map((city) => (
                                <option
                                    key={city.value}
                                    value={city.value}
                                >
                                    {city.label}
                                </option>
                            ))}

                        </select>


                        {validationErrors[`${prefix}City3`] && (
                            <small className="text-danger">
                                {validationErrors[`${prefix}City3`]}
                            </small>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}


export default TestDetails;