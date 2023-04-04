package ru.gb.wtg.repositories.location;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

//    List<Location> findAllByWorkTimeEnd(LocalDateTime workTimeEnd);
//    List<Location> findAllByWorkTimeStart(LocalDateTime workTimeStart);
//    List<Location> findAllByWorkBreakEnd(LocalDateTime workBreakEnd);
//    List<Location> findAllByWorkBreakStart(LocalDateTime workBreakStart);

    List<Location> findAllByAddress(String address);
    List<Location> findAllByLatitudeAndLongitude(Double latitude, Double longitude);

    List<Location> findAllByCategoryForLocations(CategoryForLocation categoryForLocation);

    @Query(value = "select * from locations l where l.link_image is not null and l.link_image !=''", nativeQuery = true)
    Page<Location> findAllWithImage(Pageable pageable);

    @Query(value = "SELECT * FROM locations  where title ilike %?1%", nativeQuery = true)
    List<Location> findAllByManualTitle(@Param("manualTitle") String manualTitle);

    @Query(value = "SELECT * FROM locations  where title ilike %?1% or description ilike %?1%", nativeQuery = true)
    Page<Location> findAllByManualTitleAndDescription(@Param("manualTitle") String manualTitle, Pageable pageable);

    //выборка локаций попадаюхих в диапазоны долготы и широты
    List<Location> findAllByLatitudeGreaterThanAndLatitudeLessThanAndLongitudeGreaterThanAndLongitudeLessThan(
            Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax
    );

    //выборка локаций с событиями попадаюхих в диапазоны долготы и широты
    @Query("select l from Location l " +
            "right join Event e " +
            "on l.id = e.location " +
            "where l.latitude >= :latitudeMin and l.latitude <= :latitudeMax " +
            "and l.longitude >= :longitudeMin and l.longitude <= :longitudeMax")
    List<Location> findAllByLatitudeWithEvents(
            Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax
    );

    //выборка локаций по категориям в заданном секторе
    // todo не прошел..
/*    @Query("select l from Location l " +
            "inner join CategoryForLocation cfl on l.categoryForLocations = cfl.locations \n" +
            "where (l.latitude >= :latitudeMin and l.latitude <= :latitudeMax) " +
            "and (l.longitude >= :longitudeMin and l.longitude <= :longitudeMax) " +
            "and  (cfl.id in (:cat1,:cat2,:cat3,:cat4))")
    List<Location> findAllByLocationsCategoriesAndSector(
            Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax,
            long cat1, long cat2, long cat3, long cat4
    );*/

    //выборка локаций по категориям в заданном секторе
//    @Query(value = "select * from locations l " +
//            "right join locations_categories lc on l.id = lc.location_id " +
//            "left join categories_for_locations cfl on lc.category_id = cfl.id \n" +
//            "where (l.latitude >= :latitudeMin and l.latitude <= :latitudeMax) " +
//            "and (l.longitude >= :longitudeMin and l.longitude <= :longitudeMax) " +
//            "and  cfl.id in (:cat1,:cat2,:cat3,:cat4)",nativeQuery = true)
//    List<Location> findAllByLocationsCategoriesAndSector(
//            Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax,
//            long cat1, long cat2, long cat3, long cat4
//    );


    @Query(value = "select * from locations l " +
            "right join locations_events_categories lec on l.id = lec.location_id " +
            "where (l.latitude >= :latitudeMin and l.latitude <= :latitudeMax) " +
            "and (l.longitude >= :longitudeMin and l.longitude <= :longitudeMax) " +
            "and  lec.category_id in (:cat1,:cat2,:cat3,:cat4)",nativeQuery = true)
    List<Location> findAllByLocationsCategoriesAndSector(
            Double latitudeMin, Double latitudeMax, Double longitudeMin, Double longitudeMax,
            long cat1, long cat2, long cat3, long cat4
    );



}
