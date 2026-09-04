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
import CreateAccount from "./CreateAccount";

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
        shortTitle: "Photo",
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
    },
     {
        id: 7,
        key: "account",
        shortTitle: "Account",
        component: null
    }
];


function RegistrationPage2Layout() {

    const [currentStep, setCurrentStep] = useState(1);

    const [completedSteps, setCompletedSteps] = useState([]);
    const [paymentResult, setPaymentResult] = useState(null);
    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
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
        nriAdmission: "",
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
        documentValidationError: "",
        declarationAccepted: false
    });

const [validationErrors, setValidationErrors] = useState({});
const handleChange = (event) => { 
    const {name,  value,  type,  checked  } = event.target;

    const newValue =  type === "checkbox"  ? checked  : value;

    setFormData((previous) => ({  ...previous,  [name]: newValue   }));

    setValidationErrors((previous) => { 
        const updated = {  ...previous   };

        delete updated[name]; 
        if (name === "photo") {
            delete updated.document;
        }

        return updated;
    });
};
const validateStep = () => {
    const errors = {};

    // ==========================================
    // STEP 1 - PERSONAL INFORMATION
    // ==========================================
    if (currentStep === 1) {

        const name = formData.applicantName?.trim();

        if (!name) {
            errors.applicantName = "Applicant Name is required.";
        }
        else if (name.length < 2) {
            errors.applicantName = "Applicant Name must contain at least 2 characters.";
        }
        else if (name.length > 100) {
            errors.applicantName =  "Applicant Name cannot exceed 100 characters.";
        }
        else if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/.test(name)) {
            errors.applicantName = "Applicant Name can contain letters and spaces only.";
        }

        // Date of Birth
        if (!formData.dateOfBirth) {
            errors.dateOfBirth = "Date of Birth is required.";
        }
        else {
            const dob = new Date(formData.dateOfBirth);
            const today = new Date();

            today.setHours(0, 0, 0, 0);
            dob.setHours(0, 0, 0, 0);

            if (isNaN(dob.getTime())) {
                errors.dateOfBirth = "Please select a valid date.";
            }
            else if (dob > today) {
                errors.dateOfBirth =
                    "Date of Birth cannot be a future date.";
            }
        }

        // Gender
        if (!formData.gender) {
            errors.gender = "Please select Gender.";
        }

        // Category
        if (!formData.category) {
            errors.category = "Please select Category.";
        }

        // PwD
        if (!formData.pwdStatus) {
            errors.pwdStatus = "Please select PwD status.";
        }
    }

    // ==========================================
    // STEP 2 - CONTACT INFORMATION
    // ==========================================
    if (currentStep === 2) {

        // Mobile
        const mobile = formData.mobileNumber?.trim();

        if (!mobile) {
            errors.mobileNumber = "Mobile Number is required.";
        }
        else if (!/^[0-9]+$/.test(mobile)) {
            errors.mobileNumber = "Mobile Number must contain numbers only.";
        }
        else if (mobile.length !== 10) {
            errors.mobileNumber = "Mobile Number must contain exactly 10 digits.";
        }

        // Email
        const email = formData.primaryEmail?.trim();

        if (!email) {
            errors.primaryEmail = "Primary Email is required.";
        }
        else if (  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)  ) {
            errors.primaryEmail = "Please enter a valid email address.";
        }

        // Confirm Email
        const confirmEmail = formData.confirmEmail?.trim();

        if (!confirmEmail) {
            errors.confirmEmail =  "Please retype your email address.";
        }
        else if (email !== confirmEmail) {
            errors.confirmEmail =  "Email addresses do not match.";
        }

        // Nationality
        if (!formData.nationality) {
            errors.nationality = "Please select Nationality.";
        }

        // NRI
        if (!formData.isNri) {
            errors.isNri =  "Please select whether you are an NRI candidate.";
        }

        // NRI Admission
        if (formData.isNri === "yes" &&  !formData.nriAdmission ) {
            errors.nriAdmission =  "Please select NRI admission preference.";
        }
    }
 
   if (currentStep === 3) { 
    // --------------------------------------
    // At least one test date
    // --------------------------------------

    if (!formData.testDate1 && !formData.testDate2) {
        errors.testDate = "Please select at least one test date.";
    }


    // ======================================
    // TEST 1
    // ======================================

    if (formData.testDate1) {

        const test1Set = formData.test1Set;
        const test1Sietee = formData.test1Sietee; 
        const city1 = formData.test1City1;
        const city2 = formData.test1City2;
        const city3 = formData.test1City3;
 
        // Examination
        if (!test1Set && !test1Sietee) {
            errors.test1Set = "Please select SET or SITEEE.";
        } 
        // City 1
        if (!city1) {
            errors.test1City1 = "Please select Test City 1.";
        } 
        // City 2
        if (!city2) {
            errors.test1City2 = "Please select Test City 2.";
        } 
        // City 3
        if (!city3) {
            errors.test1City3 = "Please select Test City 3.";
        } 
        // Duplicate cities
        if ( city1 &&  city2 && city1 === city2 ) {
            errors.test1City2 = "Test City 2 must be different from Test City 1.";
        } 
        if (city1 &&  city3 && city1 === city3 ) {
            errors.test1City3 =  "Test City 3 must be different from Test City 1.";
        } 
        if (city2 &&  city3 &&  city2 === city3  ) {
            errors.test1City3 = "Test City 3 must be different from Test City 2.";
        }
    }

    // ======================================
    // TEST 2
    // ======================================

    if (formData.testDate2) {

        const test2Set = formData.test2Set;
        const test2Sietee = formData.test2Sietee; 
        const city1 = formData.test2City1;
        const city2 = formData.test2City2;
        const city3 = formData.test2City3;
 
        // Examination
        if (!test2Set && !test2Sietee) {
            errors.test2Set = "Please select SET or SITEEE.";
        } 
        // City 1
        if (!city1) {
            errors.test2City1 =  "Please select Test City 1.";
        }
      // City 2
        if (!city2) {
            errors.test2City2 =  "Please select Test City 2.";
        }  
        // City 3
        if (!city3) {
            errors.test2City3 = "Please select Test City 3.";
        } 
        // Duplicate cities
        if (city1 &&  city2 && city1 === city2 ) {
            errors.test2City2 =  "Test City 2 must be different from Test City 1.";
        } 
        if (city1 &&  city3 && city1 === city3  ) {
            errors.test2City3 = "Test City 3 must be different from Test City 1.";
        } 
        if ( city2 && city3 && city2 === city3  ) {
            errors.test2City3 = "Test City 3 must be different from Test City 2.";
        }
    }
}

    // ==========================================
    // STEP 4 - DOCUMENT UPLOAD
    // ==========================================
   if (currentStep === 4) {

    if (!formData.photo) {
        errors.document =  "Please upload your passport size photograph.";
    }
    else { 
        const allowedTypes = [  "image/jpeg",  "image/png"  ];

        if (!allowedTypes.includes(formData.photo.type)) {
            errors.document =  "Only JPG and PNG images are allowed.";
        }
        else if (formData.photo.size > 2 * 1024 * 1024  ) {
            errors.document =  "Photograph size must not exceed 2 MB.";
        }
    }
} 
    return errors;
};
const handleNext = () => { 
    // Validate current step first
    const errors = validateStep();

    // If validation errors exist, stay on current step
    if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
    }

    // Clear errors
    setValidationErrors({});

    // Mark current step as completed
    setCompletedSteps((previous) => {
        if (previous.includes(currentStep)) {
            return previous;
        }

        return [...previous, currentStep];
    });

    // Move to next step
    if (currentStep < 5) {
        setCurrentStep((previous) => previous + 1);
    }
};

  const handlePrevious = () => { 
    if (isPaymentCompleted) {
        return;
    } 
    if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
    }
};

    const handleStepClick = (stepNumber) => { 
        if (stepNumber === currentStep || completedSteps.includes(stepNumber)  ) {
            setCurrentStep(stepNumber);
        }
    };


    // Review's own "Confirm & Proceed to Payment" button advances
    // to the Payment step, same as handleNext, but always from
    // step 5 regardless of where it's called from.

const handleConfirmApplication = () => {
    setCompletedSteps(previous =>
        previous.includes(5)  ? previous  : [...previous, 5]
    ); 
    setCurrentStep(6);
};
    const handleBackToReview = () => {
        setCurrentStep(5);
    };
 
    const currentStepConfig = registrationSteps.find((step) => step.id === currentStep  );  
    const CurrentComponent = currentStepConfig?.component; 
    // Steps 5 (Review) and 6 (Payment) have their own in-page
    // actions, so the shared Back/Continue footer only applies
    // to the four form steps.
    const showSharedNavigation = currentStep <= 4;
 
const handlePaymentSuccess = (paymentResult) => {

    console.log("Payment successful:", paymentResult);
    setPaymentResult(paymentResult);
    setIsPaymentCompleted(true);
    setCompletedSteps(previous =>
        previous.includes(6)  ? previous  : [...previous, 6]
    ); 
    setCurrentStep(7);
};
const handleAccountCreated = (result) => {
    console.log("Student account created:", result); 
    // Account creation is the final step of this registration flow.
    setCompletedSteps(previous =>
        previous.includes(7)  ? previous  : [...previous, 7]
    );
};
    return (
      <div className="page2">
        {/* == Header == */}
        <RegistrationHeader />
        <main className="page2-main">
          {/* === APPLICATION WORKSPACE ===*/}

          <section className="page2-workspace">
            {/* ===  TOP AREA ==== */}

            <div className="page2-top">
              <div className="page2-heading">
                <h1> Registration </h1>
              </div>
              <div className="page2-heading">
                <span className="page2-eyebrow"> SET 2026 </span>
              </div>
            </div>

            {/* == PROGRESS === */}

            <RegistrationPage2Progress
              steps={registrationSteps}
              currentStep={currentStep}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
              isPaymentCompleted={isPaymentCompleted}
            />

            {/*STEP CONTEXT (kept intentionally minimal — each section already carries its own   heading, so this doesn't repeat it) */}

            <div className="page2-section-heading">
              <div>
                <span>
                  Step {String(currentStep).padStart(2, "0")} of{" "}
                  {String(registrationSteps.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* ===  FORM AREA ==== */}

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
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}
              {currentStep === 7 && (
                <CreateAccount
                  studentId={paymentResult?.studentId}
                  email={formData.primaryEmail}
                  onAccountCreated={handleAccountCreated}
                />
              )}

              {CurrentComponent && (
                <CurrentComponent
                  formData={formData}
                  onChange={handleChange}
                  validationErrors={validationErrors}
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
                isPaymentCompleted={isPaymentCompleted}
              />
            )}
          </section>
        </main>
      </div>
    );
}


export default RegistrationPage2Layout;
