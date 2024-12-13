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
    private final ApplicationRepo applicationRepo;

    public List<ApplicationModel> getAllApplications() {
        return applicationRepo.findAll();
    }

    public ApplicationModel addApplication(ApplicationDTO applicationDTO) {
        ApplicationModel newApplication = new ApplicationModel(
                idService.generateRandomId(),
                applicationDTO.getCompanyName(),
                applicationDTO.getStatus(),
                applicationDTO.getApplicationDate(),
                applicationDTO.getJobPostingFoundDate(),
                applicationDTO.getApplicationEntryCreationDate(),
                applicationDTO.getJobTitle(),
                applicationDTO.getCompanyWebsite(),
                applicationDTO.getCompanyEmail(),
                applicationDTO.getCompanyStreet(),
                applicationDTO.getCompanyHouseNumber(),
                applicationDTO.getPhoneNumber(),
                applicationDTO.getContactPersonFirstName(),
                applicationDTO.getContactPersonLastName(),
                applicationDTO.getContactPersonEmail(),
                applicationDTO.getJobSource(),
                applicationDTO.getJobPostingUrl(),
                applicationDTO.getApplicationMethod(),
                applicationDTO.getApplicationPortalUrl(),
                applicationDTO.getNotes(),
                applicationDTO.getUploadedDocuments()
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
                updatedApplicationDTO.getStatus(),
                updatedApplicationDTO.getApplicationDate(),
                updatedApplicationDTO.getJobPostingFoundDate(),
                updatedApplicationDTO.getApplicationEntryCreationDate(),
                updatedApplicationDTO.getJobTitle(),
                updatedApplicationDTO.getCompanyWebsite(),
                updatedApplicationDTO.getCompanyEmail(),
                updatedApplicationDTO.getCompanyStreet(),
                updatedApplicationDTO.getCompanyHouseNumber(),
                updatedApplicationDTO.getPhoneNumber(),
                updatedApplicationDTO.getContactPersonFirstName(),
                updatedApplicationDTO.getContactPersonLastName(),
                updatedApplicationDTO.getContactPersonEmail(),
                updatedApplicationDTO.getJobSource(),
                updatedApplicationDTO.getJobPostingUrl(),
                updatedApplicationDTO.getApplicationMethod(),
                updatedApplicationDTO.getApplicationPortalUrl(),
                updatedApplicationDTO.getNotes(),
                updatedApplicationDTO.getUploadedDocuments()
        );
        return applicationRepo.save(updatedApplication);
    }

    public void deleteApplication(String id) {
        if (!applicationRepo.existsById(id)) {
            throw new NoSuchElementException("Application not found with ID: " + id);
        }
        applicationRepo.deleteById(id);
    }
}
