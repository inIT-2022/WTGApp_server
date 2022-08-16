package ru.gb.wtg.repositories.offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.offer.OfferCategory;

import java.util.Optional;

@Repository
public interface OfferCategoryRepository extends JpaRepository<OfferCategory,Long> {

    Optional<OfferCategory> findById(Long id);
    Optional<OfferCategory> findByTitle(String title);

}
