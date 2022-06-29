package ru.gb.wtg.Model.Routers;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "categories_for_routes")
public class Categories_for_routes {
    @Id
    int id;
    String title;//not null unique
    String description;

}
