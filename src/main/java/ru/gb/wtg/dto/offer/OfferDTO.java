package ru.gb.wtg.dto.offer;


import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.models.offer.Offer;

@Data
@NoArgsConstructor
public class OfferDTO {

    private Long id;
    private String title;
    private String description;
    private Long userCreatedId;
    private Long userReceivedId;
    private String eventId;
    private String locationId;
    private String offerCategoryId;

    public OfferDTO(Offer offer) {
        this.id = offer.getId();
        this.title = offer.getTitle();
        this.description = offer.getDescription();
        this.userCreatedId = offer.getUserCreated().getId();
        this.userReceivedId = offer.getUserReceived().getId();
        this.eventId = offer.getEvent().getTitle();
        this.locationId = offer.getLocation().getTitle();
        this.offerCategoryId = offer.getOfferCategory().getTitle();
    }



}
