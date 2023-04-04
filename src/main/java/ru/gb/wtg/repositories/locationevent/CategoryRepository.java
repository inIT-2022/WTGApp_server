package ru.gb.wtg.repositories.locationevent;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.locationevent.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {




}
