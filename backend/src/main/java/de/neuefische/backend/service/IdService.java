package de.neuefische.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {
    public String generateRandomId() {
        // UUID generieren und dann auf die ersten 8 Zeichen begrenzen
        String fullUUID = UUID.randomUUID().toString();
        return fullUUID.substring(0, 8);  // Die ersten 8 Zeichen extrahieren
    }
}


