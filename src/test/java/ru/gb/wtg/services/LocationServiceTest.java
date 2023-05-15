package ru.gb.wtg.services;

import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.jdbc.Sql;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.repositories.location.LocationRepository;
import ru.gb.wtg.routes.Sector;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
//@Sql(value = {"classpath:V1_init.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
//@Sql(value = {"classpath:V2_init.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
//@Sql(value = {"classpath:V3_init.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class LocationServiceTest {

    @Autowired
    private LocationService locationService;

    @MockBean
    private LocationRepository locationRepository;

    @Test
    void findAll() {

        Location location1 = new Location();
        location1.setTitle("title");
        location1.setAddress("address");

        Mockito.doReturn(List.of(location1))
                .when(locationRepository).findAll();

        assertNotNull(locationService.findAll());
        Mockito.verify(locationRepository, Mockito.times(1)).findAll();


       assertInstanceOf( Location.class, locationService.findAll().get(0));

    }

    @Test
    void findAllWithPage() {


    }





}