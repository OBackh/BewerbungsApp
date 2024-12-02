package de.neuefische.backend.service;

import de.neuefische.backend.dto.ApplicationDTO;
import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.repository.ApplicationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

}
