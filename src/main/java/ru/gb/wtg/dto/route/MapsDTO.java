package ru.gb.wtg.dto.route;


import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.dto.location.LocationDTO;

import java.util.List;

@Data
@NoArgsConstructor
public class MapsDTO {
    private Double longitude;
    private Double latitude;
    private List<LocationDTO> locationDTOList;

    public MapsDTO(Double longitude, Double latitude, List<LocationDTO> locationDTOList) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.locationDTOList = locationDTOList;
    }
}
