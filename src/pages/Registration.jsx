import RegistrationHeader from "../components/registration/RegistrationHeader";
import RegistrationLayout from "../components/registration/RegistrationLayout";
import "../styles/registration.css";

function Registration() {
    return (
        <main className="registration-page">

            <RegistrationHeader />

            <RegistrationLayout />

        </main>
    );
}

export default Registration;