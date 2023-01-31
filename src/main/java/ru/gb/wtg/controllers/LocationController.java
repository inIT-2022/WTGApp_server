package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.location.CategoryForLocationDTO;
import ru.gb.wtg.dto.location.LocationDTO;
import ru.gb.wtg.dto.location.LocationInSector;
import ru.gb.wtg.dto.route.MapsDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.mapAPI.MapAPIInterface;
import ru.gb.wtg.mapAPI.Yandex.MapAPIYandex;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.routes.Sector;
import ru.gb.wtg.services.LocationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
//@RequiredArgsConstructor
@RequestMapping("api/v1/locations")
public class LocationController {

    private final LocationService locationService;
    private final MapAPIInterface mapAPIService;
    private final Sector sector;

    @Autowired
    public LocationController(LocationService locationService, @Qualifier("mapAPIYandex") MapAPIInterface mapAPIInterface, Sector sector) {
        this.locationService = locationService;
        this.mapAPIService = mapAPIInterface;
        this.sector = sector;
    }

    //todo only test
    @GetMapping("test")
    public List<Double> getCoordinateByAddress(String address){
        return mapAPIService.getCoordinateByAddress(address);
    }



//    @GetMapping()
//    public List<LocationDTO> getAllLocations(){
//        return locationService.findAll()
//                .stream()
//                .map(LocationDTO::new)
//                .collect(Collectors.toList());
//    }

    @GetMapping()
    public List<LocationDTO> getAllLocations(@RequestParam(name = "page") int page,
                                             @RequestParam(name = "pageSize") int pageSize){
        return locationService.findAllWithPage(page,pageSize)
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

    @GetMapping("/get-locations-categories")
    public List<CategoryForLocationDTO> getAllCategories(){
        return locationService.findAllCategories().stream().map(CategoryForLocationDTO::new).collect(Collectors.toList());
    }


    @GetMapping("/by-categories-and-sector")
    public List<LocationDTO> getAllByLocationsCategoriesAndSector(@RequestBody LocationInSector locationInSector){

        List<Double> coordinate = mapAPIService.getCoordinateByAddress(locationInSector.getAddress());
        double [][] sc = sector.getSectorByRadius(coordinate.get(0),coordinate.get(1), locationInSector.getRadius());
                                                        //  latitudeMin,latitudeMax,longitudeMin,longitudeMax
        return locationService.findAllByLocationsCategoryAndSector(sc[1][1],sc[0][1],sc[0][0],sc[1][0],
                locationInSector.getCategories()[0],locationInSector.getCategories()[1],locationInSector.getCategories()[2],locationInSector.getCategories()[3])
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


    //Метод принимает 2 параметра - адрес и радиус в метрах, а возвращает все локации, которые попали в заданную точку и координаты введенного адреса
    @GetMapping("/locations-by-sector")
    public MapsDTO getAllBySector(
//            @RequestParam(name = "latitude") Double latitude,
//            @RequestParam(name = "longitude") Double longitude,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "radius") int radius
    ){
        List<Double> coordinate = getCoordinateByAddress(address);
        System.out.println("long = " + coordinate.get(0) + " lat = " + coordinate.get(1));
        //double [][] sc = sector.getSectorByRadius(longitude,latitude,radius);
        double [][] sc = sector.getSectorByRadius(coordinate.get(0),coordinate.get(1),radius);
        System.out.println("sc[0][0] = " + sc[0][0] + " sc[0][1] = " + sc[0][1] );
        System.out.println("sc[1][0] = " + sc[1][0] + " sc[1][1] = " + sc[1][1] );

                                                                    //  latitudeMin,latitudeMax,longitudeMin,longitudeMax
        List<LocationDTO> locationDTOList = locationService.findAllBySector(sc[1][1],sc[0][1],sc[0][0],sc[1][0])
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());

                                            //  latitudeMin,latitudeMax,longitudeMin,longitudeMax
        return new MapsDTO(coordinate.get(0),coordinate.get(1), locationDTOList);
    }

    //todo only test
    @GetMapping("/locations-by-sector-test")
    public List<LocationDTO> getAllBySectorTest(
            @RequestParam(name = "latitudeMin") Double latitudeMin,
            @RequestParam(name = "latitudeMax") Double latitudeMax,
            @RequestParam(name = "longitudeMin") Double longitudeMin,
            @RequestParam(name = "longitudeMax") Double longitudeMax

    ){
        //  latitudeMin,latitudeMax,longitudeMin,longitudeMax
        return locationService.findAllBySector(latitudeMin,latitudeMax,longitudeMin,longitudeMax)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }




    @GetMapping("/locations-with-events-by-sector")
    public List<LocationDTO> getAllBySectorWithEvents(
            @RequestParam(name = "latitudeMin") Double latitudeMin,
            @RequestParam(name = "latitudeMax") Double latitudeMax,
            @RequestParam(name = "longitudeMin") Double longitudeMin,
            @RequestParam(name = "longitudeMax") Double longitudeMax
    ){
        return locationService.findAllByLatitudeWithEvents(latitudeMin, latitudeMax, longitudeMin, longitudeMax)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }


    @DeleteMapping("/deleteLocationById/{id}")
    public void deleteLocationById(@PathVariable Long id){
        locationService.deleteLocation(id);
    }



}
