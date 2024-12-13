package de.neuefische.backend.model;

import de.neuefische.backend.model.Enum.Status;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "applications")
public record ApplicationModel(
        @Id String id,
        String companyName,
        Status status,
        LocalDate applicationDate,
        LocalDate jobPostingFoundDate,
        LocalDate applicationEntryCreationDate,
        String jobTitle,
        String companyWebsite,
        String companyEmail,
        String companyStreet,
        String companyHouseNumber,
        String phoneNumber,
        String contactPersonFirstName,
        String contactPersonLastName,
        String contactPersonEmail,
        String jobSource,
        String jobPostingUrl,
        String applicationMethod,
        String applicationPortalUrl,
        String notes,
        String uploadedDocuments
) {
}
