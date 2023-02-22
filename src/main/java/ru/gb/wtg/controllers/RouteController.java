package ru.gb.wtg.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(tags = "Маршруты")
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
    @ApiOperation(value = "Получение маршрута по id", response = RouteDTO.class)
    public RouteDTO getRouteById(@PathVariable Long id){
        return new RouteDTO(routeService.findById(id).orElseThrow(()-> new ResourceNotFoundException("route с данным id не найден")));
    }

    @GetMapping("/title")
    @ApiOperation(value = "Получение маршрута по наименованию", response = RouteDTO.class)
    public RouteDTO getRouteByTitle(@RequestParam(name = "title") String title){
        return new RouteDTO(routeService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("route с данным title не найден")));
    }

    @GetMapping("/category_id/{id}")
    @ApiOperation(value = "Получение списка маршрутов по id категории", response = RouteDTO.class, responseContainer = "list")
    public List<RouteDTO> getAllRoutesByCategory(@PathVariable Long id){
        return routeService.findAllByRouteCategory(id)
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    @ApiOperation(value = "Получение списка маршрутов по наименовании категории", response = RouteDTO.class, responseContainer = "list")
    public List<RouteDTO> getAllRoutesByCategory(@RequestParam(name = "title") String title){
        return routeService.findAllByRouteCategory(title)
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/createRoute")
    @ApiOperation(value = "Создание маршрута")
    public void createRoute(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description,
            @RequestParam(name = "distance") Double distance ) {
        Route route = new Route();
        route.setTitle(title);
        route.setDescription(description);
        route.setDistance(distance);

        routeService.saveRoute(route);
    }

    @DeleteMapping("/deleteRouteById/{id}")
    @ApiOperation(value = "Удаление маршрута")
    public void deleteRouteById(@PathVariable Long id){
        routeService.deleteRoute(id);
    }

}
