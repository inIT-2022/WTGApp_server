package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.location.LocationDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.services.LocationService;

import java.util.List;
import java.util.stream.Collectors;


/**
 * LocationController
 *
 * (@RestController) - указывает Spring что, это REST-контроллер
 * (комбинация @Controller и @ResponseBody).
 *
 * (@RequiredArgsConstructor) - аннотация Lombok,
 * генерирует конструктор с 1 параметром для каждого поля,
 * которое требует специальной обработки.
 * Все неинициализированные final поля получают параметр,
 * так же как все остальные поля, помеченные @NonNull,
 * которые не инициализированы при объявлении.
 * Для этих случаев также генерируется явная проверка на null.
 * Конструктор бросает исключение NullPointerException,
 * если какой-либо из параметров, предназначенный для полей,
 * помеченных @NonNull содержит null.
 * Порядок этих параметров совпадает с порядком появления полей в классе.
 *
 * (@RequestMapping)
 * Эта аннотация позволяет нам запускать методы и фрагменты кода каждый раз,
 * * когда конечный пользователь попадает в конечную точку с помощью HTTP-запроса.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/locations")
public class LocationController {

    /**
     * Инжектим бин LocationService в LocationController
     * с именем locationService.
     */
    private final LocationService locationService;

    /**
     * (@GetMapping) - аннотация для отображения запросов HTTP GET,
     * на определенные методы-обработчики.
     * Это составная аннотация,
     * которая действует как ярлык для
     * (@RequestMapping(method) = RequestMethod.GET)
     * @return
     *
     */
    // метод - получаем все локации (localhost:8179/wtg/api/v1/locations)
    @GetMapping()
    public List<LocationDTO> getAllLocations(){
        return locationService.findAll()
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    // метод - получаем локацию по Id (localhost:8179/wtg/api/v1/locations/1)
    @GetMapping("/{id}")
    public LocationDTO getLocationById(@PathVariable Long id){
        return new LocationDTO(locationService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Локация с данным id не найдена")));
    }


    // получаем локацию по названию (localhost:8179/wtg/api/v1/locations/title?title=Скейт парк)
    @GetMapping("/title")
    public LocationDTO getLocationByTitle(@RequestParam(name = "title") String title){
        return new LocationDTO(locationService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Локация с данным title не найдена")));
    }


    // получаем все локации по id категории (localhost:8179/wtg/api/v1/locations/category_id/1)
    @GetMapping("/category_id/{id}")
    public List<LocationDTO> getAllLocationsByCategory(@PathVariable Long id){  // TODO getAllLocationsByCategoryId
        return locationService.findAllByCategoryForLocations(id)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    // получаем все локации по названию категории (localhost:8179/wtg/api/v1/locations/category_title?title=STORY)
    @GetMapping("/category_title")
    public List<LocationDTO> getAllLocationsByCategory(@RequestParam(name = "title") String title){     // TODO getAllLocationsByCategoryTitle
        return locationService.findAllByCategoryForLocations(title)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    // создаем локацию
    // (localhost:8179/wtg/api/v1/locations/createLocation?
    //         title=ку&
    //         description=ахаххахахаха&
    //         fullDescription=бугагагаггагагагагаг&
    //         address=плющиха 2&
    //         latitude=10.0&
    //         longitude=50.0)
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

    // удаляем локации по id (localhost:8179/wtg/api/v1/locations/deleteLocationById/12)
    @DeleteMapping("/deleteLocationById/{id}")
    public void deleteLocationById(@PathVariable Long id){
        locationService.deleteLocation(id);
    }
}
