import { FaFileAlt, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import symbiosisLogo from "/images/SIULOGO.png";

function InformationPanel() {
    return (
        <div className="information-panel">

            <div className="university-brand">
                <img
                    src={symbiosisLogo}
                    alt="Symbiosis International University"
                    className="university-logo"
                />

                <div>
                    <h1>SYMBIOSIS</h1>
                    <p>INTERNATIONAL (DEEMED UNIVERSITY)</p>
                </div>
            </div>

            <div className="admission-heading">
                <div className="portal-kicker">
                    Symbiosis Entrance Test
                </div>

                <h1 className="portal-heading">
                    (SET) 2026
                </h1>

                <div className="gold-line"></div>
            </div>

           <div className="row information-cards">

    <div className="col-md-4">
        <div className="info-card">

            <div className="info-card-header">
                <div className="info-icon">
                    <FaFileAlt />
                </div>
                <h5>Instructions</h5>
            </div>

            <a href="#">Registration Guidelines</a>
            <a href="#">Payment Instructions</a>
            <a href="#">Admit Card Instructions</a>

        </div>
    </div>

    <div className="col-md-4">
        <div className="info-card">

            <div className="info-card-header">
                <div className="info-icon">
                    <FaCalendarAlt />
                </div>
                <h5>Important Dates</h5>
            </div>

            <a href="#">Registration Dates</a>
            <a href="#">Test Dates</a>
            <a href="#">Result Announcement</a>

        </div>
    </div>

    <div className="col-md-4">
        <div className="info-card">

            <div className="info-card-header">
                <div className="info-icon">
                    <FaInfoCircle />
                </div>
                <h5>Other Details</h5>
            </div>

            <a href="#">Test Cities</a>
            <a href="#">Help Desk</a>
            <a href="#">Admission Bulletin</a>

        </div>
    </div>

</div>

        </div>
    );
}

export default InformationPanel;