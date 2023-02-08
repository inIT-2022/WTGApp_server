package ru.gb.wtg.dto.event;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@Data
@NoArgsConstructor
public class EventInSector {

    private String address;
    private int radius;
    private int[] categories;


}
