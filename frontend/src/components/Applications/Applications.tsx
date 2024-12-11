import React, { useState, useEffect } from "react";
import axios from "axios";
import { Application } from "./Application.ts";
import './applications.css';
import ApplicationDetails from "../Details/ApplicationDetails.tsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";

// Hilfsfunktion, um eine Verzögerung zu erzeugen
function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

type ApplicationsProps = {
    readonly reloadKey: number;
    readonly setFormData: React.Dispatch<React.SetStateAction<{
        applicationId?: string;
        initialData: { companyName: string; status: string };
    } | null>>;
    readonly setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    readonly loading: boolean
    readonly setSelectedApplication: React.Dispatch<React.SetStateAction<Application | null>>;
    readonly selectedApplication: Application | null;

};

export default function Applications({
                                        reloadKey,
                                        setFormData,
                                        setShowForm,
                                        setLoading,
                                        loading,
                                        setSelectedApplication,
                                        selectedApplication
                                     }: ApplicationsProps) {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchApplications() {
            setLoading(true);

            await Promise.all([
                wait(1200),
                axios.get<Application[]>("api/application")
                    .then((response) => {
                        if (isMounted) setApplications(response.data);
                    })
                    .catch((error) => {
                        if (isMounted) console.error("Error fetching applications:", error);
                    }),
            ]);

            if (isMounted) setLoading(false);
        }

        fetchApplications();

        return () => {
            isMounted = false; // Cleanup beim Unmount
        };
    }, [reloadKey]);

    // Debugging-Effekt: Überwacht den Zustand von "selectedApplication"
    useEffect(() => {
        console.log("Selected application:", selectedApplication);
    }, [selectedApplication]); // Führt die Funktion aus, wenn sich "selectedApplication" ändert

    if (loading) {
        return <LoadingSpinner/>;
    }


    const handleToggleDetails = (application: Application) => {
        if (selectedApplication?.id === application.id) {
            setSelectedApplication(null); // Detailansicht schließen
        } else {
            setSelectedApplication(application); // Detailansicht öffnen
        }
    };

    function handleEdit(application: Application) {
        setFormData({
            applicationId: application.id,
            initialData: {
                companyName: application.companyName,
                status: application.status,
            },
        });
        setShowForm(true);
        setSelectedApplication(null);
    }

   return (
        <div className="content">
            {/* Zeigt das Overlay nur an, wenn loading false ist */}
            {selectedApplication && !loading && (
                <div
                    className="overlay-spinner"
                    onClick={() => setSelectedApplication(null)}
                    role="presentation"
                    aria-label="Close details"
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setSelectedApplication(null);
                        }
                    }}
                >
                    <div
                        className="application-details-container"
                        onClick={(e) => e.stopPropagation()}
                        role="presentation"
                        aria-hidden="true"
                    >
                        <ApplicationDetails
                            toggleDetails={() => setSelectedApplication(null)}
                            selectedApplication={selectedApplication}
                            onEdit={handleEdit}
                        />
                    </div>
                </div>
            )}

            <table className="table-application-list">
                <thead>
                <tr>
                    <th><span>Status</span></th>
                    <th><span>Firmenname</span></th>
                    <th><span>Bewerbungs-ID</span></th>
                </tr>
                </thead>
                {/*<tbody>
                {applications.map((application) => (
                    <tr
                        className="apply-card"
                        key={application.id}
                        onClick={() => handleToggleDetails(application)}
                    >
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
                ))}
                </tbody>*/}
                <tbody>
                {applications
                    .slice() // Kopie des Arrays erstellen, um keine Mutationen zu verursachen
                    .sort((a, b) => {
                        const order = ["active", "successful", "rejected"]; // Definierte Reihenfolge für Status
                        const statusComparison = order.indexOf(a.status.toLowerCase()) - order.indexOf(b.status.toLowerCase());

                        if (statusComparison !== 0) {
                            return statusComparison; // Sortiere zuerst nach Status
                        }

                        // Wenn der Status gleich ist, alphabetisch nach Firmenname sortieren
                        return a.companyName.localeCompare(b.companyName);
                    })
                    .map((application) => (
                        <tr
                            className="apply-card"
                            key={application.id}
                            onClick={() => handleToggleDetails(application)}
                        >
                            <td>
                                <span
                                    className={`status-typo ${application.status}`}>{application.status}</span>
                            </td>
                            <td>
                                <span>{application.companyName}</span>
                            </td>
                            <td>
                                <span>{application.id}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
   );
}