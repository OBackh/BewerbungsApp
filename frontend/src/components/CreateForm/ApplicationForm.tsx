import './ApplicationForm.css';
import '../Delete/delete.css';
import axios from "axios";
import {useEffect, useState} from "react";
import ConfirmDialog from "../Delete/ConfirmDialog.tsx";
import ErrorMessage from "../Delete/ErrorMessage.tsx";


interface CreateFormProps {
    readonly closeForm: () => void; // Funktion als Prop-Typ definieren
    readonly handleReload: () => void; // Callback, wenn neue Bewerbung erstellt wurde
    readonly applicationId?: string;
    readonly initialData: {
        companyName: string;
        status: string;
        jobTitle: string;
        applicationDate: string;
        jobPostingFoundDate: string;
        applicationEntryCreationDate: string;
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
}

export default function ApplicationForm({ closeForm, handleReload, applicationId, initialData  }: CreateFormProps) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [companyName, setCompanyName] = useState(initialData.companyName);
    const [status, setStatus] = useState(initialData.status);
    const [jobTitle, setJobTitle] = useState(initialData.jobTitle);
    const [applicationDate, setApplicationDate] = useState(initialData.applicationDate);
    const [jobPostingFoundDate, setJobPostingFoundDate] = useState(initialData.jobPostingFoundDate);
    const [applicationEntryCreationDate, setApplicationEntryCreationDate] = useState(initialData.applicationEntryCreationDate);
    const [companyWebsite, setCompanyWebsite] = useState(initialData.companyWebsite);
    const [companyEmail, setCompanyEmail] = useState(initialData.companyEmail);
    const [companyStreet, setCompanyStreet] = useState(initialData.companyStreet);
    const [companyHouseNumber, setCompanyHouseNumber] = useState(initialData.companyHouseNumber);
    const [phoneNumber, setPhoneNumber] = useState(initialData.phoneNumber);
    const [contactPersonFirstName, setContactPersonFirstName] = useState(initialData.contactPersonFirstName);
    const [contactPersonLastName, setContactPersonLastName] = useState(initialData.contactPersonLastName);
    const [contactPersonEmail, setContactPersonEmail] = useState(initialData.contactPersonEmail);
    const [jobSource, setJobSource] = useState(initialData.jobSource);
    const [jobPostingUrl, setJobPostingUrl] = useState(initialData.jobPostingUrl);
    const [applicationMethod, setApplicationMethod] = useState(initialData.applicationMethod);
    const [applicationPortalUrl, setApplicationPortalUrl] = useState(initialData.applicationPortalUrl);
    const [notes, setNotes] = useState(initialData.notes);
    const [uploadedDocuments, setUploadedDocuments] = useState(initialData.uploadedDocuments);


    useEffect(() => {
        setCompanyName(initialData.companyName);
        setStatus(initialData.status);
        setJobTitle(initialData.jobTitle);
        setApplicationDate(initialData.applicationDate);
        setJobPostingFoundDate(initialData.jobPostingFoundDate);
        setApplicationEntryCreationDate(initialData.applicationEntryCreationDate);
        setCompanyWebsite(initialData.companyWebsite);
        setCompanyEmail(initialData.companyEmail);
        setCompanyStreet(initialData.companyStreet);
        setCompanyHouseNumber(initialData.companyHouseNumber);
        setPhoneNumber(initialData.phoneNumber);
        setContactPersonFirstName(initialData.contactPersonFirstName);
        setContactPersonLastName(initialData.contactPersonLastName);
        setContactPersonEmail(initialData.contactPersonEmail);
        setJobSource(initialData.jobSource);
        setJobPostingUrl(initialData.jobPostingUrl);
        setApplicationMethod(initialData.applicationMethod);
        setApplicationPortalUrl(initialData.applicationPortalUrl);
        setNotes(initialData.notes);
        setUploadedDocuments(initialData.uploadedDocuments);
    }, [initialData]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const applicationData = {
            companyName,
            status,
            applicationDate,
            jobPostingFoundDate,
            applicationEntryCreationDate,
            jobTitle,
            companyWebsite,
            companyEmail,
            companyStreet,
            companyHouseNumber,
            phoneNumber,
            contactPersonFirstName,
            contactPersonLastName,
            contactPersonEmail,
            jobSource,
            jobPostingUrl,
            applicationMethod,
            applicationPortalUrl,
            notes,
            uploadedDocuments
        };

        const request = applicationId
            ? axios.put(`api/application/${applicationId}`, applicationData)
            : axios.post("api/application", applicationData)

        request
            .then(() => {
                handleReload(); // Trigger, um die Liste zu aktualisieren
                closeForm(); // Schließt das Formular
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
                <fieldset>
                    <legend
                        className="form-title">{applicationId ? "Bewerbung bearbeiten" : "Neue Bewerbung anlegen"}</legend>
                    <div className="inputfields-with-labels">
                        <div>
                            <label className="input-labels" htmlFor="input-company">Unternehmen:&nbsp;</label>
                            <input
                                className="input"
                                id="input-company"
                                type="text"
                                required
                                placeholder="Name der Firma"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div>
                            <select id="status"
                                    required
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="" disabled>Status der Bewerbung</option>
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
                    </div>


                    <div>
                        <label className="input-labels" htmlFor="input-applicationDate">Datum der
                            Bewerbung:&nbsp;</label>
                        <input
                            className="input"
                            id="input-applicationDate"
                            type="date"
                            value={applicationDate}
                            onChange={(e) => setApplicationDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-jobPostingFoundDate">Entdeckt am:&nbsp;</label>
                        <input
                            className="input"
                            id="input-jobPostingFoundDate"
                            type="date"
                            value={jobPostingFoundDate}
                            onChange={(e) => setJobPostingFoundDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-applicationEntryCreationDate">Datum der
                            Erstellung des Eintrags:&nbsp;</label>
                        <input
                            className="input"
                            id="input-applicationEntryCreationDate"
                            type="date"
                            value={applicationEntryCreationDate}
                            onChange={(e) => setApplicationEntryCreationDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="input-labels" htmlFor="input-jobTitle">Jobtitel:&nbsp;</label>
                        <input
                            className="input"
                            id="input-jobTitle"
                            type="text"
                            placeholder="Jobtitel"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="input-labels" htmlFor="input-companyWebsite">Website des
                            Unternehmens:&nbsp;</label>
                        <input
                            className="input"
                            id="input-companyWebsite"
                            type="url"
                            placeholder="Unternehmenswebsite"
                            value={companyWebsite}
                            onChange={(e) => setCompanyWebsite(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-companyEmail">E-Mail des
                            Unternehmens:&nbsp;</label>
                        <input
                            className="input"
                            id="input-companyEmail"
                            type="email"
                            placeholder="Unternehmens-E-Mail"
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-companyStreet">Straße des
                            Unternehmens:&nbsp;</label>
                        <input
                            className="input"
                            id="input-companyStreet"
                            type="text"
                            placeholder="Straße des Unternehmens"
                            value={companyStreet}
                            onChange={(e) => setCompanyStreet(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-companyHouseNumber">Hausnummer des
                            Unternehmens:&nbsp;</label>
                        <input
                            className="input"
                            id="input-companyHouseNumber"
                            type="text"
                            placeholder="Hausnummer"
                            value={companyHouseNumber}
                            onChange={(e) => setCompanyHouseNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-phoneNumber">Telefonnummer:&nbsp;</label>
                        <input
                            className="input"
                            id="input-phoneNumber"
                            type="tel"
                            placeholder="Telefonnummer"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-contactPersonFirstName">Vorname
                            Ansprechpartner:&nbsp;</label>
                        <input
                            className="input"
                            id="input-contactPersonFirstName"
                            type="text"
                            placeholder="Vorname des Ansprechpartners"
                            value={contactPersonFirstName}
                            onChange={(e) => setContactPersonFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-contactPersonLastName">Nachname
                            Ansprechpartner:&nbsp;</label>
                        <input
                            className="input"
                            id="input-contactPersonLastName"
                            type="text"
                            placeholder="Nachname des Ansprechpartners"
                            value={contactPersonLastName}
                            onChange={(e) => setContactPersonLastName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-contactPersonEmail">E-Mail
                            Ansprechpartner:&nbsp;</label>
                        <input
                            className="input"
                            id="input-contactPersonEmail"
                            type="email"
                            placeholder="E-Mail des Ansprechpartners"
                            value={contactPersonEmail}
                            onChange={(e) => setContactPersonEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-jobSource">Quelle der
                            Stellenanzeige:&nbsp;</label>
                        <input
                            className="input"
                            id="input-jobSource"
                            type="text"
                            placeholder="Quelle der Stellenanzeige"
                            value={jobSource}
                            onChange={(e) => setJobSource(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-jobPostingUrl">URL der
                            Stellenanzeige:&nbsp;</label>
                        <input
                            className="input"
                            id="input-jobPostingUrl"
                            type="url"
                            placeholder="URL der Stellenanzeige"
                            value={jobPostingUrl}
                            onChange={(e) => setJobPostingUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-applicationMethod">Bewerbungsweg:&nbsp;</label>
                        <input
                            className="input"
                            id="input-applicationMethod"
                            type="text"
                            placeholder="Bewerbungsweg"
                            value={applicationMethod}
                            onChange={(e) => setApplicationMethod(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-applicationPortalUrl">Bewerbungsportal
                            URL:&nbsp;</label>
                        <input
                            className="input"
                            id="input-applicationPortalUrl"
                            type="url"
                            placeholder="Bewerbungsportal URL"
                            value={applicationPortalUrl}
                            onChange={(e) => setApplicationPortalUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-notes">Notizen:&nbsp;</label>
                        <textarea
                            className="input"
                            id="input-notes"
                            placeholder="Notizen zur Bewerbung"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="input-labels" htmlFor="input-uploadedDocuments">Hochgeladene
                            Dokumente:&nbsp;</label>
                        <input
                            className="input"
                            id="input-uploadedDocuments"
                            type="text"
                            placeholder="Dokumente, die hochgeladen wurden"
                            value={uploadedDocuments}
                            onChange={(e) => setUploadedDocuments(e.target.value)}
                        />
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