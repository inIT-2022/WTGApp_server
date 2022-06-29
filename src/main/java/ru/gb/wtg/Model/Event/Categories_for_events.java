package ru.gb.wtg.Model.Event;


import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "categories_for_events")
public class Categories_for_events {
    @Id
    int id;//PRIMARY KEY
    String title;// not null uniq
    String description;
}
