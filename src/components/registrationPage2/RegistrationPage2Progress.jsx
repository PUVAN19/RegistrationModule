function RegistrationPage2Progress({
    steps,
    currentStep,
    completedSteps,
    onStepClick
}) {

    return (
        <div className="page2-progress">

            <div className="page2-progress-line" />


            <div className="page2-progress-items">

                {steps.map((step) => {

                    const completed =
                        completedSteps.includes(step.id);

                    const current =
                        currentStep === step.id;

                    const clickable =
                        completed || current;


                    return (
                        <button
                            key={step.id}
                            type="button"
                            className={`
                                page2-progress-item
                                ${current ? "is-current" : ""}
                                ${completed ? "is-completed" : ""}
                            `}
                            disabled={!clickable}
                            onClick={() =>
                                onStepClick(step.id)
                            }
                        >

                            <span className="page2-progress-number">

                                {completed ? (
                                    "✓"
                                ) : (
                                    String(step.id).padStart(2, "0")
                                )}

                            </span>


                            <span className="page2-progress-title">
                                {step.shortTitle}
                            </span>

                        </button>
                    );

                })}

            </div>

        </div>
    );
}


export default RegistrationPage2Progress;