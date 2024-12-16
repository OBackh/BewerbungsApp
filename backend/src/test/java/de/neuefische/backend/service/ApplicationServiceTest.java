package de.neuefische.backend.service;

import de.neuefische.backend.dto.ApplicationDTO;
import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.repository.ApplicationRepo;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static de.neuefische.backend.model.Status.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApplicationServiceTest {

    private final ApplicationRepo mockRepo = mock(ApplicationRepo.class);

    private final IdService mockIdService = mock(IdService.class);

    @Test
    void testGetAllApplications() {
        // GIVEN
        List<ApplicationModel> testdata = List.of(
                new ApplicationModel(
                        "abcd123",
                        "Firma1",
                        UNDER_REVIEW,
                        LocalDate.of(2023, 12, 1),
                        LocalDate.of(2023, 11, 15),
                        LocalDate.of(2023, 12, 2),
                        "Software Developer",
                        "",
                        "https://firma1.de",
                        "info@firma1.de",
                        "Musterstraße",
                        "12",
                        "+491234567890",
                        "Max",
                        "Mustermann",
                        "max.mustermann@firma1.de",
                        "LinkedIn",
                        "",
                        "https://linkedin.com/job/12345",
                        "EMAIL",
                        "https://bewerbungsportal.firma1.de",
                        "Interessante Stelle mit tollen Aufgaben",
                        "bewerbung_firma1.pdf",
                        "no"
                ),
                new ApplicationModel(
                        "abcd246",
                        "Firma2",
                        CONFIRMED,
                        LocalDate.of(2023, 10, 20),
                        LocalDate.of(2023, 10, 10),
                        LocalDate.of(2023, 10, 21),
                        "Frontend Developer",
                        "",
                        "https://firma2.de",
                        "kontakt@firma2.de",
                        "Hauptstraße",
                        "45B",
                        "+492345678901",
                        "Anna",
                        "Musterfrau",
                        "anna.musterfrau@firma2.de",
                        "XING",
                        "",
                        "https://xing.com/job/67890",
                        "WEBSITE",
                        "https://bewerbungsportal.firma2.de",
                        "Gute Perspektiven und spannende Projekte",
                        "bewerbung_firma2.pdf",
                        "no"
                )
        );
        when(mockRepo.findAll()).thenReturn(testdata);


        //WHEN
        ApplicationService underTest = new ApplicationService(mockIdService, mockRepo);
        List<ApplicationModel> actual = underTest.getAllApplications();
        List<ApplicationModel> expected = testdata;

        //VERIFY
        verify(mockRepo).findAll();

        //THEN
        assertEquals(expected, actual, "Die zurückgegebene Liste der Anwendungen stimmt nicht mit den erwarteten Daten überein");
    }

    @Test
    void testGetApplicationById_ApplicationFound() {
        //GIVEN
        String applicationId = "abcd123";
        ApplicationModel application = new ApplicationModel(
                applicationId,
                "Firma1",
                UNDER_REVIEW,
                LocalDate.of(2023, 12, 1),
                LocalDate.of(2023, 11, 15),
                LocalDate.of(2023, 12, 2),
                "Software Developer",
                "",
                "https://firma1.de",
                "info@firma1.de",
                "Musterstraße",
                "12",
                "+491234567890",
                "Max",
                "Mustermann",
                "max.mustermann@firma1.de",
                "LinkedIn",
                "",
                "https://linkedin.com/job/12345",
                "EMAIL",
                "https://bewerbungsportal.firma1.de",
                "Interessante Stelle mit tollen Aufgaben",
                "bewerbung_firma1.pdf",
                "no"
        );
        when(mockRepo.findById(applicationId)).thenReturn(Optional.of(application));

        ApplicationService underTest = new ApplicationService(mockIdService, mockRepo);

        //WHEN
        ApplicationModel actual = underTest.getApplicationById(applicationId);

        //THEN
        assertNotNull(actual, "Die zurückgegebene Bewerbung sollte nicht NULL sein");
        assertEquals(applicationId, actual.id(), "Die ID der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals("Firma1", actual.companyName(), "Der Firmenname der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals(UNDER_REVIEW, actual.status(), "Der Status der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals(LocalDate.of(2023, 12, 1), actual.applicationDate(), "Das Bewerbungsdatum stimmt nicht überein");
        assertEquals(LocalDate.of(2023, 11, 15), actual.jobPostingFoundDate(), "Das Datum der Stellenausschreibung stimmt nicht überein");
        assertEquals(LocalDate.of(2023, 12, 2), actual.applicationEntryCreationDate(), "Das Datum der Erstellung des Eintrags stimmt nicht überein");
        assertEquals("Software Developer", actual.jobTitle(), "Die Stellenbezeichnung stimmt nicht überein");
        assertEquals("", actual.jobTitleFree(), "Die Stellenbezeichnung stimmt nicht überein");
        assertEquals("https://firma1.de", actual.companyWebsite(), "Die Website der Firma stimmt nicht überein");
        assertEquals("info@firma1.de", actual.companyEmail(), "Die E-Mail der Firma stimmt nicht überein");
        assertEquals("Musterstraße", actual.companyStreet(), "Die Straße der Firma stimmt nicht überein");
        assertEquals("12", actual.companyHouseNumber(), "Die Hausnummer der Firma stimmt nicht überein");
        assertEquals("+491234567890", actual.phoneNumber(), "Die Telefonnummer stimmt nicht überein");
        assertEquals("Max", actual.contactPersonFirstName(), "Der Vorname der Kontaktperson stimmt nicht überein");
        assertEquals("Mustermann", actual.contactPersonLastName(), "Der Nachname der Kontaktperson stimmt nicht überein");
        assertEquals("max.mustermann@firma1.de", actual.contactPersonEmail(), "Die E-Mail der Kontaktperson stimmt nicht überein");
        assertEquals("LinkedIn", actual.jobSource(), "Die Quelle der Stellenausschreibung stimmt nicht überein");
        assertEquals("", actual.jobSourceFree(), "Die Quelle der frei gewählten Stellenausschreibung stimmt nicht überein");
        assertEquals("https://linkedin.com/job/12345", actual.jobPostingUrl(), "Die URL der Stellenausschreibung stimmt nicht überein");
        assertEquals("EMAIL", actual.applicationMethod(), "Die Bewerbungsart stimmt nicht überein");
        assertEquals("https://bewerbungsportal.firma1.de", actual.applicationPortalUrl(), "Die URL des Bewerbungsportals stimmt nicht überein");
        assertEquals("Interessante Stelle mit tollen Aufgaben", actual.notes(), "Die Notizen stimmen nicht überein");
        assertEquals("bewerbung_firma1.pdf", actual.uploadedDocuments(), "Die hochgeladenen Dokumente stimmen nicht überein");
        assertEquals("no", actual.isFavorite(), "Der Favoritenstatus stimmt nicht überein");


        //VERIFY
        verify(mockRepo).findById(applicationId);
    }

    @Test
    void testGetApplicationById_ApplicationNotFound() {
        //GIVEN
        String applicationId = "abcd123";
        when(mockRepo.findById(applicationId)).thenReturn(Optional.empty());

        ApplicationService underTest = new ApplicationService(mockIdService, mockRepo);

        //WHEN & THEN

        NoSuchElementException exception = assertThrows(NoSuchElementException.class,
                () -> underTest.getApplicationById(applicationId)
        );

        assertEquals("Application not found with ID: abcd123", exception.getMessage(), "Die Fehlermeldung stimmt nicht überein");

        //VERIFY
        verify(mockRepo).findById(applicationId);
    }

    @Test
    void testAddApplication() {
        //GIVEN
        String generatedId = "abcd123";
        ApplicationDTO applicationDTO = new ApplicationDTO(
                "Firma1",
                UNDER_REVIEW,
                LocalDate.of(2023, 12, 1),
                LocalDate.of(2023, 11, 15),
                LocalDate.of(2023, 12, 2),
                "Software Developer",
                "",
                "https://firma1.de",
                "info@firma1.de",
                "Musterstraße",
                "12",
                "+491234567890",
                "Max",
                "Mustermann",
                "max.mustermann@firma1.de",
                "LinkedIn",
                "",
                "https://linkedin.com/job/12345",
                "EMAIL",
                "https://bewerbungsportal.firma1.de",
                "Interessante Stelle mit tollen Aufgaben",
                "bewerbung_firma1.pdf",
                "no"
        );

        ApplicationModel newApplication = new ApplicationModel(
                generatedId,
                "Firma1",
                UNDER_REVIEW,
                LocalDate.of(2023, 12, 1),
                LocalDate.of(2023, 11, 15),
                LocalDate.of(2023, 12, 2),
                "Software Developer",
                "",
                "https://firma1.de",
                "info@firma1.de",
                "Musterstraße",
                "12",
                "+491234567890",
                "Max",
                "Mustermann",
                "max.mustermann@firma1.de",
                "LinkedIn",
                "",
                "https://linkedin.com/job/12345",
                "EMAIL",
                "https://bewerbungsportal.firma1.de",
                "Interessante Stelle mit tollen Aufgaben",
                "bewerbung_firma1.pdf",
                "no"
        );


        // Mocking
        when(mockIdService.generateRandomId()).thenReturn(generatedId);
        when(mockRepo.save(any(ApplicationModel.class))).thenReturn(newApplication);
        when(mockRepo.findById(generatedId)).thenReturn(Optional.of(newApplication));

        ApplicationService underTest = new ApplicationService(mockIdService, mockRepo);

        //WHEN
        ApplicationModel actual = underTest.addApplication(applicationDTO);

        // THEN
        assertNotNull(actual, "Die zurückgegebene Bewerbung sollte nicht NULL sein");
        assertEquals(generatedId, actual.id(), "Die ID der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals("Firma1", actual.companyName(), "Der Firmenname der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals(UNDER_REVIEW, actual.status(), "Der Status der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals(LocalDate.of(2023, 12, 1), actual.applicationDate(), "Das Bewerbungsdatum stimmt nicht überein");
        assertEquals(LocalDate.of(2023, 11, 15), actual.jobPostingFoundDate(), "Das Datum der Stellenausschreibung stimmt nicht überein");
        assertEquals(LocalDate.of(2023, 12, 2), actual.applicationEntryCreationDate(), "Das Datum der Erstellung des Eintrags stimmt nicht überein");
        assertEquals("Software Developer", actual.jobTitle(), "Die Stellenbezeichnung stimmt nicht überein");
        assertEquals("", actual.jobTitleFree(), "Die Stellenbezeichnung stimmt nicht überein");
        assertEquals("https://firma1.de", actual.companyWebsite(), "Die Website der Firma stimmt nicht überein");
        assertEquals("info@firma1.de", actual.companyEmail(), "Die E-Mail der Firma stimmt nicht überein");
        assertEquals("Musterstraße", actual.companyStreet(), "Die Straße der Firma stimmt nicht überein");
        assertEquals("12", actual.companyHouseNumber(), "Die Hausnummer der Firma stimmt nicht überein");
        assertEquals("+491234567890", actual.phoneNumber(), "Die Telefonnummer stimmt nicht überein");
        assertEquals("Max", actual.contactPersonFirstName(), "Der Vorname der Kontaktperson stimmt nicht überein");
        assertEquals("Mustermann", actual.contactPersonLastName(), "Der Nachname der Kontaktperson stimmt nicht überein");
        assertEquals("max.mustermann@firma1.de", actual.contactPersonEmail(), "Die E-Mail der Kontaktperson stimmt nicht überein");
        assertEquals("LinkedIn", actual.jobSource(), "Die Quelle der Stellenausschreibung stimmt nicht überein");
        assertEquals("", actual.jobSourceFree(), "Die Quelle der frei gewählten Stellenausschreibung stimmt nicht überein");
        assertEquals("https://linkedin.com/job/12345", actual.jobPostingUrl(), "Die URL der Stellenausschreibung stimmt nicht überein");
        assertEquals("EMAIL", actual.applicationMethod(), "Die Bewerbungsart stimmt nicht überein");
        assertEquals("https://bewerbungsportal.firma1.de", actual.applicationPortalUrl(), "Die URL des Bewerbungsportals stimmt nicht überein");
        assertEquals("Interessante Stelle mit tollen Aufgaben", actual.notes(), "Die Notizen stimmen nicht überein");
        assertEquals("bewerbung_firma1.pdf", actual.uploadedDocuments(), "Die hochgeladenen Dokumente stimmen nicht überein");

        //VERIFY
        verify(mockIdService).generateRandomId();
        verify(mockRepo).save(any(ApplicationModel.class));
        verify(mockRepo).findById(generatedId);
    }

}