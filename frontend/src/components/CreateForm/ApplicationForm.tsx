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
    jobTitleFree: string;
    companyWebsite: string;
    companyEmail: string;
    companyStreet: string;
    companyHouseNumber: string;
    phoneNumber: string;
    contactPersonFirstName: string;
    contactPersonLastName: string;
    contactPersonEmail: string;
    jobSource: string;
    jobSourceFree: string;
    jobPostingUrl: string;
    applicationMethod: string;
    applicationPortalUrl: string;
    notes: string;
    uploadedDocuments: string;
    isFavorite: string;
}

interface CreateFormProps {
    readonly closeForm: () => void;
    readonly handleReload: () => void;
    readonly applicationId?: string;
    readonly initialData: ApplicationData;
}

export default function ApplicationForm({ closeForm, handleReload, applicationId, initialData  }: CreateFormProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<ApplicationData>(initialData);

    console.log("InitialData: ", initialData);


    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const formatDateForInput = (date: Date | string): string => {
        const localDate = new Date(date);
        const year = localDate.getFullYear();
        const month = String(localDate.getMonth() + 1).padStart(2, '0');
        const day = String(localDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
            setShowConfirm(true);
        } else {
            setError("Es gibt keine Bewerbung zum Löschen.");
        }
    }

    const handleConfirmDelete = () => {
        setShowConfirm(false);
        axios.delete(`/api/application/${applicationId}`)
            .then(() => {
                handleReload();
                closeForm();
            })
            .catch((error) => {
                console.error("Error deleting application:", error);
                setError("Fehler beim Löschen der Bewerbung.");
            });
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
    };

    const handleJobTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        // Wenn 'other' ausgewählt wird, bleibt das benutzerdefinierte Jobtitel-Feld sichtbar
        if (value !== 'other') {
            // Setzt den benutzerdefinierten Jobtitel zurück, wenn eine Auswahl getroffen wird, die nicht 'other' ist
            setFormData((prev) => ({ ...prev, jobTitle: value, jobTitleFree: '' }));
        } else {
            // Setzt nur den Jobtitel, wenn 'other' ausgewählt wird
            setFormData((prev) => ({ ...prev, jobTitle: value }));
        }
    };

    const handleCustomJobTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, jobTitleFree: value }));
    };

    const handleJobSourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;

        // Wenn 'other' ausgewählt wird, bleibt das benutzerdefinierte Jobquelle-Feld sichtbar
        if (value !== 'other') {
            // Setzt die benutzerdefinierte Jobquelle zurück, wenn eine Auswahl getroffen wird, die nicht 'other' ist
            setFormData((prev) => ({ ...prev, jobSource: value, jobSourceFree: '' }));
        } else {
            // Setzt nur die Jobquelle, wenn 'other' ausgewählt wird
            setFormData((prev) => ({ ...prev, jobSource: value }));
        }
    };

    const handleCustomJobSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, jobSourceFree: value }));
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
                            <label className="detail-entry-label" htmlFor="input-applicationDate">
                                Datum der Bewerbung:&nbsp;
                            </label>
                            <input
                                className="detail-entry-value"
                                name="applicationDate"
                                id="input-applicationDate"
                                type="date"
                                value={formatDateForInput(formData.applicationDate)}  // Hier wird das Datum formatiert
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
                                value={formatDateForInput(formData.jobPostingFoundDate)}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-jobTitle">Jobtitel:&nbsp;</label>
                            <select
                                className="detail-entry-value"
                                id="input-jobTitle"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleJobTitleChange}
                            >
                                <option value="">Bitte wählen ...</option>
                                <option value="Junior Fullstack Entwickler">Junior Fullstack Entwickler</option>
                                <option value="Webentwickler">Webentwickler</option>
                                <option value="Java Entwickler">Java Entwickler</option>
                                <option value="Frontend Entwickler">Frontend Entwickler</option>
                                <option value="Backend Entwickler">Backend Entwickler</option>
                                <option value="Fullstack Entwickler">Fullstack Entwickler</option>
                                <option value="other">Andere</option>
                            </select>

                            {formData.jobTitle === 'other' && (
                                <input
                                    className="detail-entry-value"
                                    type="text"
                                    id="input-custom-jobTitle"
                                    name="customJobTitle"
                                    placeholder="Jobtitel"
                                    value={formData.jobTitleFree}
                                    onChange={handleCustomJobTitleChange}
                                />
                            )}
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-companyWebsite">Website:&nbsp;</label>
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
                            <label className="detail-entry-label" htmlFor="input-companyEmail">E-Mail:&nbsp;</label>
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
                            <label className="detail-entry-label" htmlFor="input-companyStreet">Straße:&nbsp;</label>
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
                            <label className="detail-entry-label"
                                   htmlFor="input-companyHouseNumber">Hausnummer:&nbsp;</label>
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
                                des Ansprechpartners:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="contactPersonFirstName"
                                id="input-contactPersonFirstName"
                                type="text"
                                placeholder="Vorname"
                                value={formData.contactPersonFirstName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-contactPersonLastName">Nachname
                                des Ansprechpartners:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="contactPersonLastName"
                                id="input-contactPersonLastName"
                                type="text"
                                placeholder="Nachname"
                                value={formData.contactPersonLastName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-contactPersonEmail">E-Mail des
                                Ansprechpartners:&nbsp;</label>
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
                                onChange={handleJobSourceChange}
                            >
                                <option value="" disabled>Bitte wählen ...</option>
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
                                <option value="metajob">Meta Jobsuche</option>
                                <option value="other">Sonstige</option>
                            </select>
                            {formData.jobSource === 'other' && (
                                <input
                                    className="detail-entry-value"
                                    type="text"
                                    id="input-custom-jobSource"
                                    name="customJobSource"
                                    placeholder="Bitte eintragen ..."
                                    value={formData.jobSourceFree}
                                    onChange={handleCustomJobSourceChange}
                                />
                            )}
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
                            <label className="detail-entry-label"
                                   htmlFor="input-applicationPortalUrl">Bewerbungsportal-URL:&nbsp;</label>
                            <input
                                className="detail-entry-value"
                                name="applicationPortalUrl"
                                id="input-applicationPortalUrl"
                                type="url"
                                placeholder="Bewerbungsportal-URL"
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
                                type="file"
                                multiple
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="detail-entry">
                            <label className="detail-entry-label" htmlFor="input-isFavorite">Favorit:&nbsp;</label>

                            <div className="radio-buttons">
                                <label>
                                    <input
                                        className="detail-entry-value"
                                        name="isFavorite"
                                        type="radio"
                                        value="yes"
                                        checked={formData.isFavorite === 'yes'}
                                        onChange={handleInputChange}
                                    />
                                    Ja
                                </label>

                                <label>
                                    <input
                                        className="detail-entry-value"
                                        name="isFavorite"
                                        type="radio"
                                        value="no"
                                        checked={formData.isFavorite === 'no'}
                                        onChange={handleInputChange}
                                    />
                                    Nein
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-buttons">

                        {applicationId && (
                            <button
                                type="button"
                                className="button-delete"
                                onClick={handleDelete}
                            >
                                Löschen
                            </button>
                        )}
                        <button className="form-button" type="button" onClick={closeForm}>Abbrechen</button>
                        <button className="button-save" type="submit">
                            {applicationId ? "Übernehmen" : "Speichern"}
                        </button>
                    </div>
                </fieldset>
            </form>

            {showConfirm && (
                <ConfirmDialog
                    message="Sind Sie sicher, dass Sie die Bewerbung löschen möchten?"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}

            {error && <ErrorMessage message={error} />}
        </div>
    );
}