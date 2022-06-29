package ru.gb.wtg.Model.Users;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@Data
@Table(name = "users")
public class Users {
    @Id
    int id;// bigserial PRIMARY KEY,
    String login;//not null unique
    String password;//not null
    String email;// unique
    String first_name;// not null,
    String last_name;//  not null,
    LocalDateTime birthday_date;
    LocalDateTime created_at;// default current_timestamp,
    LocalDateTime updated_at;
    boolean is_active;
    int role_id;// REFERENCES user_roles(id)

}
