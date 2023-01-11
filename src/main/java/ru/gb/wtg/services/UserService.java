package ru.gb.wtg.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.gb.wtg.dto.user.UserDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.user.CategoryForUser;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.models.user.UserRole;
import ru.gb.wtg.repositories.user.UserRepository;
import ru.gb.wtg.repositories.user.UserRoleRepository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public List<User> findAll(){
        return userRepository.findAll();
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    public Optional<User> findByLogin(String login){
        return userRepository.findByLogin(login);
    }

    public Optional<User> findByFirstNameAndLastName(String firstName, String lastName){
        return userRepository.findByFirstNameAndLastName(firstName,lastName);
    }

    public Optional<User> findByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public List<User> findAllByCategoryForUsers(CategoryForUser categoryForUser){
        return userRepository.findAllByCategoryForUsers(categoryForUser);
    }

    public List<User> findAllByUserRole(UserRole userRole){
        return userRepository.findAllByUserRole(userRole);
    }

    public List<User> findAllByUserRole(Long id){
        UserRole userRole = userRoleRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным id не найден"));
        return userRepository.findAllByUserRole(userRole);
    }

    public List<User> findAllByUserRole(String nameRole){
        UserRole userRole = userRoleRepository.findByTitle(nameRole).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным именем роли не найден"));
        return userRepository.findAllByUserRole(userRole);
    }

    //todo уйдет в авторизацию
    public User saveUser(User user){
         user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.saveAndFlush(user);
    }

    //todo переделать с удаления в перевод влажка isActive - false (или сделать доп метод)
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }


    //
    //реализация этапа аутентификации и авторизации по ЛОГИНУ
    @Override
    public UserDTO loadUserByUsername(String username) throws UsernameNotFoundException {
        return new UserDTO(findByLogin(username).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным login роли не найден")));
    }

    public UserDTO loadUserByLoginAndPassword(String username, String password) throws UsernameNotFoundException {
        User user = findByLogin(username).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным login роли не найден"));
        System.out.println("роли юзера из сервиса = " + user.getUserRole().getTitle());
        if(user!= null){
            if(passwordEncoder.matches(password, user.getPassword())){
                return new UserDTO(user);
            }
        }
        return null;
    }

    public User convertToUserFromDTO(UserDTO userDTO){
        User user = new User();
        user.setId(userDTO.getId());
        user.setLogin(userDTO.getLogin());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setBirthdayDate(userDTO.getBirthdayDate());
        user.setPassword(userDTO.getPassword());
        user.setUserRole( userRoleRepository.findByTitle(userDTO.getUserRoleString()).orElseThrow());
        return user;
    }

    public boolean existsUserByLogin(String login){
        return userRepository.existsUserByLogin(login);
    }

    public boolean existsUserByEmail(String email){
        return userRepository.existsUserByEmail(email);
    }




}
