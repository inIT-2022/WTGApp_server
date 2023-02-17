package ru.gb.wtg.authorization;

import io.jsonwebtoken.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import ru.gb.wtg.dto.user.UserDTO;
import ru.gb.wtg.dto.user.UserRoleDTO;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtTokenGenerate {

    private final String secret = "3b2648762a13d3f6be076edb7f70fa391e83049e1eaef30448eecc4effd31e74f7eaa092196868d677986ab5f12afd579a894d0daa0716da1d72c443a539976e";

    public String generateToken(UserDTO userDTO){
        LocalDateTime issuedDate = LocalDateTime.now();
        LocalDateTime expiredDate = issuedDate.plusDays(15);

        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userDTO.getUserRoleString());
        claims.put("id", userDTO.getId());
        claims.put("sub", userDTO.getUsername());

        System.out.println("generate token =" + userDTO.getUserRoleString());

        String token = Jwts.builder()
                .setClaims(claims)
                .setExpiration(java.sql.Timestamp.valueOf(expiredDate))
                .signWith(SignatureAlgorithm.HS256,secret)
                .compact();

        return "Bearer " + token;
    }


    public UserDTO parseToken (String token) throws ExpiredJwtException {
        Jws<Claims> claimsJws = Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token);

        UserDTO userDTO = new UserDTO();
        userDTO.setId(claimsJws.getBody().get("id",Long.class));
        userDTO.setLogin(claimsJws.getBody().get("sub",String.class));
        userDTO.setUserRoleString(claimsJws.getBody().get("role", String.class));

        System.out.println("Роли с parse token =" + userDTO.getUserRoleString());
        return userDTO;
    }




}
