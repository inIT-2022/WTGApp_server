package ru.gb.wtg.repositories.event;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.event.CategoryForEvent;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.models.user.User;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    Optional<Event> findById(Long id);
    Optional<Event> findByTitle(String title);

    List<Event> findAllByLocation(Location location);
    List<Event> findAllByStartDatetime(LocalDateTime startDateTime);
    List<Event> findAllByPrice(Integer price);
    List<Event> findAllByPriceLessThan(Integer price);
    List<Event> findAllByUserCreated(User userCreated);
    List<Event> findAllByCategoryForEvents(CategoryForEvent categoryForEvent);
    List<Event> findAllByUsersEvent(User usersEvent);

}
