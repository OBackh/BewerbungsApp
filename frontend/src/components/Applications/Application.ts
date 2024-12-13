import { ApplicationStatus } from "./ApplicationStatus.ts";

export type Application = {
    id: string;
    companyName: string;
    status: ApplicationStatus;
    jobTitle: string;
    applicationDate: string; // Datum der Bewerbung
    jobPostingFoundDate: string; // Datum der Stellenausschreibung
    applicationEntryCreationDate: string; // Datum der Erstellung des Eintrags in der App
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
    uploadedDocuments: string; // URL zu hochgeladenen Dokumenten
};