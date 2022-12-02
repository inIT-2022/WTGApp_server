package ru.gb.wtg.repositories.event;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    @Query("SELECT e FROM Event e   where e.startDatetime >= :dateStart")
    List<Event> findAllByDateLater(@Param("dateStart") LocalDateTime dateStart);

    @Query("SELECT e FROM Event e   where e.startDatetime between :dateStart and :dateEnd")
    List<Event> findAllByDateBetween(@Param("dateStart") LocalDateTime dateStart,
                                     @Param("dateEnd") LocalDateTime dateEnd);

    @Query(value = "SELECT * FROM events  where title ilike %?1%", nativeQuery = true)
    List<Event> findAllByManualTitle(@Param("manualTitle") String manualTitle);

}
