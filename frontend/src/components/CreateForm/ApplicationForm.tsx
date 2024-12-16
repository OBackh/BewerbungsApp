import './ApplicationForm.css';
import '../Delete/delete.css';
import axios from "axios";
import {useEffect, useState} from "react";
import ConfirmDialog from "../Delete/ConfirmDialog.tsx";
import ErrorMessage from "../Delete/ErrorMessage.tsx";

interface ApplicationData {
    companyName: string;
    status: string;
    applicationDate: string;
    jobPostingFoundDate: string;
    applicationEntryCreationDate: string;
    jobTitle: string;
    companyWebsite: string;
    companyEmail: string;
    companyStreet: string;
    companyHouseNumber: string;
    phoneNumber: string;
    contactPersonFirstName: string;
    contactPersonLastName: string;
    contactPersonEmail: string;
    jobSource: string;
    jobPostingUrl: string;
    applicationMethod: string;
    applicationPortalUrl: string;
    notes: string;
    uploadedDocuments: string;
}

interface CreateFormProps {
    readonly closeForm: () => void; // Funktion als Prop-Typ definieren
    readonly handleReload: () => void; // Callback, wenn neue Bewerbung erstellt wurde
    readonly applicationId?: string;
    readonly initialData: ApplicationData;
}

export default function ApplicationForm({ closeForm, handleReload, applicationId, initialData  }: CreateFormProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ApplicationData>(initialData);

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const request = applicationId
            ? axios.put(`api/application/${applicationId}`, formData)
            : axios.post("api/application", formData)

        request
            .then(() => {
                handleReload();
                closeForm();
            })
            .catch((error) => {
                console.error("Error saving application:", error);
                alert("Fehler beim speichern der Bewerbung.");
            });
    };

    function handleDelete() {
        console.log("Application ID: " + applicationId);
        if (applicationId) {
            setShowConfirm(true); // Zeige den Bestätigungsdialog an
        } else {
            setError("Es gibt keine Bewerbung zum Löschen.");
        }
    }

    const handleConfirmDelete = () => {
        setShowConfirm(false); // Bestätigungsdialog schließen
        axios.delete(`/api/application/${applicationId}`)
            .then(() => {
                handleReload(); // Aktualisiere die Liste nach dem Löschen
                closeForm(); // Schließe das Formular
            })
            .catch((error) => {
                console.error("Error deleting application:", error);
                setError("Fehler beim Löschen der Bewerbung.");
            });
    };

    const handleCancelDelete = () => {
        setShowConfirm(false); // Abbrechen und Dialog schließen
    };

    return (
        <div className="create-form-layer">
            <form onSubmit={handleSubmit}>
                <fieldset className="fieldset">
                    <legend className="details-title">
                        {applicationId ? "Bewerbung bearbeiten" : "Neue Bewerbung anlegen"}
                    </legend>
                    <div className="inputfields-with-labels">
                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-company">Unternehmen:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="companyName"
                                id="input-company"
                                type="text"
                                required
                                placeholder="Name der Firma"
                                value={formData.companyName || ""}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="status">Status der Bewerbung:&nbsp;</label>
                            <select
                                className="detail-entry-value"
                                id="status"
                                name="status"
                                required
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Bitte wählen ...</option>
                                <option value="PLANNED">GEPLANT</option>
                                <option value="CREATED">ERSTELLT</option>
                                <option value="SENT">GESENDET</option>
                                <option value="CONFIRMED">BESTÄTIGT</option>
                                <option value="UNDER_REVIEW">IN PRÜFUNG</option>
                                <option value="INVITATION">EINLADUNG</option>
                                <option value="ACCEPTED">ZUSAGE</option>
                                <option value="REJECTED">ABGESAGT</option>
                                <option value="WITHDRAWN">ZURÜCKGEZOGEN</option>
                                <option value="ARCHIVED">ARCHIVIERT</option>
                            </select>
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-applicationDate">Datum der
                                Bewerbung:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="applicationDate"
                                id="input-applicationDate"
                                type="date"
                                value={formData.applicationDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-jobPostingFoundDate">Entdeckt
                                am:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="jobPostingFoundDate"
                                id="input-jobPostingFoundDate"
                                type="date"
                                value={formData.jobPostingFoundDate}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-jobTitle">Jobtitel:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="jobTitle"
                                id="input-jobTitle"
                                type="text"
                                placeholder="Jobtitel"
                                value={formData.jobTitle}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-companyWebsite">Website des
                                Unternehmens:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="companyWebsite"
                                id="input-companyWebsite"
                                type="url"
                                placeholder="URL"
                                value={formData.companyWebsite}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-companyEmail">E-Mail des
                                Unternehmens:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="companyEmail"
                                id="input-companyEmail"
                                type="email"
                                placeholder="E-Mail"
                                value={formData.companyEmail}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-companyStreet">Straße des
                                Unternehmens:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="companyStreet"
                                id="input-companyStreet"
                                type="text"
                                placeholder="Straße"
                                value={formData.companyStreet}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-companyHouseNumber">Hausnummer des
                                Unternehmens:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="companyHouseNumber"
                                id="input-companyHouseNumber"
                                type="text"
                                placeholder="Nr."
                                value={formData.companyHouseNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label"
                                   htmlFor="input-phoneNumber">Telefonnummer:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="phoneNumber"
                                id="input-phoneNumber"
                                type="tel"
                                placeholder="Telefonnummer"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-contactPersonFirstName">Vorname
                                Ansprechpartner:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="contactPersonFirstName"
                                id="input-contactPersonFirstName"
                                type="text"
                                placeholder="Vorname des Ansprechpartners"
                                value={formData.contactPersonFirstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-contactPersonLastName">Nachname
                                Ansprechpartner:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="contactPersonLastName"
                                id="input-contactPersonLastName"
                                type="text"
                                placeholder="Nachname des Ansprechpartners"
                                value={formData.contactPersonLastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-contactPersonEmail">E-Mail
                                Ansprechpartner:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="contactPersonEmail"
                                id="input-contactPersonEmail"
                                type="email"
                                placeholder="E-Mail"
                                value={formData.contactPersonEmail}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-jobSource">Quelle der
                                Stellenanzeige:&nbsp;</label>
                            <select
                                className="detail-entry-value"
                                name="jobSource"
                                id="input-jobSource"
                                value={formData.jobSource}
                                onChange={handleInputChange}
                            >
                                <option value="">Bitte wählen ...</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="indeed">Indeed</option>
                                <option value="stepstone">StepStone</option>
                                <option value="glassdoor">Glassdoor</option>
                                <option value="monster">Monster</option>
                                <option value="xing">Xing</option>
                                <option value="jobware">Jobware</option>
                                <option value="kununu">Kununu</option>
                                <option value="jobboerse">Bundesagentur für Arbeit</option>
                                <option value="firmenhomepage">Unternehmens Website</option>
                                <option value="meta">Meta Jobsuche</option>
                                <option value="sonstige">Sonstige</option>
                            </select>
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-jobPostingUrl">URL der
                                Stellenanzeige:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="jobPostingUrl"
                                id="input-jobPostingUrl"
                                type="url"
                                placeholder="URL"
                                value={formData.jobPostingUrl}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label"
                                   htmlFor="input-applicationMethod">Bewerbungsweg:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="applicationMethod"
                                id="input-applicationMethod"
                                type="text"
                                placeholder="Bewerbungsweg"
                                value={formData.applicationMethod}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-applicationPortalUrl">Bewerbungsportal
                                URL:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="applicationPortalUrl"
                                id="input-applicationPortalUrl"
                                type="url"
                                placeholder="Bewerbungsportal URL"
                                value={formData.applicationPortalUrl}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-notes">Notizen:&nbsp;</label>
                            <textarea
                                className="detail-entry-value"
                                name="notes"
                                id="input-notes"
                                placeholder="Notizen zur Bewerbung"
                                value={formData.notes}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-uploadedDocuments">Hochgeladene
                                Dokumente:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="uploadedDocuments"
                                id="input-uploadedDocuments"
                                type="text"
                                placeholder="Dokumente, die hochgeladen wurden"
                                value={formData.uploadedDocuments}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="form-buttons">
                        {applicationId ? <button type="button" className="button-delete" onClick={handleDelete}>Eintrag
                            Löschen</button> : null}
                        <button type="button" onClick={closeForm}>Abbrechen</button>
                        <button type="submit" className="button-save">Speichern</button>
                    </div>
                </fieldset>
            </form>
            {showConfirm && (
                <ConfirmDialog
                    message={`Möchten Sie die Bewerbung "${initialData.companyName}" wirklich löschen?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {error && <ErrorMessage message={error}/>}
        </div>
    );
}