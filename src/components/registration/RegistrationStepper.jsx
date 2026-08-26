import {
    FaUser,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaCalendarAlt,
    FaCloudUploadAlt,
    FaCheck
} from "react-icons/fa";

function RegistrationStepper({
    currentStep,
    completedSteps,
    onStepClick
}) {

    const steps = [
        {
            id: 1,
            title: "Registration Information",
            icon: <FaUser />
        },
        {
            id: 2,
            title: "Address & Communication",
            icon: <FaMapMarkerAlt />
        },
        {
            id: 3,
            title: "Test Details",
            icon: <FaCalendarAlt />
        },
        {
            id: 4,
            title: "Upload Documents",
            icon: <FaCloudUploadAlt />
        },
        {
            id: 5,
            title: "Review & Confirm",
            icon: <FaCheck />
        }
    ];

    return (
        <div className="registration-stepper">

            <div className="registration-stepper-header mb-1">

                <h1>SET 2026</h1>

                <p>Symbiosis Entrance Test</p>

            </div>


            <div className="registration-steps">

                {steps.map((step) => {

                    const isActive =
                        currentStep === step.id;

                    const isCompleted =
                        completedSteps?.includes(step.id);

                    const isClickable =
                        step.id <= currentStep ||
                        isCompleted;


                    return (
                        <div
                            key={step.id}
                            className={`
                                registration-step
                                ${isActive ? "active" : ""}
                                ${isCompleted ? "completed" : ""}
                                ${isClickable ? "clickable" : ""}
                            `}
                            onClick={() => {

                                if (isClickable) {
                                    onStepClick(step.id);
                                }

                            }}
                        >

                            {/* NUMBER */}
                            <div className="step-number">

                                {isCompleted
                                    ? <FaCheck />
                                    : step.id
                                }

                            </div>


                            {/* ICON */}
                            <div className="step-icon">

                                {step.icon}

                            </div>


                            {/* TITLE */}
                            <div className="step-title">

                                {step.title}

                            </div>

                        </div>
                    );

                })}

            </div>

        </div>
    );
}

export default RegistrationStepper;
// const steps = [
//     {
//         id: 1,
//         title: "Registration Information",
//         icon: "fa-user"
//     },
//     {
//         id: 2,
//         title: "Address & Communication",
//         icon: "fa-location-dot"
//     },
//     {
//         id: 3,
//         title: "Academic Details",
//         icon: "fa-graduation-cap"
//     },
//     {
//         id: 4,
//         title: "Test Dates",
//         icon: "fa-calendar"
//     },
//     {
//         id: 5,
//         title: "Upload Documents",
//         icon: "fa-cloud-arrow-up"
//     },
//     {
//         id: 6,
//         title: "Review & Confirm",
//         icon: "fa-circle-check"
//     }
// ];

// function RegistrationStepper() {
//     return (
//         <div className="registration-stepper">

//             <div className="registration-stepper-header">

//                 <h1>SET 2026</h1>

//                 <p>
//                     Symbiosis Entrance Test
//                 </p>

//             </div>


//             <div className="registration-steps">

//                 {steps.map((step, index) => (

//                     <div
//                         key={step.id}
//                         className={`registration-step ${
//                             index === 0 ? "active" : ""
//                         }`}
//                     >

//                         <div className="step-number">
//                             {step.id}
//                         </div>

//                         <div className="step-icon">
//                             <i
//                                 className={`fa-solid ${step.icon}`}
//                             ></i>
//                         </div>

//                         <div className="step-title">
//                             {step.title}
//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </div>
//     );
// }

// export default RegistrationStepper;