package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.location.LocationDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.services.LocationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/locations")
public class LocationController {

    private final LocationService locationService;

    @GetMapping()
    public List<LocationDTO> getAllLocations(){
        return locationService.findAll()
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public LocationDTO getLocationById(@PathVariable Long id){
        return new LocationDTO(locationService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Локация с данным id не найдена")));
    }

    @GetMapping("/title")
    public LocationDTO getLocationByTitle(@RequestParam(name = "title") String title){
        return new LocationDTO(locationService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Локация с данным title не найдена")));
    }

    @GetMapping("/category_id/{id}")
    public List<LocationDTO> getAllLocationsByCategory(@PathVariable Long id){
        return locationService.findAllByCategoryForLocations(id)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    public List<LocationDTO> getAllLocationsByCategory(@RequestParam(name = "title") String title){
        return locationService.findAllByCategoryForLocations(title)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/createLocation")
    public void createLocation(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description,
            @RequestParam(name = "fullDescription") String fullDescription,
            @RequestParam(name = "address") String address,

            @RequestParam(name = "latitude") Double latitude,
            @RequestParam(name = "longitude") Double longitude
    ){
        Location location = new Location();
        location.setTitle(title);
        location.setDescription(description);
        location.setFullDescription(fullDescription);
        location.setAddress(address);
        location.setLatitude(latitude);
        location.setLongitude(longitude);

        locationService.saveLocation(location);
    }

    @GetMapping("/manualTitle")
    public List<LocationDTO> getAllLocationsByManualTitle(@RequestParam(name = "manualTitle") String manualTitle){
        return locationService.findAllByManualTitle(manualTitle)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }


    @DeleteMapping("/deleteLocationById/{id}")
    public void deleteLocationById(@PathVariable Long id){
        locationService.deleteLocation(id);
    }



}
