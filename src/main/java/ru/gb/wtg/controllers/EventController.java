package ru.gb.wtg.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.event.CategoryForEventDTO;
import ru.gb.wtg.dto.event.EventDTO;
import ru.gb.wtg.dto.event.EventInSector;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.mapAPI.MapAPIInterface;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.routes.Sector;
import ru.gb.wtg.services.EventService;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Api(tags="События")
@RequestMapping("api/v1/events")
public class EventController {

    private final EventService eventService;
    private DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    private final MapAPIInterface mapAPIService;
    private final Sector sector;

    public EventController(EventService eventService, @Qualifier("mapAPIYandex") MapAPIInterface mapAPIService, Sector sector) {
        this.eventService = eventService;
        this.mapAPIService = mapAPIService;
        this.sector = sector;
    }

    @GetMapping()
    @ApiOperation(value="Получение всех событий", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEvents(){
        return eventService.findAll()
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/event-by-location/{id}")
    @ApiOperation(value="Получение событий для локации по ее id", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsById (@PathVariable Long id){
       return eventService.findAllByLocation(id).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/event-by-location-later/{id}")
    @ApiOperation(value="Получение событий для локации по ее id с текущего момента", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsByIdLater (@PathVariable Long id){
        return eventService.findAllByLocationLater(id).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    // todo тестовый метод (удалить в дальнейшем)
    @GetMapping("/eventmodels")
    public List<Event> getAllEventModels(){
        return eventService.findAll();
    }

    @GetMapping("/after-now")
    @ApiOperation(value="Получение событий с текущего момента", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsAfterCurrentDate (@RequestParam(name = "page") int page,
                                                        @RequestParam(name = "pageSize") int pageSize){
        return eventService.findAllWithPageAfterCurrentDate(page,pageSize)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    // todo тестовый метод (удалить в дальнейшем)
    @GetMapping("/model/{id}")
    public Event getEventByIdModel(@PathVariable Long id){
        return eventService.findById(id).get();
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Получение события по id ", response = EventDTO.class)
    public EventDTO getEventById(@PathVariable Long id){
        return new EventDTO(eventService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Event с данным id не найден")));
    }

    @GetMapping("/title")
    @ApiOperation(value="Получение события по наименованию", response = EventDTO.class)
    public EventDTO getEventByTitle(@RequestParam(name = "title") String title){
        return new EventDTO(eventService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Event с данным title не найден")));
    }

    @GetMapping("/category/{id}")
    @ApiOperation(value = "Получение списка событий по id категории", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsByCategory(@PathVariable Long id){
        return eventService.findAllByCategoryForEvents(id)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    @ApiOperation(value = "Получение списка событий по имени категорий", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsByCategory(@RequestParam(name = "title") String title){
        return eventService.findAllByCategoryForEvents(title)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created/{id}")
    @ApiOperation(value = "Получение событий созданных пользователем по указанному id", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsByUserCreated(@PathVariable Long id){
        return eventService.findAllByUserCreated(id)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created_login")
    @ApiOperation(value = "Получение событий созданных пользователем по указанному логину", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsByUserCreated(@RequestParam(name = "login") String login){
        return eventService.findAllByUserCreated(login)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    //отдает события начиная от передаваемой даты до послейней хранящейся в БД
    //ожидаемый формат даты - 2022-07-10T08:00:00
    @GetMapping("/dateStart")
    @ApiOperation(value = "Получение событий с указанной даты", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsDateLater(@RequestParam(name = "dateStart") String dateStartString){
        LocalDateTime dateStart = LocalDateTime.parse(dateStartString, dateTimeFormatter);

        return eventService.findAllByDateLater(dateStart)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    //отдает события по диапазону дат "от" и "до"
    //ожидаемый формат даты - 2022-07-10T08:00:00
    @GetMapping("/dateBetween")
    @ApiOperation(value = "Получение событий в диапазоне дат", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsDateBetween(@RequestParam(name = "dateStart") String dateStartString,
                                                  @RequestParam(name = "dateEnd") String dateEndString){
        LocalDateTime dateStart = LocalDateTime.parse(dateStartString,dateTimeFormatter);
        LocalDateTime dateEnd = LocalDateTime.parse(dateEndString,dateTimeFormatter);
        return eventService.findAllByDateBetween(dateStart,dateEnd)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/manualTitle")
    @ApiOperation(value = "Получение событий в наименовании которых есть подстрока", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsByManualTitle(@RequestParam(name = "manualTitle") String manualTitle){
        return eventService.findAllByManualTitle(manualTitle)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/manual-title-description")
    @ApiOperation(value = "Получение событий в наименовании и описании которых есть подстрока", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllEventsByManualTitleAndDescription(@RequestParam(name = "manualTitle") String manualTitle,
                                                                  @RequestParam(name = "page") int page,
                                                                  @RequestParam(name = "pageSize") int pageSize){
        return eventService.findAllByManualTitleAndDescription(manualTitle, page, pageSize)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }



    @GetMapping("/by-categories-and-sector")
    @ApiOperation(value = "Получение событий по адресу", response = EventDTO.class, responseContainer = "list")
    public List<EventDTO> getAllByEventsCategoryAndSector(
            @RequestBody EventInSector eventInSector
//            @RequestParam(name = "address") String address,
//            @RequestParam(name = "radius") int radius,
//            @RequestParam(name = "categories") int categories
    ){

        List<Double> coordinate = mapAPIService.getCoordinateByAddress(eventInSector.getAddress());
        System.out.println("long = " + coordinate.get(0) + " lat = " + coordinate.get(1));
        //double [][] sc = sector.getSectorByRadius(longitude,latitude,radius);
        double [][] sc = sector.getSectorByRadius(coordinate.get(0),coordinate.get(1),eventInSector.getRadius());
        System.out.println("sc[0][0] = " + sc[0][0] + " sc[0][1] = " + sc[0][1] );
        System.out.println("sc[1][0] = " + sc[1][0] + " sc[1][1] = " + sc[1][1] );
        //  latitudeMin,latitudeMax,longitudeMin,longitudeMax
        return eventService.findAllByEventsCategoryAndSector(sc[1][1],sc[0][1],sc[0][0],sc[1][0],
                        eventInSector.getCategories()[0], eventInSector.getCategories()[1], eventInSector.getCategories()[2], eventInSector.getCategories()[3])
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/get-events-categories")
    @ApiOperation(value = "Получение списка категорий", response = EventDTO.class, responseContainer = "list")
    public List<CategoryForEventDTO> getAllCategories(){
        return eventService.findAllCategories().stream().map(CategoryForEventDTO::new).collect(Collectors.toList());
    }
}
