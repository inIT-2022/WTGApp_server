package ru.gb.wtg.repositories.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.user.CategoryForUser;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.models.user.UserRole;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long id);
    Optional<User> findByLogin(String login);
    Optional<User> findByFirstNameAndLastName(String firstName, String lastName);
    Optional<User> findByEmail(String email);


    List<User> findAllByCategoryForUsers(CategoryForUser categoryForUser);
    List<User> findAllByUserRole(UserRole userRole);



}
