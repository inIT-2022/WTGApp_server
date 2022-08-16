package ru.gb.wtg.repositories.route;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.route.RouteCategory;

import java.util.Optional;

@Repository
public interface RouteCategoryRepository extends JpaRepository<RouteCategory,Long> {

    Optional<RouteCategory>findById(Long id);
    Optional<RouteCategory>findByTitle(String title);

}
