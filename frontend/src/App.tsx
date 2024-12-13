import './App.css'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import Applications from "./components/Applications/Applications.tsx";
import ApplicationForm from "./components/CreateForm/ApplicationForm.tsx";
import { useState } from "react";
import {Application} from "./components/Applications/Application.ts";

export default function App() {
    const [reloadRotate, setReloadRotate] = useState<boolean>(false);
    const [addRotate, setAddRotate] = useState<boolean>(false);
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
            companyWebsite: string;
            companyEmail: string;
            companyStreet: string;
            companyHouseNumber: string;
            phoneNumber: string;
            contactPersonFirstName: string;
            contactPersonLastName: string;
            contactPersonEmail: string;
            jobSource: string;
            jobPostingUrl: string;
            applicationMethod: string;
            applicationPortalUrl: string;
            notes: string;
            uploadedDocuments: string; };
    } | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

    const disableButtons = loading || showForm || selectedApplication !== null;

    function handleReload() {
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
                applicationDate: '',
                jobPostingFoundDate: '',
                applicationEntryCreationDate: '',
                jobTitle: '',
                companyWebsite: '',
                companyEmail: '',
                companyStreet: '',
                companyHouseNumber: '',
                phoneNumber: '',
                contactPersonFirstName: '',
                contactPersonLastName: '',
                contactPersonEmail: '',
                jobSource: '',
                jobPostingUrl: '',
                applicationMethod: '',
                applicationPortalUrl: '',
                notes: '',
                uploadedDocuments: ''
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
                        setFormData={setFormData} // Zum Bearbeiten von Bewerbungen
                        setShowForm={setShowForm}
                        setLoading={setLoading}
                        loading={loading}
                        setSelectedApplication={setSelectedApplication}
                        selectedApplication={selectedApplication}
                    />
                } />
            </Routes>
            <Footer
                reloadRotate={reloadRotate}
                addRotate={addRotate}
                onReload={handleReload}
                onAdd={handleAdd}
                disableButtons={disableButtons}
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
                    tabIndex={0} // Ermöglicht das Fangen von Tastatur-Ereignissen
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

