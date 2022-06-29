package ru.gb.wtg.Model.Locations;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "categories_for_locations")
public class Categories_for_locations {
    @Id
    int id;//PRIMARY KEY
    String title;//not null unique
    String descriptionl;
}
