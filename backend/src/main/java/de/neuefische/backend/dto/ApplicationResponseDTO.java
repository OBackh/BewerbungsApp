package de.neuefische.backend.dto;

import de.neuefische.backend.model.Status;
import lombok.*;

import java.time.LocalDate;

@Data
@Getter
@Setter
public class ApplicationResponseDTO {
    private String id;
    private String companyName;
    private Status status;
    private LocalDate applicationDate;
    private LocalDate jobPostingFoundDate;
    private LocalDate applicationEntryCreationDate;
    private String jobTitle;
    private String jobTitleFree;
    private String companyWebsite;
    private String companyEmail;
    private String companyStreet;
    private String companyHouseNumber;
    private String phoneNumber;
    private String contactPersonFirstName;
    private String contactPersonLastName;
    private String contactPersonEmail;
    private String jobSource;
    private String jobSourceFree;
    private String jobPostingUrl;
    private String applicationMethod;
    private String applicationPortalUrl;
    private String notes;
    private String isFavorite;
    }