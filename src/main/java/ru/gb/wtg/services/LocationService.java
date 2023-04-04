package ru.gb.wtg.services;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.location.CategoryForLocation;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.models.locationevent.Category;
import ru.gb.wtg.repositories.location.CategoryForLocationRepository;
import ru.gb.wtg.repositories.location.LocationRepository;
import ru.gb.wtg.repositories.locationevent.CategoryRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final CategoryForLocationRepository categoryForLocationRepository;
    private final CategoryRepository categoryRepository;

    public List<Location> findAll(){
        return locationRepository.findAll();
    }

    public Page<Location> findAllWithPage(int page, int pageSize){
        return locationRepository.findAllWithImage( PageRequest.of(page-1,pageSize));
    }

    public List<Category> findAllCategory(){
        return categoryRepository.findAll();
    }

    public List<CategoryForLocation> findAllCategories(){
        return categoryForLocationRepository.findAll();
    }

    public List<Location> findAllByLocationsCategoryAndSector (Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax,
                                                               long cat1, long cat2, long cat3, long cat4){
        return locationRepository.findAllByLocationsCategoriesAndSector(latitudeMin, latitudeMax, longitudeMin, longitudeMax,
                cat1, cat2, cat3, cat4);
    }

    public Optional<Location> findById(Long id){
        return locationRepository.findById(id);
    }

    public Optional<Location> findByTitle(String title){
        return locationRepository.findByTitle(title);
    }

    public List<Location> findAllByAddress(String address){
        return locationRepository.findAllByAddress(address);
    }

    public List<Location> findAllByLatitudeAndLongitude(Double latitude, Double longitude){
        return locationRepository.findAllByLatitudeAndLongitude(latitude, longitude);
    }

//    public List<Location> findAllByWorkTimeEnd(LocalDateTime workTimeEnd){
//        return locationRepository.findAllByWorkTimeEnd(workTimeEnd);
//    }
//
//    public List<Location> findAllByWorkTimeStart(LocalDateTime workTimeStart){
//        return locationRepository.findAllByWorkTimeStart(workTimeStart);
//    }
//
//    public List<Location> findAllByWorkBreakEnd(LocalDateTime workBreakEnd){
//        return locationRepository.findAllByWorkBreakEnd(workBreakEnd);
//    }
//
//    public List<Location> findAllByWorkBreakStart(LocalDateTime workBreakStart){
//        return locationRepository.findAllByWorkBreakStart(workBreakStart);
//    }

    public List<Location> findAllByCategoryForLocations(CategoryForLocation categoryForLocation){
        return locationRepository.findAllByCategoryForLocations(categoryForLocation);
    }

    public List<Location> findAllByCategoryForLocations(Long id){
        CategoryForLocation categoryForLocation = categoryForLocationRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Категория с данным id не найдена"));
        return locationRepository.findAllByCategoryForLocations(categoryForLocation);
    }

    public List<Location> findAllByCategoryForLocations(String title){
        CategoryForLocation categoryForLocation = categoryForLocationRepository.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Категория с данным title не найдена"));
        return locationRepository.findAllByCategoryForLocations(categoryForLocation);
    }

    public List<Location> findAllByManualTitle(String manualTitle){
        return locationRepository.findAllByManualTitle(manualTitle);
    }

    public Page<Location> findAllByManualTitleAndDescription(String manualTitle, int page, int pageSize ){
        return locationRepository.findAllByManualTitleAndDescription(manualTitle, PageRequest.of(page-1,pageSize));
    }

    public List<Location> findAllBySector(Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax){
        return locationRepository.findAllByLatitudeGreaterThanAndLatitudeLessThanAndLongitudeGreaterThanAndLongitudeLessThan(latitudeMin,latitudeMax,longitudeMin,longitudeMax);
    }

    public List<Location> findAllByLatitudeWithEvents(Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax){
        return locationRepository.findAllByLatitudeWithEvents(latitudeMin, latitudeMax, longitudeMin, longitudeMax);
    }

    public Location saveLocation(Location location){
       return locationRepository.save(location);
    }

    public void deleteLocation(Long id){
        locationRepository.deleteById(id);
    }


}
