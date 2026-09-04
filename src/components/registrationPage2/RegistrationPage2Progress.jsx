function RegistrationPage2Progress({
    steps,
    currentStep,
    completedSteps,
    onStepClick,
    isPaymentCompleted
}) {
    const handleStepClick = (stepId) => {
        if (isPaymentCompleted) {
            return;
        }

        if (stepId >= 1 && stepId <= 5) {
            onStepClick(stepId);
        }
    };

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
                        !isPaymentCompleted &&
                        step.id <= 5 &&
                        (completed || current);

                    return (
                        <button
                            key={step.id}
                            type="button"
                            className={`
                                page2-progress-item
                                ${current ? "is-current" : ""}
                                ${completed ? "is-completed" : ""}
                                ${!clickable ? "is-locked" : ""}
                            `}
                            disabled={!clickable}
                            onClick={() => handleStepClick(step.id)}
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