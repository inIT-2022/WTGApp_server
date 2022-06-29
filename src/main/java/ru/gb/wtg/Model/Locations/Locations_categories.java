package ru.gb.wtg.Model.Locations;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "locations_categories")
public class Locations_categories {
    @Id
    int id;
    String title;//REFERENCES big_locations(id)
    String description;//categories_for_locations(id)
}
