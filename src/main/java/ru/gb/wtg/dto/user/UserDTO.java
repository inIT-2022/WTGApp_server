package ru.gb.wtg.dto.user;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ru.gb.wtg.models.user.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class UserDTO implements UserDetails {

    private Long id;
    private String login;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private LocalDate birthdayDate;
  //  private Long userRoleId;
    private String userRoleString;
 //   private List<String> userRoleList;


    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.birthdayDate = user.getBirthdayDate();
        //реализация для одной роли, в дальнейшем, может быть придем к нескольким
//        this.userRoleList = new ArrayList<>();
//        userRoleList.add(new UserRoleDTO(user.getUserRole()));
//        this.userRoleList = new ArrayList<>();
  //      userRoleList.add(user.getUserRole().getTitle());
        this.userRoleString = user.getUserRole().getTitle();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        //return userRoleList.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        List<UserRoleDTO> userRoleDTOS = new ArrayList<>();
        userRoleDTOS.add(new UserRoleDTO(userRoleString));
        return userRoleDTOS;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
