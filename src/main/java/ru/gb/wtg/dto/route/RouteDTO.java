package ru.gb.wtg.dto.route;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.models.route.Route;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RouteDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime duration;
    private Double distance;
    private Long routeCategoryId;
    private Long userCreatedId;

    public RouteDTO(Route route) {
        this.id = route.getId();
        this.title = route.getTitle();
        this.description = route.getDescription();
        this.duration = route.getDuration();
        this.distance = route.getDistance();
    }
}
