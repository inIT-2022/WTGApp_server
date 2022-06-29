package ru.gb.wtg.Model.Event;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "event_categories")
public class Event_categories {
    @Id
    int event_id;//REFERENCES events(id)
    int category_id;//REFERENCES categories_for_events(id)


}
