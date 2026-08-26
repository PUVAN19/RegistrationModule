import { useState } from "react";

import RegistrationHeader from "../registration/RegistrationHeader";

import RegistrationInformation from "../registration/sections/RegistrationInformation";
import AddressCommunication from "../registration/sections/AddressCommunication";
import TestDetails from "../registration/sections/TestDetails";
import DocumentUpload from "../registration/sections/DocumentUpload";

import RegistrationPage2Progress from "./RegistrationPage2Progress";
import RegistrationPage2Navigation from "./RegistrationPage2Navigation";
import RegistrationPage2Review from "./RegistrationPage2Review";
import RegistrationPaymentPage from "./RegistrationPaymentPage";


import "../../styles/registrationpage.css";

// "title" = shown once, inside the section's own header.
// "shortTitle" = the compact label under the stepper dot.
// Kept deliberately different so the page never repeats the
// same heading twice.
const registrationSteps = [
    {
        id: 1,
        key: "registration",
        shortTitle: "Personal",
        component: RegistrationInformation
    },
    {
        id: 2,
        key: "address",
        shortTitle: "Contact",
        component: AddressCommunication
    },
    {
        id: 3,
        key: "test",
        shortTitle: "Test",
        component: TestDetails
    },
    {
        id: 4,
        key: "documents",
        shortTitle: "Docs",
        component: DocumentUpload
    },
    {
        id: 5,
        key: "review",
        shortTitle: "Review",
        component: null
    },
    {
        id: 6,
        key: "payment",
        shortTitle: "Payment",
        component: null
    }
];


function RegistrationPage2Layout() {

    const [currentStep, setCurrentStep] = useState(1);

    const [completedSteps, setCompletedSteps] = useState([]);

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
        academicCertificate: null,

        declarationAccepted: false
    });


    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === "checkbox"
                ? checked
                : value
        }));
    };


    const handleNext = () => {

        if (currentStep >= registrationSteps.length) {
            return;
        }

        setCompletedSteps((previous) => {

            if (previous.includes(currentStep)) {
                return previous;
            }

            return [
                ...previous,
                currentStep
            ];
        });

        setCurrentStep((previous) => previous + 1);
    };


    const handlePrevious = () => {

        if (currentStep > 1) {
            setCurrentStep((previous) => previous - 1);
        }
    };


    const handleStepClick = (stepNumber) => {

        if (
            stepNumber === currentStep ||
            completedSteps.includes(stepNumber)
        ) {
            setCurrentStep(stepNumber);
        }
    };


    // Review's own "Confirm & Proceed to Payment" button advances
    // to the Payment step, same as handleNext, but always from
    // step 5 regardless of where it's called from.
    const handleConfirmApplication = () => {

        setCompletedSteps((previous) =>
            previous.includes(5) ? previous : [...previous, 5]
        );

        setCurrentStep(6);
    };


    const handleBackToReview = () => {
        setCurrentStep(5);
    };


    const currentStepConfig =
        registrationSteps.find(
            (step) => step.id === currentStep
        );


    const CurrentComponent =
        currentStepConfig?.component;

    // Steps 5 (Review) and 6 (Payment) have their own in-page
    // actions, so the shared Back/Continue footer only applies
    // to the four form steps.
    const showSharedNavigation = currentStep <= 4;


    return (
        <div className="page2">

            {/* =========================================
                HEADER
            ========================================= */}

            <RegistrationHeader />


            <main className="page2-main">

                {/* =====================================
                    APPLICATION WORKSPACE
                ===================================== */}

                <section className="page2-workspace">


                    {/* =================================
                        TOP AREA
                    ================================= */}

                    <div className="page2-top">

                        <div className="page2-heading">
                            <h1> Registration </h1>
                        </div>

                        <div className="page2-heading">
                             <span className="page2-eyebrow"> SET 2026 </span>
                        </div>
                    </div>


                    {/* =================================
                        PROGRESS
                    ================================= */}

                    <RegistrationPage2Progress
                        steps={registrationSteps}
                        currentStep={currentStep}
                        completedSteps={completedSteps}
                        onStepClick={handleStepClick}
                    />


                    {/* =================================
                        STEP CONTEXT
                        (kept intentionally minimal — each
                        section already carries its own
                        heading, so this doesn't repeat it)
                    ================================= */}

                    <div className="page2-section-heading">
                        <div>
                            <span>
                                Step {String(currentStep).padStart(2, "0")} of{" "}
                                {String(registrationSteps.length).padStart(2, "0")}
                            </span>
                        </div>
                    </div>


                    {/* =================================
                        FORM AREA
                    ================================= */}

                    <div className="page2-form-area">

                        {currentStep === 5 && (
                            <RegistrationPage2Review
                                formData={formData}
                                onChange={handleChange}
                                onEditStep={handleStepClick}
                                onConfirm={handleConfirmApplication}
                            />
                        )}

                        {currentStep === 6 && (
                            <RegistrationPaymentPage
                                formData={formData}
                                onBack={handleBackToReview}
                            />
                        )}

                        {CurrentComponent && (
                            <CurrentComponent
                                formData={formData}
                                onChange={handleChange}
                            />
                        )}

                    </div>


                    {/* =================================
                        NAVIGATION
                        (hidden on Review & Payment — both
                        have their own primary action)
                    ================================= */}

                    {showSharedNavigation && (

                        <RegistrationPage2Navigation
                            currentStep={currentStep}
                            totalSteps={registrationSteps.length}
                            onPrevious={handlePrevious}
                            onNext={handleNext}
                        />

                    )}


                </section>

            </main>

        </div>
    );
}


export default RegistrationPage2Layout;
