package ru.gb.wtg.repositories.user;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.user.UserRole;

import java.util.Optional;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, Long> {

    Optional<UserRole> findById(Long id);
    Optional<UserRole> findByTitle(String title);


}
