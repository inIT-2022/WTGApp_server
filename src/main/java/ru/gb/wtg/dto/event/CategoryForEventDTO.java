package ru.gb.wtg.dto.event;


import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.models.event.CategoryForEvent;


@Data
@NoArgsConstructor
public class CategoryForEventDTO {

    private Long id;
    private String title;
    private String description;

    public CategoryForEventDTO(CategoryForEvent categoryForEvent) {
        this.id = categoryForEvent.getId();
        this.title = categoryForEvent.getTitle();
        this.description = categoryForEvent.getDescription();
    }
}
