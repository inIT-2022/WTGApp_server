package ru.gb.wtg.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.event.EventDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.services.EventService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/events")
public class EventController {

    private final EventService eventService;


    @GetMapping()
    public List<EventDTO> getAllEvents(){
        return eventService.findAll()
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }
// todo тестовый метод (удалить в дальнейшем)
    @GetMapping("/eventmodels")
    public List<Event> getAllEventModels(){


        return eventService.findAll();
    }

    // todo тестовый метод (удалить в дальнейшем)
    @GetMapping("/model/{id}")
    public Event getEventByIdModel(@PathVariable Long id){
        return eventService.findById(id).get();
    }



    @GetMapping("/{id}")
    public EventDTO getEventById(@PathVariable Long id){
        return new EventDTO(eventService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Event с данным id не найден")));
    }

    @GetMapping("/title")
    public EventDTO getEventByTitle(@RequestParam(name = "title") String title){
        return new EventDTO(eventService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Event с данным title не найден")));
    }

    @GetMapping("/category/{id}")
    public List<EventDTO> getAllEventsByCategory(@PathVariable Long id){
        return eventService.findAllByCategoryForEvents(id)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    public List<EventDTO> getAllEventsByCategory(@RequestParam(name = "title") String title){
        return eventService.findAllByCategoryForEvents(title)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created/{id}")
    public List<EventDTO> getAllEventsByUserCreated(@PathVariable Long id){
        return eventService.findAllByUserCreated(id)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created_login")
    public List<EventDTO> getAllEventsByUserCreated(@RequestParam(name = "login") String login){
        return eventService.findAllByUserCreated(login)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }






}
