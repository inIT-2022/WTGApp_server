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
@Table(name = "small_locations")
public class Small_locations {
    @Id
    int id;//PRIMARY KEY
    LocalDateTime created_at;//efault current_timestamp
    LocalDateTime updated_at;
    int big_location_id;//REFERENCES big_locations(id),
    int middle_location_id;//middle_locations(id)
    int location_info_id;//location_info(id)
}
