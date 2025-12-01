package de.neuefische.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String home() {
        return "Backend läuft!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
