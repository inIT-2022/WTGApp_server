package ru.gb.wtg.dto.location;


import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.models.location.CategoryForLocation;


@Data
@NoArgsConstructor
public class CategoryForLocationDTO {

    private Long id;
    private String title;
    private String description;

    public CategoryForLocationDTO(CategoryForLocation categoryForLocation) {
        this.id = categoryForLocation.getId();
        this.title = categoryForLocation.getTitle();
        this.description = categoryForLocation.getDescription();
    }
}
