package de.neuefische.backend.model;

public record ApplicationModel(
        String id,
        String company_name,
        Enums.Status status
) {
}
