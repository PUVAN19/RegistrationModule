function RegistrationPage2Navigation({
    currentStep,
    totalSteps,
    onPrevious,
    onNext
}) {

    const isFirst =
        currentStep === 1;

    const isLast =
        currentStep === totalSteps;


    return (
        <div className="page2-navigation">

            <button
                type="button"
                className="page2-back-button"
                onClick={onPrevious}
                disabled={isFirst}
            >
                <span>
                    ←
                </span>

                Back
            </button>


            <div className="page2-navigation-meta">

                <span>
                    {String(currentStep).padStart(2, "0")}
                </span>

                <i />

                <span>
                    {String(totalSteps).padStart(2, "0")}
                </span>

            </div>


            <button
                type="button"
                className="page2-continue-button"
                onClick={onNext}
                disabled={isLast}
            >

                {isLast
                    ? "Review"
                    : "Continue"
                }

                <span>
                    →
                </span>

            </button>

        </div>
    );
}


export default RegistrationPage2Navigation;