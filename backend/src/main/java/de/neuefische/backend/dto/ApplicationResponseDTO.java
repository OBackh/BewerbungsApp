package de.neuefische.backend.dto;

import lombok.*;

@Data
@Getter
@Setter
public class ApplicationResponseDTO {
    private String id;
    private String companyName;
    private String status;

    }