package ru.gb.wtg.repositories.location;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.location.CategoryForLocation;

import java.util.Optional;

@Repository
public interface CategoryForLocationRepository extends JpaRepository<CategoryForLocation, Long> {

    Optional<CategoryForLocation> findById(Long id);
    Optional<CategoryForLocation> findByTitle(String title);

}
