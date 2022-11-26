package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.user.UserDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.services.UserService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

//@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDTO> getAllUsers(){
        return userService.findAll()
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/role_id/{id}")
    public List<UserDTO> getAllUsersByRoleId(@PathVariable Long id){
        return userService.findAllByUserRole(id)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/role_title")
    public List<UserDTO> getAllUsersByRoleTitle(@RequestParam String title){
        return userService.findAllByUserRole(title)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id){
        return new UserDTO(userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным id не найден")));
    }

    @GetMapping("/login/{login}")
    public UserDTO getUserByLogin(@PathVariable String login){
        return new UserDTO(userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным login не найден")));
    }

    @PostMapping("/createUser")
    public void createUser(
            @RequestParam(name = "login")String login,
            @RequestParam(name = "password")String password,
            @RequestParam(name = "firstName")String fistName,
            @RequestParam(name = "lastName")String lastName,
//            @RequestParam(name = "birthday_date") LocalDate birthday_date,
            @RequestParam(name = "email")String email
            ){

        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        user.setFirstName(fistName);
        user.setLastName(lastName);
        user.setEmail(email);
//        user.setBirthdayDate(birthday_date);
        userService.saveUser(user);
    }

    @DeleteMapping("/deleteUserById/{id}")
    public void deleteUserById(@PathVariable Long id){
        userService.deleteUser(id);
    }




}
