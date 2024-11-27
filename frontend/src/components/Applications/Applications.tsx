import { useState, useEffect } from "react";
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
        return <div>Loading Data...</div>;
    }

    function handleReload(){
        setRotate(true);
        setReloadKey(prevKey => prevKey + 1);

        setTimeout(() => {
            setRotate(false);
        }, 250);
    }

    return (
        <div className="applicationList">
            <ol className="orderedList">
                {applications.map((application) => (
                    <li className="applyCard" key={application.id}>
                        <span className={`statusTypo ${application.status}`}>{application.status}</span>
                        <span>{application.company_name}</span>
                        <span>{application.id}</span>
                        <button>Details</button>
                    </li>
                ))}
            </ol>
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
    );
}