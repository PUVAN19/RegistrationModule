import { useState } from "react";
// import RegistrationStepper from "./RegistrationStepper";
import RegistrationInformation from "./sections/RegistrationInformation";
import AddressCommunication from "./sections/AddressCommunication";
import AcademicDetails from "./sections/AcademicDetails";
import TestDetails from "./sections/TestDetails";
import DocumentUpload from "./sections/DocumentUpload";
// import RegistrationDeclaration from "./sections/RegistrationDeclaration";
function RegistrationLayout() {
    const [formData, setFormData] = useState({
        applicantName: "",
        dateOfBirth: null,
        category: "",

        countryCode: "+91",
        mobileNumber: "",
        primaryEmail: "",
        confirmEmail: "",
        isNri: "no",
        nriAdmission: "",
        nationality: "",

        highestQualification: "",
        passingYear: "",

        testDate1: false,
        testDate2: false,

        test1Set: false,
        test1Sietee: false,
        test1City1: "",
        test1City2: "",
        test1City3: "",

        test2Set: false,
        test2Sietee: false,
        test2City1: "",
        test2City2: "",
        test2City3: "",

        photo: null,

        declarationAccepted: false
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((previous) => {

            const newValue =
                type === "checkbox"
                    ? checked
                    : value;

            return {
                ...previous,
                [name]: newValue,

                ...(name === "isNri" && value === "no"
                    ? { nriAdmission: "" }
                    : {})
            };
        });
    };

    const handleRegistrationSubmit = () => {

        if (!formData.declarationAccepted) {
            return;
        }

        console.log("Saving registration...", formData);
    };

    return (
        <div className="registration-container">

            {/* Desktop Stepper */}

            <aside className="registration-sidebar d-none d-lg-block">
                <RegistrationStepper />
            </aside>


            {/* Main Content */}

            <section className="registration-content">

                {/* Mobile Stepper */}

                <div className="d-lg-none mb-3">
                    <RegistrationStepper />
                </div>


                <div className="registration-card">

                    <RegistrationInformation
                        formData={formData}
                        onChange={handleChange}
                    />

                    <div className="section-spacing"></div>

                    <AddressCommunication
                        formData={formData}
                        onChange={handleChange}
                    />

                    <div className="section-spacing"></div>

                    <AcademicDetails
                        formData={formData}
                        onChange={handleChange}
                    />

                    <div className="section-spacing"></div>

                    <TestDetails
                        formData={formData}
                        onChange={handleChange}
                    />

                    <div className="section-spacing"></div>

                    <DocumentUpload
                        formData={formData}
                        onChange={handleChange}
                    />

                </div>

                <RegistrationDeclaration
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleRegistrationSubmit}
                />

            </section>

        </div>
    );
}
export default RegistrationLayout;