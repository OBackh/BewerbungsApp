package de.neuefische.backend.integrationTest;


import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.repository.ApplicationRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;

import static de.neuefische.backend.model.Status.PLANNED;

@SpringBootTest
@AutoConfigureMockMvc
public class IntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ApplicationRepo applicationRepo;

    @Test
    void getAllApplications_shouldReturnListWithObject_whenObjectWasSavedInRepository() throws Exception {
        ApplicationModel application = new ApplicationModel("123abc", "TechCorp", PLANNED, LocalDate.parse("2024-12-01"),
                LocalDate.parse("2024-11-25"),
                LocalDate.parse("2024-12-02"), "Software Developer", "Backend Engineer", "https://techcorp.com", "contact@techcorp.com", "Tech Street", "42A", "+49 123 456 7890", "John", "Doe", "john.doe@techcorp.com", "LinkedIn", "Tech Meetup", "https://jobposting.techcorp.com", "Online", "https://portal.techcorp.com", "Excited about this opportunity.", "CV, Cover Letter", "true" );
        applicationRepo.save(application);

        mvc.perform(MockMvcRequestBuilders.get("/api/application"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                 [
                                 {
                                    "id": "123abc",
                                    "companyName": "TechCorp",
                                    "status": "PLANNED",
                                    "applicationDate": "2024-12-01",
                                    "jobPostingFoundDate": "2024-11-25",
                                    "applicationEntryCreationDate": "2024-12-02",
                                    "jobTitle": "Software Developer",
                                    "jobTitleFree": "Backend Engineer",
                                    "companyWebsite": "https://techcorp.com",
                                    "companyEmail": "contact@techcorp.com",
                                    "companyStreet": "Tech Street",
                                    "companyHouseNumber": "42A",
                                    "phoneNumber": "+49 123 456 7890",
                                    "contactPersonFirstName": "John",
                                    "contactPersonLastName": "Doe",
                                    "contactPersonEmail": "john.doe@techcorp.com",
                                    "jobSource": "LinkedIn",
                                    "jobSourceFree": "Tech Meetup",
                                    "jobPostingUrl": "https://jobposting.techcorp.com",
                                    "applicationMethod": "Online",
                                    "applicationPortalUrl": "https://portal.techcorp.com",
                                    "notes": "Excited about this opportunity.",
                                    "uploadedDocuments": "CV, Cover Letter",
                                    "isFavorite": "true"
                                  }
                                ]
                                """
                ));
    }

    @BeforeEach
    void setUp() {
        applicationRepo.deleteAll();  // Löscht alle bestehenden Anwendungen
    }

@Test
void addApplication_shouldReturnCreatedApplication()throws Exception{

    mvc.perform(MockMvcRequestBuilders.post("/api/application")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(
                            """
                                    {
                                    "companyName": "TechCorp",
                                    "status": "PLANNED",
                                    "applicationDate": "2024-12-01",
                                    "jobPostingFoundDate": "2024-11-25",
                                    "applicationEntryCreationDate": "2024-12-02",
                                    "jobTitle": "Software Developer",
                                    "jobTitleFree": "Backend Engineer",
                                    "companyWebsite": "https://techcorp.com",
                                    "companyEmail": "contact@techcorp.com",
                                    "companyStreet": "Tech Street",
                                    "companyHouseNumber": "42A",
                                    "phoneNumber": "+49 123 456 7890",
                                    "contactPersonFirstName": "John",
                                    "contactPersonLastName": "Doe",
                                    "contactPersonEmail": "john.doe@techcorp.com",
                                    "jobSource": "LinkedIn",
                                    "jobSourceFree": "Tech Meetup",
                                    "jobPostingUrl": "https://jobposting.techcorp.com",
                                    "applicationMethod": "Online",
                                    "applicationPortalUrl": "https://portal.techcorp.com",
                                    "notes": "Excited about this opportunity.",
                                    "uploadedDocuments": "CV, Cover Letter",
                                    "isFavorite": "true"
                                    }
                                    """
                    ))
            .andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(MockMvcResultMatchers.content().json(
                    """
                            
                            {
                                    "companyName": "TechCorp",
                                    "status": "PLANNED",
                                    "applicationDate": "2024-12-01",
                                    "jobPostingFoundDate": "2024-11-25",
                                    "applicationEntryCreationDate": "2024-12-02",
                                    "jobTitle": "Software Developer",
                                    "jobTitleFree": "Backend Engineer",
                                    "companyWebsite": "https://techcorp.com",
                                    "companyEmail": "contact@techcorp.com",
                                    "companyStreet": "Tech Street",
                                    "companyHouseNumber": "42A",
                                    "phoneNumber": "+49 123 456 7890",
                                    "contactPersonFirstName": "John",
                                    "contactPersonLastName": "Doe",
                                    "contactPersonEmail": "john.doe@techcorp.com",
                                    "jobSource": "LinkedIn",
                                    "jobSourceFree": "Tech Meetup",
                                    "jobPostingUrl": "https://jobposting.techcorp.com",
                                    "applicationMethod": "Online",
                                    "applicationPortalUrl": "https://portal.techcorp.com",
                                    "notes": "Excited about this opportunity.",
                                    "uploadedDocuments": "CV, Cover Letter",
                                    "isFavorite": "true"
                                }
                            """
            ));
}
}