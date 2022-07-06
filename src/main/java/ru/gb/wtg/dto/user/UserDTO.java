package ru.gb.wtg.dto.user;


import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.models.user.UserRole;

import javax.persistence.Column;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String login;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate birthdayDate;
    private Long userRole;

    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.birthdayDate = user.getBirthdayDate();
    }
}
