import './applicationsDetails.css'

interface ApplicationDetailsProps {
    readonly toggleDetails: () => void;
}

export default function ApplicationDetails({toggleDetails}: ApplicationDetailsProps){

    return (
        <div className="application-details">
            <div>
            <h2>Bewerbungs-Details</h2>
            <p>Name des Unternehmens: {}</p>
            </div>
                <div className="details-buttons">
                <button type="button" onClick={toggleDetails}>Schliessen</button>
            </div>
        </div>
    )
}