import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Header from "./components/Header/Header.tsx";
import Applications from "./components/Applications/Applications.tsx";
import ApplicationForm from "./components/CreateForm/ApplicationForm.tsx";
import { useState, useEffect } from "react";
import {Application} from "./components/Applications/Application.ts";

export default function App() {
    const [reloadRotate, setReloadRotate] = useState<boolean>(false);
    const [addRotate, setAddRotate] = useState<boolean>(false);
    const [archiveRotate, setArchiveRotate] = useState<boolean>(false);
    const [favoriteRotate, setFavoriteRotate] = useState<boolean>(false);
    const [reloadKey, setReloadKey] = useState<number>(0);
    const [formData, setFormData] = useState<{
        applicationId?: string;
        initialData: {
            companyName: string;
            status: string;
            applicationDate: string; // Datum der Bewerbung
            jobPostingFoundDate: string; // Datum der Stellenausschreibung
            applicationEntryCreationDate: string; // Datum der Erstellung des Eintrags in der App
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
    } | null>(null);

    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);
    const [showArchive, setShowArchive] = useState<boolean>(false);

    const disableButtons = loading || showForm || selectedApplication !== null;

    function handleReload() {
        setReloadRotate(true);
        setReloadKey(prevKey => prevKey + 1);
        setTimeout(() => {
            setReloadRotate(false);
        }, 250);
    }


function handleToggleFavoritePage(){
    setFavoriteRotate(true);

    setTimeout(() => {
        setFavoriteRotate(false);
    }, 250);

        setShowFavorites(!showFavorites);
        setShowArchive(false);
        console.log("ShowFav: ", showFavorites);
}

    function handleToggleArchivePage(){
        setArchiveRotate(true);

        setTimeout(() => {
            setArchiveRotate(false);
        }, 250);

        setShowArchive(!showArchive);
        setShowFavorites(false);
        console.log("ShowArchive: ", showArchive);
    }

    useEffect(() => {
        console.log("Neuer Klick: ")
        console.log("ShowFav: ", showFavorites);
        console.log("ShowArchive: ", showArchive);

    }, [showFavorites, showArchive]);

    function handleAdd() {
        setAddRotate(true);

        setTimeout(() => {
            setAddRotate(false);
        }, 250);
        setFormData({
            applicationId: undefined, // Keine ID, da es sich um eine neue Bewerbung handelt
            initialData: {
                companyName: '',
                status: '',
                applicationDate: '',
                jobPostingFoundDate: '',
                applicationEntryCreationDate: '',
                jobTitle: '',
                jobTitleFree: '',
                companyWebsite: '',
                companyEmail: '',
                companyStreet: '',
                companyHouseNumber: '',
                phoneNumber: '',
                contactPersonFirstName: '',
                contactPersonLastName: '',
                contactPersonEmail: '',
                jobSource: '',
                jobSourceFree: '',
                jobPostingUrl: '',
                applicationMethod: '',
                applicationPortalUrl: '',
                notes: '',
                uploadedDocuments: '',
                isFavorite: 'no',
            },
        });
        setShowForm(true); // Formular anzeigen
    }


    return (

        <Router>
            <Header/>

            <Routes>
                <Route path="/" element={
                    <Applications
                        reloadKey={reloadKey}
                        showArchive={showArchive}
                        showFavorites={showFavorites}
                        setFormData={setFormData}
                        setShowForm={setShowForm}
                        setLoading={setLoading}
                        loading={loading}
                        setSelectedApplication={setSelectedApplication}
                        selectedApplication={selectedApplication}
                    />
                } />
            </Routes>
            <Navbar
                reloadRotate={reloadRotate}
                addRotate={addRotate}
                archiveRotate={archiveRotate}
                favoriteRotate={favoriteRotate}
                onReload={handleReload}
                onFav={handleToggleFavoritePage}
                onArch={handleToggleArchivePage}
                onAdd={handleAdd}
                disableButtons={disableButtons}
                showArchive={showArchive}
                showFavorites={showFavorites}
                showForm={showForm}
            />
            {showForm && formData && (
                <div
                    className="overlay-form"
                    onClick={() => {
                        setShowForm(false);
                        setFormData(null);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setShowForm(false);
                            setFormData(null);
                        }
                    }}
                    role="presentation"
                >
                    <div
                        className="form-container"
                        onClick={(e) => e.stopPropagation()} // Verhindert das Weiterleiten des Klicks zum Overlay
                        role="presentation"
                    >
                        <ApplicationForm
                            closeForm={() => {
                                setShowForm(false);
                                setFormData(null);
                            }}
                            handleReload={handleReload}
                            applicationId={formData.applicationId}
                            initialData={formData.initialData}
                        />
                    </div>
                </div>
            )}
        </Router>

  )
}

