package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.offer.OfferDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.offer.Offer;
import ru.gb.wtg.services.OfferService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/offers")
public class OfferController {

    private final OfferService offerService;


    @GetMapping()
    public List<OfferDTO> getAllOffers(){
        return offerService.findAll()
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public OfferDTO getOfferById(@PathVariable Long id){
        return new OfferDTO(offerService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Offer с данным id не найден")));
    }

    @GetMapping("/title")
    public OfferDTO getOfferByTitle(@RequestParam(name = "title") String title){
        return new OfferDTO(offerService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Offer с данным title не найден")));
    }


    @GetMapping("/category/{id}")
    public List<OfferDTO> getAllOffersByCategory(@PathVariable Long id){
        return offerService.findAllByOfferCategory(id)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    public List<OfferDTO> getAllOffersByCategory(@RequestParam(name = "title") String title){
        return offerService.findAllByOfferCategory(title)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created/{id}")
    public List<OfferDTO> getAllOffersByUserCreated(@PathVariable Long id){
        return offerService.findAllByUserCreated(id)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created_login")
    public List<OfferDTO> getAllOffersByUserCreated(@RequestParam(name = "login") String login){
        return offerService.findAllByUserCreated(login)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }


    @PostMapping("/createOffer")
    public void createOffer(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description
    ){
        Offer offer = new Offer();
        offer.setTitle(title);
        offer.setDescription(description);
        offerService.saveOffer(offer);
    }


    @DeleteMapping("/deleteOfferById/{id}")
    public void deleteOfferById(@PathVariable Long id){
        offerService.deleteOffer(id);
    }


}
