package ru.gb.wtg.Model.Routers;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "routes_locations")
public class Routes_locations {
    @Id
    int route_id;//REFERENCES routes(id)
    int middle_location_id; //REFERENCES middle_locations(id)
    int small_location_id; //REFERENCES small_locations(id)
}
