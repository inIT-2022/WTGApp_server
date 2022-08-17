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

 * <p>
 *    (@RestController) - указывает Spring Framework что, это REST-контроллер
 *    (комбинация @Controller и @ResponseBody).
 * </p>
 *
 * <p>
 *    (@RequiredArgsConstructor) - аннотация Lombok,
 *    генерирует конструктор с 1 параметром для каждого поля,
 *    которое требует специальной обработки.
 *    Все неинициализированные final поля получают параметр,
 *    так же как все остальные поля, помеченные @NonNull,
 *    которые не инициализированы при объявлении.
 *    Для этих случаев также генерируется явная проверка на null.
 *    Конструктор бросает исключение NullPointerException,
 *    если какой-либо из параметров, предназначенный для полей,
 *    помеченных @NonNull содержит null.
 *    Порядок этих параметров совпадает с порядком появления полей в классе.
 * </p>
 * <p>
 *    (@RequestMapping) Эта аннотация позволяет нам запускать методы и фрагменты кода каждый раз,
 *    когда конечный пользователь попадает в конечную точку (endpoint) с помощью HTTP-запроса.
 * </p>
 * <p>
 *    С учетом того, что в application.yaml прописан префикс "/wtg",
 *    итоговый endpoint для LocationController,
 *    будет выглядеть так:
 *      "/wtg/api/v1/locations"
 * </p
 * <p>
 *    Для локального запуска:
 *      "localhost:8179/wtg/api/v1/locations"
 *    где:
 *      localhost - локальный адрес,
 *      8179      - порт прописанный в application.yaml
 * </p>
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
     * Получаем все локации
     * <p>пример запроса: localhost:8179/wtg/api/v1/locations</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     * (@Get/Post/Put/DeleteMapping) - аннотация для отображения запросов HTTP,
     * на определенные методы-обработчики.
     * Это составная аннотация, действует как ярлык.
     * (@RequestMapping(method) = RequestMethod.GET)
     *
     * @return Список<ЛокацийДТО> (List LocationDTO)
     *
     * 1)Используем метод НайтиВсе(), СервисаЛокаций (locationService),
     * возвращающего списокЛокаций (List<Location>).
     *
     * С помощью Stream API:
     * 2) из Списка<Локаций> (List<Location>),
     * получаем Стрим<Локаций> (Stream<Location>).
     *
     * 3) пересобираем Стрим<Локаций> (Stream<Location>),
     * в Стрим<ЛокацийДТО> (Stream <LocationDTO>).
     *
     * 4) переводим Стрим<ЛокацийДТО> (Stream<LocationDTO>),
     * в Список<ЛокацийДТО> (List<LocationDTO>)
     */
    @GetMapping()
    public List<LocationDTO> getAllLocations(){
        return locationService.findAll()
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Получаем локацию по id
     * <p>пример запроса: localhost:8179/wtg/api/v1/locations/category_id/1</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - id локации
     *
     * @return ЛокацияДТО (LocationDTO)
     *
     * Инициализируем Новую ЛокациюДТО (LocationDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод НайтиПоId findById,
     * СервисаЛокаций (locationService),
     * с параметром id.
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Локация с данным id не найдена".
     */

    @GetMapping("/{id}")
    public LocationDTO getLocationById(@PathVariable Long id){
        return new LocationDTO(locationService.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Локация с данным id не найдена")));
    }

    /**
     * Получаем локацию по названию
     *
     * <p>пример запроса: localhost:8179/wtg/api/v1/locations/title?title=Скейт парк</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру Наименование (title) имя - title,
     *    с помощью атрибута name,
     *    ля его дальнейшего использования.
     * </p>
     *
     * @param title (String) - Наименование локации
     *
     * @return ЛокацияДТО (LocationDTO)
     *
     * Инициализируем Новую ЛокациюДТО (LocationDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод НайтиПоНазванию findByTitle,
     * СервисаЛокаций (locationService),
     * с параметром Наименование (title).
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Локация с данным title не найдена".
     */
    @GetMapping("/title")
    public LocationDTO getLocationByTitle(@RequestParam(name = "title") String title){
        return new LocationDTO(locationService.findByTitle(title)
                .orElseThrow(()-> new ResourceNotFoundException("Локация с данным title не найдена")));
    }

    /**
     * Получаем все локации по id категории
     * <p>пример запроса: localhost:8179/wtg/api/v1/locations/category_id/1</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - оно же id категории

     * @return Список<ЛокацийДТО> (List LocationDTO)
     *
     * 1)Используем метод НайтиВсеКатегорииДляЛокаций,
     * СервисаЛокаций (locationService),
     * возвращающего списокЛокаций (List<Location>),
     * туда параметром отдаем id.
     *
     * С помощью Stream API:
     * 2) из Списка<Локаций> (List<Location>),
     * получаем Стрим<Локаций> (Stream<Location>).
     *
     * 3) пересобираем Стрим<Локаций> (Stream<Location>),
     * в Стрим<ЛокацийДТО> (Stream <LocationDTO>).
     *
     * 4) переводим Стрим<ЛокацийДТО> (Stream<LocationDTO>),
     * в Список<ЛокацийДТО> (List<LocationDTO>)
     */
    @GetMapping("/category_id/{id}")
    public List<LocationDTO> getAllLocationsByCategory(@PathVariable Long id){  // TODO getAllLocationsByCategoryId
        return locationService
                .findAllByCategoryForLocations(id)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Получаем все локации по наименованию категории
     * <p>пример запроса: localhost:8179/wtg/api/v1/locations/category_title?title=STORY</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру название категории (category_title) имя - title,
     *    с помощью атрибута name, для его дальнейшего использования.
     * </p>
     * @param title (String) - Наименование, оно же - наименование категории

     * @return Список<ЛокацийДТО> (List LocationDTO)
     *
     * 1)Используем метод НайтиВсеКатегорииДляЛокаций,
     * СервисаЛокаций (locationService),
     * возвращающего списокЛокаций (List<Location>),
     * туда параметром отдаем Наименование (title).
     *
     * С помощью Stream API:
     * 2) из Списка<Локаций> (List<Location>),
     * получаем Стрим<Локаций> (Stream<Location>).
     *
     * 3) пересобираем Стрим<Локаций> (Stream<Location>),
     * в Стрим<ЛокацийДТО> (Stream<LocationDTO>).
     *
     * 4) переводим Стрим<ЛокацийДТО> (Stream<LocationDTO>),
     * в Список<ЛокацийДТО> (List<LocationDTO>)
     */
    @GetMapping("/category_title")
    public List<LocationDTO> getAllLocationsByCategory(@RequestParam(name = "title") String title){  // TODO getAllLocationsByCategoryTitle
        return locationService
                .findAllByCategoryForLocations(title)
                .stream()
                .map(LocationDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Создаем локацию
     * <p>пример запроса: localhost:8179/wtg/api/v1/locations/createLocation?
     *         title=13Локация&
     *         description=описание полное&
     *         fullDescription=описание полное&
     *         address=Плющиха, 2&
     *         latitude=10.0&
     *         longitude=50.0)</p>
     *
     * (@PostMapping) в методе используется запрос типа: POST.
     *
     * @param title (String)            - Наименование локации
     * @param description (String)      - Описание короткое (филер)
     * @param fullDescription (String)  - Описание полное
     * @param address (String)          - Адрес
     * @param latitude (Double)         - Широта
     * @param longitude (Double)        - Долгота
     *
     * <p>Получаем данные следующим образом:</p>
     * <p>Инициализируем Новую Локацию (location),
     *    в которой через сеттеры формируем локацию:
     *    setTitle()             - параметром отдаем title;
     *    setDescription()       - параметром отдаем description;
     *    setFullDescription()   - параметром отдаем fullDescription;
     *    setAddress()           - параметром отдаем address;
     *    setLatitude()          - параметром отдаем latitude;
     *    setLongitude()         - параметром отдаем longitude.</p>
     *
     * <p>Сохраняем сформированную локацию,
     *    с помощью метода (saveLocation()),
     *    СервисаЛокаций (LocationService),
     *    куда параметром отдаем (location).
     * </p>
     *
     * <p>Передаем указанные выше параметры,
     *    для создания новой локации
     * </p>
     */
    @PostMapping("/createLocation")
    public void createLocation(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description,
            @RequestParam(name = "fullDescription") String fullDescription,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "latitude") Double latitude,
            @RequestParam(name = "longitude") Double longitude) {
        Location location = new Location();
        location.setTitle(title);
        location.setDescription(description);
        location.setFullDescription(fullDescription);
        location.setAddress(address);
        location.setLatitude(latitude);
        location.setLongitude(longitude);

        locationService.saveLocation(location);
    }

    /**
     * Удаляем локации по id:
     *  <p>пример запроса: localhost:8179/wtg/api/v1/locations/deleteLocationById/12</p>
     *
     * (@DeleteMapping) в методе используется запрос типа: DELETE.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * <p>Получаем данные с помощью метода,
     *    удалитьЛокацию() (deleteLocation()),
     *    с параметром (id)
     *    из СервисаЛокаций (LocationService)
     * </p>
     *
     * @param id (Long)
     * Передаем указанный параметр,
     * для определения локации, которую хотим удалить.
     */
    @DeleteMapping("/deleteLocationById/{id}")
    public void deleteLocationById(@PathVariable Long id){
        locationService.deleteLocation(id);
    }
}
