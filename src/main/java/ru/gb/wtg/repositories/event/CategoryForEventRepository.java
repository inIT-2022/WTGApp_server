package ru.gb.wtg.repositories.event;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.event.CategoryForEvent;

import java.util.Optional;

@Repository
public interface CategoryForEventRepository extends JpaRepository<CategoryForEvent,Long> {

    Optional<CategoryForEvent> findById(Long id);
    Optional<CategoryForEvent> findByTitle(String title);

}
