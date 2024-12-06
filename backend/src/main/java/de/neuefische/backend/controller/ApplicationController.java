package de.neuefische.backend.controller;

import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import de.neuefische.backend.dto.ApplicationDTO;

import java.util.List;

@RestController
@RequestMapping("/api/application")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public List<ApplicationModel> getAllApplications(){ return applicationService.getAllApplications();
    }

    @PostMapping
    public ResponseEntity<ApplicationModel> createApplication(@RequestBody ApplicationDTO applicationDTO) {
        ApplicationModel savedApplication = applicationService.addApplication(applicationDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationModel> getApplicationById(@PathVariable String id) {
        // Exception-Handling wird vom GlobalExceptionHandler übernommen
        ApplicationModel application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
        }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationModel> updateApplication(@PathVariable String id, @RequestBody ApplicationDTO updatedApplicationDTO) {
        ApplicationModel updatedApplication = applicationService.updateApplication(id, updatedApplicationDTO);
        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable String id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build(); //HTTP 204 - No Content
    }

}
