import './createForm.css';
import axios from "axios";
import {useState} from "react";

interface CreateFormProps {
    readonly closeForm: () => void; // Funktion als Prop-Typ definieren
    readonly onApplicationCreated: () => void; // Callback, wenn neue Bewerbung erstellt wurde
}

export default function CreateForm({ closeForm, onApplicationCreated }: CreateFormProps) {
    const [companyName, setCompanyName] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newApplication = {
            companyName,
            status: "ACTIVE", // Standardwert für Status
        };

        axios.post("api/application", newApplication)
            .then(() => {
                onApplicationCreated(); // Trigger, um die Liste zu aktualisieren
                closeForm(); // Schließt das Formular
            })
            .catch((error) => {
                console.error("Error creating application:", error);
                alert("Fehler beim Hinzufügen der Bewerbung.");
            });
    };

    return (
        <div className="create-form-layer">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend className="form-title">Neue Bewerbung anlegen</legend>
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
                        <button type="button" onClick={closeForm}>Abbrechen</button>
                        <button type="submit">Speichern</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}