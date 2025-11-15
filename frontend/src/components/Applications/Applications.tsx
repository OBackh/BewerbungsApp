import React, { useEffect } from "react";
import { Application } from "../Models/Application.ts";
import './applications.css';
import ApplicationDetails from "../Details/ApplicationDetails.tsx";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import api from "../../api/api.ts";



// Hilfsfunktion, um eine Verzögerung zu erzeugen
function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

type ApplicationsProps = {
    readonly reloadKey: number;
    readonly showFavorites?: boolean;
    readonly showArchive?: boolean;
    readonly setFormData: React.Dispatch<React.SetStateAction<{
        applicationId?: string;
        initialData: {
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
            isFavorite: string
        };
    } | null>>;
    readonly setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    readonly setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    readonly loading: boolean
    readonly setSelectedApplication: React.Dispatch<React.SetStateAction<Application | null>>;
    readonly selectedApplication: Application | null;
    readonly applications: Application[];
    readonly setApplications: React.Dispatch<React.SetStateAction<Application[]>>;

};

export default function Applications({
                                        reloadKey,
                                        showFavorites,
                                        showArchive,
                                        setFormData,
                                        setShowForm,
                                        setLoading,
                                        loading,
                                        setSelectedApplication,
                                        applications,
                                        setApplications,
                                        selectedApplication
                                     }: ApplicationsProps) {

    console.log("Alle Statuswerte:", applications.map(app => app.status));


    useEffect(() => {
        let isMounted = true;

        async function fetchApplications() {
            setLoading(true);

            await Promise.all([
                wait(700),
                api.get<Application[]>("/api/application")
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
    }, [reloadKey, setLoading, setApplications]);

    // Debugging-Effekt: Überwacht den Zustand von "selectedApplication"
    useEffect(() => {
        console.log("selectedApplication (useEffect): ", selectedApplication);
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
        console.log("selectedApplication (handleToggleDetails): ", selectedApplication)
    };

    const handleToggleFavorite = (applicationId: string) => {
        // Toggle Icon
        setApplications((prevApplications) =>
            prevApplications.map((application) =>
                application.id === applicationId
                    ? {
                        ...application,
                        isFavorite: application.isFavorite === "yes" ? "no" : "yes",
                    }
                    : application
            )
        )
        // Toggle db entry
        const applicationToUpdate = applications.find((a) => a.id === applicationId);
        if (applicationToUpdate) {
            api.put(`/api/application/${applicationId}`, {
                ...applicationToUpdate,
                isFavorite: applicationToUpdate.isFavorite === "yes" ? "no" : "yes",
            });
        } else {
            console.error("No application found with the given ID");
        }
    }

        function handleEdit(application: Application) {
        setFormData({
            applicationId: application.id,
            initialData: {
                companyName: application.companyName,
                status: application.status,
                applicationDate: application.applicationDate,
                jobPostingFoundDate: application.jobPostingFoundDate,
                applicationEntryCreationDate: application.applicationEntryCreationDate,
                jobTitle: application.jobTitle,
                jobTitleFree: application.jobTitleFree,
                companyWebsite: application.companyWebsite,
                companyEmail: application.companyEmail,
                companyStreet: application.companyStreet,
                companyHouseNumber: application.companyHouseNumber,
                phoneNumber: application.phoneNumber,
                contactPersonFirstName: application.contactPersonFirstName,
                contactPersonLastName: application.contactPersonLastName,
                contactPersonEmail: application.contactPersonEmail,
                jobSource: application.jobSource,
                jobSourceFree: application.jobSourceFree,
                jobPostingUrl: application.jobPostingUrl,
                applicationMethod: application.applicationMethod,
                applicationPortalUrl: application.applicationPortalUrl,
                notes: application.notes,
                uploadedDocuments: application.uploadedDocuments,
                isFavorite: application.isFavorite
            },
        });
        setShowForm(true);
        setSelectedApplication(null);
    }

    // Funktion zur Übersetzung der Statuswerte
    function translateStatus(status: string): string {
        const statusMap: { [key: string]: string } = {
            PLANNED: "Geplant",
            CREATED: "Erstellt",
            SENT: "Gesendet",
            CONFIRMED: "Bestätigt",
            UNDER_REVIEW: "In Prüfung",
            INVITATION: "Einladung",
            ACCEPTED: "Zusage",
            REJECTED: "Abgesagt",
            WITHDRAWN: "Zurückgezogen",
            ARCHIVED: "Archiviert"
        };



        return statusMap[status] || status; // Gibt den Status zurück, falls keine Übersetzung gefunden wurde
    }

    let captionText;
        if (showFavorites) {
            captionText = 'Meine Favoriten';
        } else if (showArchive) {
            captionText = 'Archiv';
        } else {
            captionText = 'Aktuelle Bewerbungen';
        }


   return (
        <div className="content">
                        {/* Zeigt das Overlay nur an, wenn loading false ist */}
                        {selectedApplication && !loading && (
                            <div
                                className="overlay-spinner"
                                role="status"
                                aria-label="Loading data..."
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
                            <caption className="caption">
                                {captionText}
                            </caption>
                            <thead>
                            <tr>
                                <th><span>Nr.</span></th>
                                <th><span>Status</span></th>
                                <th><span>Firmenname</span></th>
                                <th><span>Stellenbezeichnung</span></th>
                                <th><span className="date">Beworben am</span></th>
                                <th><span className="favorite-headline">Favorit</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            {applications

                                .filter((application) => {
                                    // Zeige nur Favoriten, wenn showFavorites true ist
                                    if (showFavorites) {
                                        return application.isFavorite === "yes";
                                    }

                                    // Zeige nur Archivierte Bewerbungen, wenn showArchive true ist
                                    if (showArchive) {
                                        return application.status === "ARCHIVED";
                                    }

                                    // Standardfall: Alle Bewerbungen anzeigen
                                    return application.status !== "ARCHIVED";
                                })

                                .slice() // Kopie des Arrays erstellen, um keine Mutationen zu verursachen
                                .sort((a, b) => {
                                    const order = [
                                        "PLANNED",
                                        "CREATED",
                                        "SENT",
                                        "CONFIRMED",
                                        "UNDER_REVIEW",
                                        "INVITATION",
                                        "ACCEPTED",
                                        "REJECTED",
                                        "WITHDRAWN",
                                        "ARCHIVED"
                                    ]; // Definierte Reihenfolge für Status
                                    const statusComparison = order.indexOf(a.status) - order.indexOf(b.status);

                                    if (statusComparison !== 0) {
                                        return statusComparison; // Sortiere zuerst nach Status
                                    }

                                    // Wenn der Status gleich ist, alphabetisch nach Firmenname sortieren
                                    return a.companyName.localeCompare(b.companyName);
                                })
                                .map((application, index) => (
                                    <tr
                                        className={`apply-card ${application.status}`}
                                        key={application.id}

                                    >

                                        <td>
                                            <button className="button-list"
                                                    onClick={() => handleToggleDetails(application)}>{index + 1}</button>
                                        </td>

                                        <td>
                                            <button onClick={() => handleToggleDetails(application)}
                                                    className={`status-typo ${application.status} button-list`}>{translateStatus(application.status)}</button>
                                        </td>
                                        <td>
                                            <button className="button-list td-with-break"
                                                    onClick={() => handleToggleDetails(application)}>{application.companyName}</button>
                                        </td>
                                        <td>
                                            <button className="button-list td-with-break"
                                                    onClick={() => handleToggleDetails(application)}>{(application.jobTitle === 'other' && application.jobTitleFree) ? application.jobTitleFree : application.jobTitle}</button>
                                        </td>
                                        <td>
                                            <button className="button-list date" onClick={() => handleToggleDetails(application)}>
                                                {new Date(application.applicationDate).toLocaleDateString("de-DE", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </button>
                                        </td>
                                        <td>
                                            <button className="button-favorite"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleFavorite(application.id);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        e.preventDefault(); // Verhindert die Standardaktion, falls nötig
                                                    }}

                                            >
                                                {application.isFavorite === "yes" ? (
                                                    <MdFavorite className="heart"/>
                                                ) : (
                                                    <MdFavoriteBorder className="heart"/>
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

        </div>
   );
}