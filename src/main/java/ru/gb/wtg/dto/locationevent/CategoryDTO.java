package ru.gb.wtg.dto.locationevent;


import lombok.Data;
import lombok.NoArgsConstructor;
import ru.gb.wtg.models.locationevent.Category;

@Data
@NoArgsConstructor
public class CategoryDTO {

    private Long id;
    private String title;
    private String description;

    public CategoryDTO(Category category) {
        this.id = category.getId();
        this.title = category.getTitle();
        this.description = category.getDescription();
    }
}
