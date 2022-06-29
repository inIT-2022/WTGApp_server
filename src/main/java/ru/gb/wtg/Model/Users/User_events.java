package ru.gb.wtg.Model.Users;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "user_events")
public class User_events {
    @Id
    int id; //PRIMARY KEY
    int user_id;//REFERENCES users(id)
    int event_id;//REFERENCES events(id)
}
