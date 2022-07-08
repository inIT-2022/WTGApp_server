package ru.gb.wtg.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.models.location.Location;
import ru.gb.wtg.models.offer.Offer;
import ru.gb.wtg.models.offer.OfferCategory;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.repositories.offer.OfferCategoryRepository;
import ru.gb.wtg.repositories.offer.OfferRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;
    private final OfferCategoryRepository offerCategoryRepository;

    private final LocationService locationService;
    private final UserService userService;
    private final EventService eventService;

     public List<Offer> findAll(){
        return offerRepository.findAll();
    }

    public Optional<Offer> findById(Long id){
        return offerRepository.findById(id);
    }

    public Optional<Offer> findByTitle(String title){
        return offerRepository.findByTitle(title);
    }

    public List<Offer> findAllByLocation(Location location){
        return offerRepository.findAllByLocation(location);
    }

    public List<Offer> findAllByLocation(Long id){
        Location location = locationService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Offer с данным id не найден"));
        return offerRepository.findAllByLocation(location);
    }

    public List<Offer> findAllByLocation(String title){
        Location location = locationService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Offer с данным title не найден"));
        return offerRepository.findAllByLocation(location);
    }

    public List<Offer> findAllByUserCreated(User userCreated){
        return offerRepository.findAllByUserCreated(userCreated);
    }

    public List<Offer> findAllByUserCreated(Long id){
        User userCreated = userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("user с данным id не найден"));
        return offerRepository.findAllByUserCreated(userCreated);
    }

    public List<Offer> findAllByUserCreated(String login){
        User userCreated = userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("user с данным login не найден"));
        return offerRepository.findAllByUserCreated(userCreated);
    }


    public List<Offer> findAllByOfferCategory(OfferCategory offerCategory){
        return offerRepository.findAllByOfferCategory(offerCategory);
    }

    public List<Offer> findAllByOfferCategory(Long id){
        OfferCategory offerCategory = offerCategoryRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("OfferCategory с данным id не найдена"));
        return offerRepository.findAllByOfferCategory(offerCategory);
    }

    public List<Offer> findAllByOfferCategory(String title){
        OfferCategory offerCategory = offerCategoryRepository.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("OfferCategory с данным title не найдена"));
        return offerRepository.findAllByOfferCategory(offerCategory);
    }

    public List<Offer> findAllByUserReceived(User userReceived){
        return offerRepository.findAllByUserReceived(userReceived);
    }

    public List<Offer> findAllByUserReceived(Long id){
        User userReceived = userService.findById(id).orElseThrow(()-> new ResourceNotFoundException("user с данным id не найден"));
        return offerRepository.findAllByUserReceived(userReceived);
    }

    public List<Offer> findAllByUserReceived(String login){
        User userReceived = userService.findByLogin(login).orElseThrow(()-> new ResourceNotFoundException("user с данным login не найден"));
        return offerRepository.findAllByUserReceived(userReceived);
    }

    public List<Offer> findAllByEvent(Event event){
        return offerRepository.findAllByEvent(event);
    }

    public List<Offer> findAllByEvent(Long id){
        Event event= eventService.findById(id).orElseThrow(()-> new ResourceNotFoundException("event с данным id не найден"));
        return offerRepository.findAllByEvent(event);
    }

    public List<Offer> findAllByEvent(String title){
        Event event = eventService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("event с данным title не найден"));
        return offerRepository.findAllByEvent(event);
    }

    public void deleteOffer(Long id){
        offerRepository.deleteById(id);
    }

    public Offer saveOffer(Offer offer){
        return offerRepository.save(offer);
    }




}
