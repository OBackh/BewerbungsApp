import React, { useState, useEffect } from "react";
import axios from "axios";
import { Application } from "./Application.ts";
import './applications.css';
import reloadIcon from '../../assets/reload.svg';
import addIcon from '../../assets/add.svg';
import CreateForm from "../CreateForm/CreateForm.tsx";
import ApplicationDetails from "../Details/ApplicationDetails.tsx";

export default function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [reloadRotate, setReloadRotate] = useState<boolean>(false);
    const [addRotate, setAddRotate] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);

    function fetchApplications() {
        setLoading(true);
        axios.get<Application[]>("api/application")
            .then((response) => {
                setApplications(response.data);
                setLoading(false);

            })
            .catch((error) => {
                console.error("Error fetching applications:", error);
                setLoading(false);
            });
    }

    useEffect(()=> {
        fetchApplications();
    }, [reloadKey]);

    if (loading) {
        return <div className="loadingInfoBox">Loading Data...</div>;
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
        setShowForm(true); // Formular anzeigen
    }



    const closeForm = () => {
        setShowForm(false); // Formular und Overlay schließen
    };

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
        console.log("Toggled Details: " + showDetails)
    }


    return (
        <>
            <div className="content">
                <table className="tableApplicationList">
                    <thead>
                    <tr>
                        <th><span>Status</span></th>
                        <th><span>Firmenname</span></th>
                        <th><span>Bewerbungs-ID</span></th>
                        <th className="function"><span>Funktion</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map((application) => (
                        <tr className="applyCard" key={application.id}>
                            <td>
                                <span className={`statusTypo ${application.status}`}>{application.status}</span>
                            </td>

                            <td>
                                <span>{application.companyName}</span>
                            </td>


                            <td>
                                <span>{application.id}</span>
                            </td>

                            <td className="function">
                                <button onClick={handleToggleDetails}>Details</button>
                            </td>

                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>

            <div>
<span>
                <button className="reloadButton" onClick={handleReload}>
                    <img
                        src={reloadIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={reloadRotate ? 'rotate' : ''}
                    />
                </button>
    <button className="addButton" onClick={handleAdd}>
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
                {showForm && (
                    <div className="overlay">
                        <div>
                            <CreateForm closeForm={closeForm} onApplicationCreated={handleReload}/>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {showDetails && (
                    <div className="overlay"
                         onClick={handleToggleDetails}
                         role="presentation" // beschreibt, dass es visuell, aber nicht semantisch interaktiv ist
                         aria-label="Close details" // beschreibt die Funktion für Screenreader
                         onKeyDown={(e) => {
                            if (e.key === "Escape") {
                                handleToggleDetails();
                                }
                        }}>
                        <div className="application-details-container"
                             onClick={(e) => e.stopPropagation()}
                             role="presentation"
                             aria-hidden="true">
                            <ApplicationDetails toggleDetails={handleToggleDetails} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}