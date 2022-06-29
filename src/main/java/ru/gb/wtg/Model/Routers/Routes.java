package ru.gb.wtg.Model.Routers;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigInteger;
import java.time.LocalDateTime;

@NoArgsConstructor
@Entity
@Data
@Table(name = "routes")
public class Routes {
    @Id
    int id;
    String title;//not null unique
    String description;
    LocalDateTime duration;//Think about type
    BigInteger distanse;
    int routes_categories_id;//REFERENCES categories_for_routes(id)
    int user_created_id;//REFERENCES users(id)
    LocalDateTime created_at;//default current_timestamp
    LocalDateTime updated_at;
}
