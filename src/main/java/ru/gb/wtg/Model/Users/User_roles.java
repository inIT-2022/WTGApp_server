package ru.gb.wtg.Model.Users;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
public class User_roles {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;
    private String title;

}
