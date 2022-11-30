package ru.gb.wtg.repositories.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.location.CategoryForLocation;
import ru.gb.wtg.models.location.Location;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    Optional<Location> findById(Long id);
    Optional<Location> findByTitle(String title);

    List<Location> findAllByWorkTimeEnd(LocalDateTime workTimeEnd);
    List<Location> findAllByWorkTimeStart(LocalDateTime workTimeStart);
    List<Location> findAllByWorkBreakEnd(LocalDateTime workBreakEnd);
    List<Location> findAllByWorkBreakStart(LocalDateTime workBreakStart);

    List<Location> findAllByAddress(String address);
    List<Location> findAllByLatitudeAndLongitude(Double latitude, Double longitude);

    List<Location> findAllByCategoryForLocations(CategoryForLocation categoryForLocation);

    @Query("SELECT l FROM Location l   where l.title like %:manualTitle%")
    List<Location> findAllByManualTitle(@Param("manualTitle") String manualTitle);


}
