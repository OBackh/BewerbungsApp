package de.neuefische.backend.service;

import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.repository.ApplicationRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ApplicationServiceTest {

    private final ApplicationRepo mockRepo = mock(ApplicationRepo.class);

    private final IdService mockIdService = mock(IdService.class);

    @Test
    void testGetAllApplications() {
        //GIVEN
        List<ApplicationModel> testdata = List.of(
                new ApplicationModel("abcd123", "Firma1", "ACTIVE"),
                new ApplicationModel("abcd246", "Firma2", "SUCCESSFUL")
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
        ApplicationModel application = new ApplicationModel(applicationId, "Firma1", "ACTIVE");
        when(mockRepo.findById(applicationId)).thenReturn(Optional.of(application));

        ApplicationService underTest = new ApplicationService(mockIdService, mockRepo);

        //WHEN
        ApplicationModel actual = underTest.getApplicationById(applicationId);

        //THEN
        assertNotNull(actual, "Die zurückgegebene Bewerbung sollte nicht NULL sein");
        assertEquals(applicationId, actual.id(), "Die ID der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals("Firma1", actual.companyName(), "Der Firmenname der zurückgegebenen Bewerbung stimmt nicht überein");
        assertEquals("ACTIVE", actual.status(), "Der Status der zurückgegebenen Bewerbung stimmt nicht überein");

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

}