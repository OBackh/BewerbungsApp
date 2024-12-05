package de.neuefische.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ApplicationResponseDTO {
    private String id;
    private String companyName;
    private String status;

    }