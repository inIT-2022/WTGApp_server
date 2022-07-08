package ru.gb.wtg.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.event.CategoryForEvent;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.repositories.event.CategoryForEventRepository;
import ru.gb.wtg.repositories.event.EventRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final CategoryForEventRepository categoryForEventRepository;

    private final LocationService locationService;
    private final UserService userService;

    public List<Event> findAll(){
        return eventRepository.findAll();
    }

    public Optional<Event> findById(Long id){
        return eventRepository.findById(id);
    }

    public Optional<Event> findByTitle(String title){
        return eventRepository.findByTitle(title);
    }

    public List<Event> findAllByLocation(Location location){
        return eventRepository.findAllByLocation(location);
    }

    public List<Event> findAllByLocation(Long id){
        Location location = locationService.findById(id).orElseThrow(()-> new ResourceNotFoundException("локация с данным id не найдена"));
        return eventRepository.findAllByLocation(location);
    }

    public List<Event> findAllByLocation(String title){
        Location location = locationService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("локация с данным title не найдена"));
        return eventRepository.findAllByLocation(location);
    }

    public List<Event> findAllByStartDatetime(LocalDateTime startDateTime){
        return eventRepository.findAllByStartDatetime(startDateTime);
    }

    public List<Event> findAllByPrice(Integer price){
        return eventRepository.findAllByPrice(price);
    }

    public List<Event> findAllByPriceLessThan(Integer price){
        return eventRepository.findAllByPriceLessThan(price);
    }

    public List<Event> findAllByUserCreated(User userCreated){
        return eventRepository.findAllByUserCreated(userCreated);
    }

    public List<Event> findAllByUserCreated(Long id){
        User userCreated = userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("user с данным id не найден"));
        return eventRepository.findAllByUserCreated(userCreated);
    }

    public List<Event> findAllByUserCreated(String login){
        User userCreated = userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("user с данным login не найден"));
        return eventRepository.findAllByUserCreated(userCreated);
    }

    public List<Event> findAllByCategoryForEvents(CategoryForEvent categoryForEvent){
        return eventRepository.findAllByCategoryForEvents(categoryForEvent);
    }

    public List<Event> findAllByCategoryForEvents(Long id){
        CategoryForEvent categoryForEvent = categoryForEventRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("categoryForEvent с данным id не найдена"));
        return eventRepository.findAllByCategoryForEvents(categoryForEvent);
    }

    public List<Event> findAllByCategoryForEvents(String title){
        CategoryForEvent categoryForEvent = categoryForEventRepository.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("categoryForEvent с данным title не найдена"));
        return eventRepository.findAllByCategoryForEvents(categoryForEvent);
    }

    public List<Event> findAllByUsersEvent(User usersEvent){
        return eventRepository.findAllByUsersEvent(usersEvent);
    }

    public List<Event> findAllByUsersEvent(Long id){
        User usersEvent = userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("user с данным id не найден"));
        return eventRepository.findAllByUsersEvent(usersEvent);
    }

    public List<Event> findAllByUsersEvent(String login){
        User usersEvent = userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("user с данным login не найден"));
        return eventRepository.findAllByUsersEvent(usersEvent);
    }

    public void deleteEvent(Long id){
        eventRepository.deleteById(id);
    }

    public Event saveEvent(Event event){
        return eventRepository.save(event);
    }


}
