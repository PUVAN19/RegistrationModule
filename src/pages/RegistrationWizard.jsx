import { useState } from "react";

import RegistrationHeader from "../components/registration/RegistrationHeader";
import RegistrationStepper from "../components/registration/RegistrationStepper";

import RegistrationInformation from "../components/registration/sections/RegistrationInformation";
import AddressCommunication from "../components/registration/sections/AddressCommunication";

import TestDetails from "../components/registration/sections/TestDetails";
import DocumentUpload from "../components/registration/sections/DocumentUpload";

function RegistrationWizard() {

    const [currentStep, setCurrentStep] = useState(1);

    const [completedSteps, setCompletedSteps] = useState([]);

    const [formData, setFormData] = useState({
        applicantName: "",
        dateOfBirth: null,
        category: "",

        countryCode: "+91",
        mobileNumber: "",
        primaryEmail: "",
        confirmEmail: "",
        isNri: "no",
        nationality: "",

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
        signature: null,
        idProof: null,
        academicCertificate: ""
    });

   const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
        ...previous,
        [name]: type === "checkbox" ? checked : value
    }));
};


    /* =========================================
       STEP COMPONENTS
    ========================================= */

    const steps = [
        {
            id: 1,
            title: "Registration Information",
            component: RegistrationInformation
        },
        {
            id: 2,
            title: "Address & Communication",
            component: AddressCommunication
        },
        
        {
            id: 3,
            title: "Test Details",
            component: TestDetails
        },
        {
            id: 4,
            title: "Upload Documents",
            component: DocumentUpload
        }
    ];


    /* =========================================
       NEXT
    ========================================= */

    const handleNext = () => {

        if (currentStep < steps.length) {

            setCompletedSteps((previous) => {

                if (previous.includes(currentStep)) {
                    return previous;
                }

                return [...previous, currentStep];
            });

            setCurrentStep((previous) => previous + 1);
        }
    };


    /* =========================================
       PREVIOUS
    ========================================= */

    const handlePrevious = () => {

        if (currentStep > 1) {
            setCurrentStep((previous) => previous - 1);
        }
    };


    /* =========================================
       SIDEBAR STEP CLICK
    ========================================= */

    const handleStepClick = (stepNumber) => {

        // Only allow current or completed steps
        if (
            stepNumber <= currentStep ||
            completedSteps.includes(stepNumber)
        ) {
            setCurrentStep(stepNumber);
        }
    };


    const CurrentComponent = steps[currentStep - 1].component;


    return (
        <div className="wizard-page">

            {/* HEADER */}
            <RegistrationHeader />


            <div className="wizard-layout">

                {/* SIDEBAR */}
                <aside className="registration-sidebar">

                    <RegistrationStepper
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        onStepClick={handleStepClick}
                    />

                </aside>


                {/* CONTENT */}
                <main className="wizard-content">

                    <CurrentComponent
                        formData={formData}
                        onChange={handleChange}
                    />


                    {/* NAVIGATION */}
                    <div className="wizard-actions">

                        {/* PREVIOUS */}
                        {currentStep > 1 && (
                            <button
                                type="button"
                                className="wizard-previous-btn"
                                onClick={handlePrevious}
                            >
                                <i className="fas fa-arrow-left"></i>
                                Previous
                            </button>
                        )}


                        {/* NEXT */}
                        {currentStep < steps.length && (
                            <button
                                type="button"
                                className="wizard-next-btn"
                                onClick={handleNext}
                            >
                              Next
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        )}


                        {/* FINAL */}
                        {currentStep === steps.length && (
                            <button
                                type="button"
                                className="wizard-next-btn"
                            >
                                Review & Confirm
                                <i className="fas fa-check"></i>
                            </button>
                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default RegistrationWizard;