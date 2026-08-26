import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import RegistrationWizard from "./pages/RegistrationWizard";
import RegistrationPage2 from "./pages/RegistrationPage2";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* <Route path="/registration" element={<Registration />} />
                <Route path="/registration/wizard" element={<RegistrationWizard />}  /> */}
                 <Route
                    path="/registration/page2"
                    element={<RegistrationPage2 />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;