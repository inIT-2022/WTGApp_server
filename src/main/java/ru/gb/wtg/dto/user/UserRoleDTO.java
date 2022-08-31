package ru.gb.wtg.dto.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import ru.gb.wtg.models.user.UserRole;


@Data
@NoArgsConstructor
public class UserRoleDTO implements GrantedAuthority {

    private Long id;
    private String title;

    public UserRoleDTO(UserRole userRole) {
        this.id = userRole.getId();
        this.title = userRole.getTitle();
    }

    public UserRoleDTO(String role) {
        this.title = role;
    }

    @Override
    public String getAuthority() {
        return title;
    }
}