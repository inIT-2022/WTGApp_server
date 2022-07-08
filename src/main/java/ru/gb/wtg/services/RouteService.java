package ru.gb.wtg.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.models.route.Route;
import ru.gb.wtg.models.route.RouteCategory;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.repositories.route.RouteCategoryRepository;
import ru.gb.wtg.repositories.route.RouteRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;
    private final RouteCategoryRepository routeCategoryRepository;

    private final UserService userService;
    private final LocationService locationService;


    public List<Route> findAll(){
        return routeRepository.findAll();
    }

    public Optional<Route> findById(Long id){
        return routeRepository.findById(id);
    }

    public Optional<Route> findByTitle(String title){
        return routeRepository.findByTitle(title);
    }

    public List<Route> findAllByRouteCategory(RouteCategory routeCategory){
        return routeRepository.findAllByRouteCategory(routeCategory);
    }

    public List<Route> findAllByRouteCategory(Long id){
        RouteCategory routeCategory = routeCategoryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("routeCategory с данным id не найден"));
        return routeRepository.findAllByRouteCategory(routeCategory);
    }

    public List<Route> findAllByRouteCategory(String title){
        RouteCategory routeCategory = routeCategoryRepository.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("routeCategory с данным title не найден"));
        return routeRepository.findAllByRouteCategory(routeCategory);
    }

    public List<Route> findAllByUserCreated(User userCreated){
        return routeRepository.findAllByUserCreated(userCreated);
    }

    public List<Route> findAllByUserCreated(Long id){
        User userCreated = userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("user с данным id не найден"));
        return routeRepository.findAllByUserCreated(userCreated);
    }

    public List<Route> findAllByUserCreated(String login){
        User userCreated = userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("user с данным login не найден"));
        return routeRepository.findAllByUserCreated(userCreated);
    }

    public List<Route> findAllByLocations(Location location){
        return routeRepository.findAllByLocations(location);
    }

    public List<Route> findAllByLocations(Long id){
        Location location = locationService.findById(id).orElseThrow(()-> new ResourceNotFoundException("location с данным id не найдена"));
        return routeRepository.findAllByLocations(location);
    }

    public List<Route> findAllByLocations(String title){
        Location location = locationService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("location с данным title не найдена"));
        return routeRepository.findAllByLocations(location);
    }

    public List<Route> findAllByUsers(User user){
        return routeRepository.findAllByUsers(user);
    }

    public List<Route> findAllByUsers(Long id){
        User user = userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("user с данным id не найден"));
        return routeRepository.findAllByUsers(user);
    }

    public List<Route> findAllByUsers(String login){
        User user = userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("user с данным login не найден"));
        return routeRepository.findAllByUsers(user);
    }

    public void deleteRoute(Long id){
        routeRepository.deleteById(id);
    }

    public Route saveRoute(Route route){
        return routeRepository.save(route);
    }




}
