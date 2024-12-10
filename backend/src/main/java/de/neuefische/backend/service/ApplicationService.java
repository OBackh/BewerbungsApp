package de.neuefische.backend.service;

import de.neuefische.backend.dto.ApplicationDTO;
import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.repository.ApplicationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final IdService idService;
    public final ApplicationRepo applicationRepo;

    public List<ApplicationModel> getAllApplications() {
        return applicationRepo.findAll();
    }

    public ApplicationModel addApplication(ApplicationDTO applicationDTO) {
        ApplicationModel newApplication = new ApplicationModel(
                idService.generateRandomId(),
                applicationDTO.getCompanyName(),
                applicationDTO.getStatus()
        );
        applicationRepo.save(newApplication);
        return applicationRepo.findById(newApplication.id()).orElseThrow();
    }

    public ApplicationModel getApplicationById(String id) {
        return applicationRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Application not found with ID: " + id));
    }

    public ApplicationModel updateApplication(String id, ApplicationDTO updatedApplicationDTO) {
        ApplicationModel existingApplication = getApplicationById(id);

        ApplicationModel updatedApplication = new ApplicationModel(
                existingApplication.id(),
                updatedApplicationDTO.getCompanyName(),
                updatedApplicationDTO.getStatus()
        );
        return applicationRepo.save(updatedApplication);
    }

    public void deleteApplication(String id) {
        ApplicationModel application = applicationRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Application not found with ID: " + id));
        applicationRepo.delete(application);
    }
}
