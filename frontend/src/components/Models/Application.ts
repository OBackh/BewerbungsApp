import { ApplicationStatus } from "./ApplicationStatus.ts";

export type Application = {
    id: string;
    companyName: string;
    status: ApplicationStatus;
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
    isFavorite: string;
};