package de.neuefische.backend.service;

import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.repository.ApplicationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    public final ApplicationRepo applicationRepo;

    public List<ApplicationModel> getAllApplications() {
        return applicationRepo.findAll();
    }

}
