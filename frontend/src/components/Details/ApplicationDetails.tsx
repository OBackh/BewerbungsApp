import './applicationsDetails.css'
import {Application} from "../Applications/Application.ts";

interface ApplicationDetailsProps {
    readonly toggleDetails: () => void;
    readonly selectedApplication: Application
}

export default function ApplicationDetails({toggleDetails, selectedApplication}: ApplicationDetailsProps){

    return (
        <div className="application-details">
            <div>
            <h2>Bewerbungs-Details</h2>
            <p>Name des Unternehmens: {selectedApplication.companyName}</p>
            </div>
                <div className="details-buttons">
                <button type="button" onClick={toggleDetails}>Schliessen</button>
            </div>
        </div>
    )
}