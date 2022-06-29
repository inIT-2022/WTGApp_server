package ru.gb.wtg.Model.Locations;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@Data
@Table(name = "location_info")
public class Location_info {
    @Id
    int id;//PRIMARY KEY
    String title;//not null unique
    String description;
    String full_description;
    String adress;
    LocalDateTime work_time_start;
    LocalDateTime work_time_end;
    String link_image;
    float latitude;
    float longitude;
    String link_site;
}
