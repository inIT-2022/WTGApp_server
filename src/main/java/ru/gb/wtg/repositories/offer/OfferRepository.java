package ru.gb.wtg.repositories.offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.models.offer.Offer;
import ru.gb.wtg.models.offer.OfferCategory;
import ru.gb.wtg.models.user.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface OfferRepository extends JpaRepository<Offer,Long> {

    Optional<Offer> findById(Long id);
    Optional<Offer> findByTitle(String title);

    List<Offer> findAllByOfferCategory(OfferCategory offerCategory);
    List<Offer> findAllByUserCreated(User userCreated);
    List<Offer> findAllByLocation(Location location);
    List<Offer> findAllByUserReceived(User userReceived);
    List<Offer> findAllByEvent(Event event);

}
