package ru.gb.wtg.controllers;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.user.UserDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.services.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
@Api(tags="Пользователи")
public class UserController {

    private final UserService userService;
    @GetMapping
    @ApiOperation(value = "Получение списка всех пользователей", response = UserDTO.class, responseContainer = "list")
    public List<UserDTO> getAllUsers(){
        return userService.findAll()
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/role_id/{id}")
    @ApiOperation(value = "Получение списка пользователей по id роли", response = UserDTO.class, responseContainer = "list")
    public List<UserDTO> getAllUsersByRoleId(@PathVariable Long id){
        return userService.findAllByUserRole(id)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/role_title")
    @ApiOperation(value = "Получение списка пользователей по наименованию роли", response = UserDTO.class, responseContainer = "list")
    public List<UserDTO> getAllUsersByRoleTitle(@RequestParam String title){
        return userService.findAllByUserRole(title)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "Получение пользователя по id", response = UserDTO.class)
    public UserDTO getUserById(@PathVariable Long id){
        return new UserDTO(userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным id не найден")));
    }

    @GetMapping("/login/{login}")
    @ApiOperation(value = "Получение пользователя по логину", response = UserDTO.class)
    public UserDTO getUserByLogin(@PathVariable String login){
        return new UserDTO(userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("Пользователь с данным login не найден")));
    }

    @PostMapping("/createUser")
    @ApiOperation(value = "Создание пользователя")
    public void createUser(
            @RequestParam(name = "login")String login,
            @RequestParam(name = "password")String password,
            @RequestParam(name = "firstName")String fistName,
            @RequestParam(name = "lastName")String lastName,
            @RequestParam(name = "email")String email
    ){

        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        user.setFirstName(fistName);
        user.setLastName(lastName);
        user.setEmail(email);
        userService.saveUser(user);
    }

    @DeleteMapping("/deleteUserById/{id}")
    @ApiOperation(value = "Удаление пользователя по id")
    public void deleteUserById(@PathVariable Long id){
        userService.deleteUser(id);
    }

}
