import './applicationsDetails.css'
import {Application} from "../Models/Application.ts";
import translateStatusToGerman from "../StatusTranslator/statusTranslatorToGerman.ts";

interface ApplicationDetailsProps {
    readonly toggleDetails: () => void;
    readonly selectedApplication: Application;
    readonly onEdit: (application: Application) => void;
}

export default function ApplicationDetails({toggleDetails, selectedApplication, onEdit }: ApplicationDetailsProps){
console.log("Details selAppl: ", selectedApplication);
    return (
        <div className="application-details">
            <div className="details-title">
                Bewerbungs Details
            </div>
            <div className="details-content">
                <p className="detail-entry"><span className="detail-entry-label">Name des Unternehmens:</span> <span
                    className="detail-entry-value">{selectedApplication.companyName}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Status der Bewerbung:</span>
                    <span className="detail-entry-value">{translateStatusToGerman(selectedApplication.status)}</span>
                </p>
                <p className="detail-entry"><span className="detail-entry-label">Datum der Bewerbung:</span> <span
                    className="detail-entry-value">{selectedApplication.applicationDate}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Ausschreibung gefunden am:</span>
                    <span className="detail-entry-value">{selectedApplication.jobPostingFoundDate}</span></p>
                <p className="detail-entry"><span
                    className="detail-entry-label">Eintrag erstellt am:</span> <span
                    className="detail-entry-value">{selectedApplication.applicationEntryCreationDate}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Jobtitel:</span> <span
                    className="detail-entry-value">{selectedApplication.jobTitleFree ? selectedApplication.jobTitleFree : selectedApplication.jobTitle}</span>
                </p>
                <p className="detail-entry"><span className="detail-entry-label">URL der Website:</span> <span
                    className="detail-entry-value">{selectedApplication.companyWebsite}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">E-Mail:</span> <span
                    className="detail-entry-value">{selectedApplication.companyEmail}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Straße:</span> <span
                    className="detail-entry-value">{selectedApplication.companyStreet}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Hausnummer:</span>
                    <span className="detail-entry-value">{selectedApplication.companyHouseNumber}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Telefonnummer:</span> <span
                    className="detail-entry-value">{selectedApplication.phoneNumber}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Ansprechpartner:</span>
                    <span
                        className="detail-entry-value">{selectedApplication.contactPersonFirstName} {selectedApplication.contactPersonLastName}</span>
                </p>
                <p className="detail-entry"><span className="detail-entry-label">E-Mail des Ansprechpartners:</span>
                    <span className="detail-entry-value">{selectedApplication.contactPersonEmail}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Quelle der Stellenanzeige:</span> <span
                    className="detail-entry-value">{selectedApplication.jobSourceFree ? selectedApplication.jobSourceFree : selectedApplication.jobSource}</span>
                </p>
                <p className="detail-entry"><span className="detail-entry-label">URL Stellenanzeige:</span> <span
                    className="detail-entry-value">{selectedApplication.jobPostingUrl}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Bewerbungsweg:</span> <span
                    className="detail-entry-value">{selectedApplication.applicationMethod}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Bewerbungsportal URL:</span> <span
                    className="detail-entry-value">{selectedApplication.applicationPortalUrl}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Notizen:</span> <span
                    className="detail-entry-value">{selectedApplication.notes}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Hochgeladene Dokumente:</span> <span
                    className="detail-entry-value">{selectedApplication.uploadedDocuments}</span></p>
                <p className="detail-entry"><span className="detail-entry-label">Ist ein Favorit?</span> <span
                    className="detail-entry-value">{selectedApplication.isFavorite}</span></p>
            </div>
            <div className="details-buttons">

                <button type="button"
                        className="button-edit"
                        onClick={() => {
                            toggleDetails();
                            onEdit(selectedApplication);
                        }}>Eintrag bearbeiten
                </button>

                <button type="button"
                        className="button-close"
                        onClick={() => {
                        toggleDetails();
                        }}>Schliessen
                </button>
            </div>
        </div>
    )
}