package ru.gb.wtg.controllers;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
@Api(tags = "Предложения")
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
    @ApiOperation(value = "Получение предложения по id", response = OfferDTO.class)
    public OfferDTO getOfferById(@PathVariable Long id){
        return new OfferDTO(offerService.findById(id).orElseThrow(()-> new ResourceNotFoundException("Offer с данным id не найден")));
    }

    @GetMapping("/title")
    @ApiOperation(value = "Получение предложения по наименованию", response = OfferDTO.class)
    public OfferDTO getOfferByTitle(@RequestParam(name = "title") String title){
        return new OfferDTO(offerService.findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Offer с данным title не найден")));
    }

    @GetMapping("/category/{id}")
    @ApiOperation(value = "Получение предложений по id категории", response = OfferDTO.class, responseContainer = "list")
    public List<OfferDTO> getAllOffersByCategory(@PathVariable Long id){
        return offerService.findAllByOfferCategory(id)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    @ApiOperation(value = "Получение предложений по наименовании категории", response = OfferDTO.class, responseContainer = "list")
    public List<OfferDTO> getAllOffersByCategory(@RequestParam(name = "title") String title){
        return offerService.findAllByOfferCategory(title)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created/{id}")
    @ApiOperation(value = "Получение предложений созданных пользователем с указанным id", response = OfferDTO.class, responseContainer = "list")
    public List<OfferDTO> getAllOffersByUserCreated(@PathVariable Long id){
        return offerService.findAllByUserCreated(id)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created_login")
    @ApiOperation(value = "Получение предложений созданных пользователем с указанным логином", response = OfferDTO.class, responseContainer = "list")
    public List<OfferDTO> getAllOffersByUserCreated(@RequestParam(name = "login") String login){
        return offerService.findAllByUserCreated(login)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }

    @PostMapping("/createOffer")
    @ApiOperation(value = "Создание предложения")
    public void createOffer(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description){
        Offer offer = new Offer();
        offer.setTitle(title);
        offer.setDescription(description);
        offerService.saveOffer(offer);
    }

    @DeleteMapping("/deleteOfferById/{id}")
    @ApiOperation(value = "Удаление предложения")
    public void deleteOfferById(@PathVariable Long id){
        offerService.deleteOffer(id);
    }

}
