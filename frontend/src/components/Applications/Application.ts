import {ApplicationStatus} from "./ApplicationStatus.ts";

export type Application = {
    id: string;
    company_name: string;
    status: ApplicationStatus;

}

