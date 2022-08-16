package ru.gb.wtg.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.route.RouteDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.route.Route;
import ru.gb.wtg.services.RouteService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/routes")
public class RouteController {

    private final RouteService routeService;

    @GetMapping()
    public List<RouteDTO> getAllRoutes(){
        return routeService.findAll()
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public RouteDTO getRouteById(@PathVariable Long id){
        return new RouteDTO(routeService.findById(id).orElseThrow(()-> new ResourceNotFoundException("route с данным id не найден")));
    }

    @GetMapping("/title")
    public RouteDTO getRouteByTitle(@RequestParam(name = "title") String title){
        return new RouteDTO(routeService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("route с данным title не найден")));
    }

    @GetMapping("/category_id/{id}")
    public List<RouteDTO> getAllRoutesByCategory(@PathVariable Long id){
        return routeService.findAllByRouteCategory(id)
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    public List<RouteDTO> getAllRoutesByCategory(@RequestParam(name = "title") String title){
        return routeService.findAllByRouteCategory(title)
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/createRoute")
    public void createRoute(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description,
        //    @RequestParam(name = "duration") LocalDateTime duration,
            @RequestParam(name = "distance") Double distance
    ) {
        Route route = new Route();
        route.setTitle(title);
        route.setDescription(description);
        route.setDistance(distance);

        routeService.saveRoute(route);
    }


    @DeleteMapping("/deleteRouteById/{id}")
    public void deleteRouteById(@PathVariable Long id){
        routeService.deleteRoute(id);
    }

}
