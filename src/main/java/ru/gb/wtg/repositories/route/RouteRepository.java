package ru.gb.wtg.repositories.route;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.models.route.Route;
import ru.gb.wtg.models.route.RouteCategory;
import ru.gb.wtg.models.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route,Long> {

    Optional<Route> findById(Long id);
    Optional<Route> findByTitle(String title);

    List<Route> findAllByRouteCategory(RouteCategory routeCategory);
    List<Route> findAllByUserCreated(User userCreated);
    List<Route> findAllByLocations(Location location);
    List<Route> findAllByUsers(User user);



}
