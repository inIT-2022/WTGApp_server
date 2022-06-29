package ru.gb.wtg.Model.Users;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "user_routes_info")
public class User_routes_info {
    @Id
    int id;
    int user_routes_id;//REFERENCES user_events(id)
    boolean favorites; //default false
    boolean visited;//default false
}
