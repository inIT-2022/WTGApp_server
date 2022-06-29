package ru.gb.wtg.Model.Users;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@NoArgsConstructor
@Entity
@Data
@Table(name = "User_routes")
public class User_routes {
    @Id
    int id;
    int user_id;//REFERENCES users(id)
    int route_id;//REFERENCES routes(id)
}
