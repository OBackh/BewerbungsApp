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
    }
}

export default function ApplicationForm({ closeForm, handleReload, applicationId, initialData  }: CreateFormProps) {
    const [companyName, setCompanyName] = useState(initialData.companyName);
    const [status, setStatus] = useState(initialData.status);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setCompanyName(initialData.companyName);
        setStatus(initialData.status);
    }, [initialData]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const applicationData = {
            companyName,
            status,
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
                    <legend className="form-title">{applicationId ? "Bewerbung bearbeiten" : "Neue Bewerbung anlegen"}</legend>
                    <div className="inputfields-with-labels">
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
                    <div className="form-buttons">
                        <button type="button" className="button-delete" onClick={handleDelete}>Eintrag Löschen</button>
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

            {error && <ErrorMessage message={error} />}
        </div>
    );
}