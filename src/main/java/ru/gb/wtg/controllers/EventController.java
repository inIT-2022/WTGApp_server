package ru.gb.wtg.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.event.EventDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.event.Event;
import ru.gb.wtg.services.EventService;

import java.util.List;
import java.util.stream.Collectors;


/**
 * EventController
 *
 * <p>
 *    (@RestController) - указывает Spring Framework что, это REST-контроллер
 *    (комбинация @Controller и @ResponseBody).
 * </p>
 *
 * <p>
 *    (@RequiredArgsConstructor) - аннотация Lombok,
 *    генерирует конструктор с 1 параметром для каждого поля,
 *    которое требует специальной обработки.
 *    Все неинициализированные final поля получают параметр,
 *    так же как все остальные поля, помеченные @NonNull,
 *    которые не инициализированы при объявлении.
 *    Для этих случаев также генерируется явная проверка на null.
 *    Конструктор бросает исключение NullPointerException,
 *    если какой-либо из параметров, предназначенный для полей,
 *    помеченных @NonNull содержит null.
 *    Порядок этих параметров совпадает с порядком появления полей в классе.
 * </p>
 * <p>
 *    (@RequestMapping) Эта аннотация позволяет нам запускать методы и фрагменты кода каждый раз,
 *    когда конечный пользователь попадает в конечную точку (endpoint) с помощью HTTP-запроса.
 * </p>
 * <p>
 *    С учетом того, что в application.yaml прописан префикс "/wtg",
 *    итоговый endpoint для LocationController,
 *    будет выглядеть так:
 *      "/wtg/api/v1/events"
 * </p
 * <p>
 *    Для локального запуска:
 *      "localhost:8179/wtg/api/v1/events"
 *    где:
 *      localhost - локальный адрес,
 *      8179      - порт прописанный в application.yaml
 * </p>
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/events")
public class EventController {

    /**
     * Инжектим бин EventService в EventController
     * с именем eventService.
     */
    private final EventService eventService;

    /**
     * Получаем все локации
     * <p>пример запроса: localhost:8179/wtg/api/v1/events</p>
     *
     * (@Get/Post/Put/DeleteMapping) - аннотация для отображения запросов HTTP,
     * на определенные методы-обработчики.
     * Это составная аннотация, действует как ярлык.
     * (@RequestMapping(method) = RequestMethod.GET)
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * @return Список<СобытийДТО> (List EventDTO)
     *
     * 1)Используем метод НайтиВсе(), СервисаСобытий (eventService),
     * возвращающего списокЛокаций (List<Event>).
     *
     * С помощью Stream API:
     * 2) из Списка<Событий> (List<Event>),
     * получаем Стрим<Событий> (Stream<Event>).
     *
     * 3) пересобираем Стрим<Событий> (Stream<Event>),
     * в Стрим<СобытийДТО> (Stream <EventDTO>).
     *
     * 4) переводим Стрим<СобытийДТО> (Stream<EventDTO>),
     * в Список<СобытийДТО> (List<EventDTO>)
     */
    @GetMapping()
    public List<EventDTO> getAllEvents(){
        return eventService.findAll()
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

// todo тестовый метод (удалить в дальнейшем)
    @GetMapping("/eventmodels")
    public List<Event> getAllEventModels(){
        return eventService.findAll();
    }

    // todo тестовый метод (удалить в дальнейшем)
    @GetMapping("/model/{id}")
    public Event getEventByIdModel(@PathVariable Long id){
        return eventService.findById(id).get();
    }

    /**
     * Получаем событие по id
     * <p>пример запроса: localhost:8179/wtg/api/v1/events/1</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - id события
     *
     * @return СобытиеДТО (EventDTO)
     *
     * Инициализируем Новое СобытиеДТО (EventDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод НайтиПоId findById,
     * СервисаСобытий (eventService),
     * с параметром id.
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Событие(Event) с данным id не найдено".
     */
    @GetMapping("/{id}")
    public EventDTO getEventById(@PathVariable Long id){
        return new EventDTO(eventService.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Coбытие(Event) с данным id не найдено")));
    }

    /**
     * Получаем событие по названию
     *
     * <p>пример запроса: localhost:8179/wtg/api/v1/events/title?title=Ярмарка кубанских продуктов</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру Наименование (title) имя - title,
     *    с помощью атрибута name,
     *    ля его дальнейшего использования.
     * </p>
     *
     * @param title (String) - Наименование локации
     *
     * @return СобытиеДТО (EventDTO)
     *
     * Инициализируем Новое СобытиеДТО (EventDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод НайтиПоНазванию findByTitle,
     * СервисаСобытий (eventService),
     * с параметром Наименование (title).
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Событие(Event) с данным title не найдено".
     */
    @GetMapping("/title")
    public EventDTO getEventByTitle(@RequestParam(name = "title") String title){
        return new EventDTO(eventService
                .findByTitle(title).orElseThrow(()-> new ResourceNotFoundException("Событие(Event) с данным наименованием (title) не найдено")));
    }

    /**
     * Получаем все события по id категории
     * <p>пример запроса: localhost:8179/wtg/api/v1/events/category/1</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - оно же id категории

     * @return Список<СобытийДТО> (List EventDTO)
     *
     * 1)Используем метод НайтиВсеКатегорииДляСобытий,
     * СервисаСобытий (eventService),
     * возвращающего списокЛокаций (List<Event>),
     * туда параметром отдаем id.
     *
     * С помощью Stream API:
     * 2) из Списка<Событий> (List<Event>),
     * получаем Стрим<Событий> (Stream<Event>).
     *
     * 3) пересобираем Стрим<Событий> (Stream<Event>),
     * в Стрим<СобытийДТО> (Stream <EventDTO>).
     *
     * 4) переводим Стрим<СобытийДТО> (Stream<EventDTO>),
     * в Список<СобытийДТО> (List<EventDTO>)
     */
    @GetMapping("/category/{id}")
    public List<EventDTO> getAllEventsByCategory(@PathVariable Long id){
        return eventService.findAllByCategoryForEvents(id)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/category_title")
    public List<EventDTO> getAllEventsByCategory(@RequestParam(name = "title") String title){
        return eventService.findAllByCategoryForEvents(title)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created/{id}")
    public List<EventDTO> getAllEventsByUserCreated(@PathVariable Long id){
        return eventService.findAllByUserCreated(id)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user_created_login")
    public List<EventDTO> getAllEventsByUserCreated(@RequestParam(name = "login") String login){
        return eventService.findAllByUserCreated(login)
                .stream()
                .map(EventDTO::new)
                .collect(Collectors.toList());
    }






}
