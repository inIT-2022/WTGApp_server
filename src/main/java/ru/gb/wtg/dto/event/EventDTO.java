package ru.gb.wtg.dto.event;


import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.dto.location.LocationDTO;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.models.location.Location;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EventDTO {

    private Long id;
    private String title;
    private String description;
    private LocalDateTime startDatetime;
    private LocalDateTime finishDatetime;
    private String linkEventSite;
    private String linkImage;
    private Integer price;
    //private Long location;
    private LocationDTO location;
    private Boolean isActive;
    private Long userCreatedId;

    public EventDTO(Event event) {
        this.id = event.getId();
        this.title = event.getTitle();
        this.description = event.getDescription();
        this.startDatetime = event.getStartDatetime();
        this.finishDatetime = event.getFinishDatetime();
        this.linkEventSite = event.getLinkEventSite();
        this.linkImage = event.getLinkImage();
        this.price = event.getPrice();
        //this.location = event.getLocation().getId();
        this.location = new LocationDTO(event.getLocation());
        this.isActive = event.getIsActive();
    }
}
