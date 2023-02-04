package ru.gb.wtg.dto.location;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LocationInSector {

    private String address;
    private int radius;
    private int[] categories;

}
