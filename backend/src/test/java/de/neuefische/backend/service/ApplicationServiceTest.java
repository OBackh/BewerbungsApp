package de.neuefische.backend.service;

import de.neuefische.backend.model.ApplicationModel;
import de.neuefische.backend.repository.ApplicationRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

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
}