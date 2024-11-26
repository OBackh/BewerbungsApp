package de.neuefische.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "applications")
public record ApplicationModel(
        @Id String id,
        String company_name,
        Enums.Status status
) {
}
