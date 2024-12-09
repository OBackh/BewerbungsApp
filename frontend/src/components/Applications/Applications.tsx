import { useState, useEffect } from "react";
import axios from "axios";
import { Application } from "./Application.ts";
import './applications.css';
import reloadIcon from '../../assets/reload.svg';
import addIcon from '../../assets/add.svg';
import ApplicationForm from "../CreateForm/ApplicationForm.tsx";
import ApplicationDetails from "../Details/ApplicationDetails.tsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";

// Hilfsfunktion, um eine Verzögerung zu erzeugen
function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [reloadRotate, setReloadRotate] = useState<boolean>(false);
    const [addRotate, setAddRotate] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [formData, setFormData] = useState<{
        applicationId?: string;
        initialData: { companyName: string; status: string };
    } | null>(null);

    async function fetchApplications() {
        setLoading(true);

        // Lade Daten und verzögere gleichzeitig um mindestens 2 Sekunden
        await Promise.all([
            wait(1200), // Wartezeit von mindestens 2 Sekunden
            axios.get<Application[]>("api/application")
                .then((response) => {
                    setApplications(response.data); // Daten setzen
                })
                .catch((error) => {
                    console.error("Error fetching applications:", error);
                })
        ]);

        setLoading(false); // Spinner ausblenden
    }

    useEffect(() => {
        fetchApplications();
    }, [reloadKey]);

    if (loading) {
        return <LoadingSpinner />;
    }

    function handleReload(){
        setReloadRotate(true);
        setReloadKey(prevKey => prevKey + 1);

        setTimeout(() => {
            setReloadRotate(false);
        }, 250);
    }

    function handleAdd() {
        setAddRotate(true);

        setTimeout(() => {
            setAddRotate(false);
        }, 250);
        setFormData({
            applicationId: undefined, // Keine ID, da es sich um eine neue Bewerbung handelt
            initialData: {
                companyName: '', // Leeres Feld für Firmenname
                status: '', // Leeres Feld für Status
            },
        });
        setShowForm(true); // Formular anzeigen
    }

    function handleToggleDetails(selectedApplication: Application) {
        setSelectedApplication(selectedApplication);
    }

    function handleEdit(application: Application) {
        setSelectedApplication(null);
        setFormData({
            applicationId: application.id,
            initialData: {
                companyName: application.companyName,
                status: application.status,
            },
        });
        setShowForm(true);
    }



    return (
            <div className="content">
                <table className="table-application-list">
                    <thead>
                    <tr>
                        <th><span>Status</span></th>
                        <th><span>Firmenname</span></th>
                        <th><span>Bewerbungs-ID</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map((application) => (
                        <tr className="apply-card" key={application.id} onClick={() => handleToggleDetails(application)}>
                            <td>
                                <span className={`status-typo ${application.status}`}>{application.status}</span>
                            </td>

                            <td>
                                <span>{application.companyName}</span>
                            </td>


                            <td>
                                <span>{application.id}</span>
                            </td>

                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            <div>
<span>
                <button className="reload-button" onClick={handleReload}>
                    <img
                        src={reloadIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={reloadRotate ? 'rotate' : ''}
                    />
                </button>
    <button className="add-button" onClick={handleAdd}>
                    <img
                        src={addIcon}
                        alt="Add new Apply"
                        width="24"
                        height="24"
                        className={addRotate ? 'rotate' : ''}
                    />
                </button>
      </span>

            </div>
            <div>
                {showForm && formData && (
                    <div className="overlay">
                        <div>
                            <ApplicationForm
                                closeForm={() => {
                                    setShowForm(false);
                                    setFormData(null); // Formular-Daten zurücksetzen
                                }}
                                handleReload={handleReload}
                                applicationId={formData.applicationId}
                                initialData={formData.initialData}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div>
                {selectedApplication && (
                    <div className="overlay"
                         onClick={() => setSelectedApplication(null)}
                         role="presentation" // beschreibt, dass es visuell, aber nicht semantisch interaktiv ist
                         aria-label="Close details" // beschreibt die Funktion für Screenreader
                         onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                setSelectedApplication(null);
                                }
                        }}>
                        <div className="application-details-container"
                             onClick={(e) => e.stopPropagation()}
                             role="presentation"
                             aria-hidden="true">
                            <ApplicationDetails
                                toggleDetails={() => setSelectedApplication(null)}
                                selectedApplication={selectedApplication}
                                onEdit={handleEdit}
                            />
                        </div>
                    </div>
                )}
            </div>
            </div>
    );
}