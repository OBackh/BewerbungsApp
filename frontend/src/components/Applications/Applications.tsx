import React, { useState, useEffect } from "react";
import axios from "axios";
import { Application } from "./Application.ts";
import './applications.css';
import reloadIcon from '../../assets/reload.svg';

export default function Applications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [rotate, setRotate] = useState<boolean>(false);

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
        setRotate(true);
        setReloadKey(prevKey => prevKey + 1);

        setTimeout(() => {
            setRotate(false);
        }, 250);
    }

    return (
        <>
            <div>

                <button className="reloadButton" onClick={handleReload}>
                    <img
                        src={reloadIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={rotate ? 'rotate' : ''}
                    />
                </button>
                <br/>
            </div>
            <div>
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
                                <span>{application.company_name}</span>
                            </td>


                            <td>
                                <span>{application.id}</span>
                            </td>

                            <td className="function">
                                <button>Details</button>
                            </td>

                        </tr>
                    ))
                    }
                    </tbody>
                </table>
            </div>
            <br/>
            <div>

                <button className="reloadButton" onClick={handleReload}>
                    <img
                        src={reloadIcon}
                        alt="Reload"
                        width="24"
                        height="24"
                        className={rotate ? 'rotate' : ''}
                    />
                </button>
            </div>
        </>
    );
}