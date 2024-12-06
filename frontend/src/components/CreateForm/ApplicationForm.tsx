import './ApplicationForm.css';
import axios from "axios";
import {useEffect, useState} from "react";

interface CreateFormProps {
    readonly closeForm: () => void; // Funktion als Prop-Typ definieren
    readonly onApplicationCreated: () => void; // Callback, wenn neue Bewerbung erstellt wurde
    readonly applicationId?: number;
    readonly initialData: {
        companyName: string;
        status: string;
    }
}

export default function ApplicationForm({ closeForm, onApplicationCreated, applicationId, initialData  }: CreateFormProps) {
    const [companyName, setCompanyName] = useState(initialData.companyName);
    const [status, setStatus] = useState(initialData.status);

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
                onApplicationCreated(); // Trigger, um die Liste zu aktualisieren
                closeForm(); // Schließt das Formular
            })
            .catch((error) => {
                console.error("Error saving application:", error);
                alert("Fehler beim speichern der Bewerbung.");
            });
    };

    function handleDelete(){
        return console.log("DELETE");
    }

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
        </div>
    );
}