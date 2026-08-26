import { useState } from "react";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationStepper from "./RegistrationStepper";
import RegistrationInformation from "./sections/RegistrationInformation";
import AddressCommunication from "./sections/AddressCommunication";
import TestDetails from "./sections/TestDetails";
import DocumentUpload from "./sections/DocumentUpload";
// import RegistrationDeclaration from "./sections/RegistrationDeclaration";


const registrationSteps = [
    {
        id: 1,
        key: "registration",
        title: "Registration Information",
        component: RegistrationInformation
    },
    {
        id: 2,
        key: "address",
        title: "Contact Information",
        component: AddressCommunication
    },
   
    {
        id: 3,
        key: "test",
        title: "Test Dates",
        component: TestDetails
    },
    {
        id: 4,
        key: "Photo",
        title: "Upload Photo",
        component: DocumentUpload
    },
    {
        id: 6,
        key: "review",
        title: "Review",
        component: RegistrationDeclaration
    }
];


function RegistrationWizardLayout() {

    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        applicantName: "",
    dateOfBirth: null,
    gender: "",
    category: "",
    pwdStatus: "",

        countryCode: "+91",
        mobileNumber: "",
        primaryEmail: "",
        confirmEmail: "",
        isNri: "no",
        nationality: "",

        highestQualification: "",
        passingYear: "",

        entranceTest: "",
        testRollNumber: "",

        photo: null,
        signature: null,
        idProof: null,
        academicCertificate: null
    });


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    const currentStepConfig = registrationSteps.find(
        (step) => step.id === currentStep
    );

    const CurrentSection = currentStepConfig.component;


    const goNext = () => {
        if (currentStep < registrationSteps.length) {
            setCurrentStep((previous) => previous + 1);
        }
    };


    const goPrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((previous) => previous - 1);
        }
    };


    return (
        <div className="registration-wizard">

 <RegistrationHeader />

            <div className="registration-container">

            <aside className="registration-sidebar">
                <RegistrationStepper
                    currentStep={currentStep}
                />
            </aside>


            <main className="registration-wizard-content">

                <CurrentSection
                    formData={formData}
                    onChange={handleChange}
                />


                <div className="wizard-navigation">

                    {currentStep > 1 && (
                        <button
                            type="button"
                            className="wizard-previous-button"
                            onClick={goPrevious}
                        >
                            ← Previous
                        </button>
                    )}


                    {currentStep < registrationSteps.length && (
                        <button
                            type="button"
                            className="wizard-next-button"
                            onClick={goNext}
                        >
                            Next →
                        </button>
                    )}

                </div>

            </main>
 </div>
        </div>
    );
}

export default RegistrationWizardLayout;