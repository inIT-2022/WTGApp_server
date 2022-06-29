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
@Table(name = "big_locations")
public class Big_locations {
    @Id
    int id;//PRIMARY KEY
    String title;// not null unique
    String description;
    LocalDateTime created_at; //default current_timestamp
    LocalDateTime updated_at;

}
