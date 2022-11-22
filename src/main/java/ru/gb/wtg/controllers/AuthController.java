package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import ru.gb.wtg.authorization.JwtTokenGenerate;
import ru.gb.wtg.dto.authorization.JwtRequestDTO;
import ru.gb.wtg.dto.authorization.JwtResponseDTO;
import ru.gb.wtg.dto.user.UserDTO;
import ru.gb.wtg.exceptions.WTGError;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.services.UserService;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenGenerate jwtTokenGenerate;
 //   private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequestDTO jwtRequestDTO){


//     try {
//         authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequestDTO.getLogin(), jwtRequestDTO.getPassword()));
//     }catch (BadCredentialsException e){
//         return new ResponseEntity<>(new WTGError(HttpStatus.UNAUTHORIZED.value(), "Incorrect username or password"), HttpStatus.UNAUTHORIZED);
//     }

        UserDTO userDTO = userService.loadUserByLoginAndPassword(jwtRequestDTO.getLogin(), jwtRequestDTO.getPassword());
        String token = jwtTokenGenerate.generateToken(userDTO);
        return ResponseEntity.ok(new JwtResponseDTO(token, userDTO.getFirstName(), userDTO.getLastName(), userDTO.getLogin(), userDTO.getEmail()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO){
        if(userService.existsUserByLogin(userDTO.getLogin())){
            return ResponseEntity.of(Optional.of(new WTGError(HttpStatus.BAD_REQUEST.value(), "Пользователь с таким login уже существует")));
        }
        if(userService.existsUserByEmail(userDTO.getEmail())){
            return ResponseEntity.of(Optional.of(new WTGError(HttpStatus.BAD_REQUEST.value(), "Пользователь с таким email уже существует")));
        }

        User user = userService.convertToUserFromDTO(userDTO);
        userService.saveUser(user);
        return ResponseEntity.ok(new UserDTO(user));
    }





}
