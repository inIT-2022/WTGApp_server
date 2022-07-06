package ru.gb.wtg.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.user.CategoryForUser;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.models.user.UserRole;
import ru.gb.wtg.repositories.user.UserRepository;
import ru.gb.wtg.repositories.user.UserRoleRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;


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
        // user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    //todo переделать с удаления в перевод влажка isActive - false (или сделать доп метод)
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }




}
