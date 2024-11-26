package de.neuefische.backend.repository;

import de.neuefische.backend.model.ApplicationModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApplicationRepo extends MongoRepository<ApplicationModel, String> {
}
