package ru.gb.wtg.dto.location;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.models.location.Location;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocationDTO {

    private Long id;
    private String title;
    private String description;
    private String fullDescription;
    private String address;
//    private LocalDateTime workTimeStart;
//    private LocalDateTime workTimeEnd;
//    private LocalDateTime workBreakStart;
//    private LocalDateTime workBreakEnd;
    private String linkImage;
    private String linkSite;
    private Double latitude;
    private Double longitude;

    public LocationDTO(Location location) {
        this.id = location.getId();
        this.title = location.getTitle();
        this.description = location.getDescription();
        this.fullDescription = location.getFullDescription();
        this.address = location.getAddress();
//        this.workTimeStart = location.getWorkTimeStart();
//        this.workTimeEnd = location.getWorkTimeEnd();
//        this.workBreakStart = location.getWorkBreakStart();
//        this.workBreakEnd = location.getWorkBreakEnd();
        this.linkImage = location.getLinkImage();
        this.linkSite = location.getLinkSite();
        this.latitude = location.getLatitude();
        this.longitude = location.getLongitude();
    }
}
