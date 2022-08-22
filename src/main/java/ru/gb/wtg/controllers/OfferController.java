package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.offer.OfferDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.offer.Offer;
import ru.gb.wtg.services.OfferService;

import java.util.List;
import java.util.stream.Collectors;


/**
 * OfferController
 *
 * <p>
 *    (@RestController) - указывает Spring Framework что,
 *    это комбинация @Controller и @ResponseBody,
 *    что позволяет сократить количество аннотаций на 1.
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
 *    (@RequestMapping) Эта аннотация позволяет,
 *    запускать методы и фрагменты кода каждый раз,
 *    когда конечный пользователь попадает
 *    в конечную точку (endpoint) с помощью HTTP-запроса.
 * </p>
 * <p>
 *    С учетом того, что в application.yaml
 *    прописан префикс "/wtg",
 *    итоговый endpoint для OfferController,
 *    будет выглядеть так:
 *      "/wtg/api/v1/offers"
 * </p
 * <p>
 *    Для локального запуска:
 *      "localhost:8179/wtg/api/v1/offers"
 *    где:
 *      localhost - локальный адрес,
 *      8179      - порт прописанный в application.yaml
 * </p>
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/offers")
public class OfferController {

    /**
     * Инжектим бин OfferService в OfferController
     * с именем offerService.
     */
    private final OfferService offerService;


    /**
     * Получаем все предложения,       // TODO нужны ли отдельно "подборки" или нет
     * <p>пример запроса: localhost:8179/wtg/api/v1/offers</p>
     *
     * (@Get/Post/Put/DeleteMapping) - аннотация для отображения запросов HTTP,
     * на определенные методы-обработчики.
     * Это составная аннотация, действует как ярлык.
     * (@RequestMapping(method) = RequestMethod.GET)
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * @return Список<ПредложенийДТО> (List OfferDTO)
     *
     * 1) Используем метод найтиВсе() (findAll()),
     *    сервисаПредложений (offerService),
     *    возвращающего списокПредложений (List<Offer>).
     *
     * 2) С помощью Stream API:
     *    из Списка<Предложений> (List<Offer>),
     *    получаем Стрим<Предложений> (Stream<Offer>).
     *
     * 3) Пересобираем Стрим<Предложений> (Stream<Offer>),
     *    в Стрим<ПредложенийДТО> (Stream <OfferDTO>).
     *
     * 4) Переводим Стрим<ПредложенийДТО> (Stream<OfferDTO>),
     *    в Список<ПредложенийДТО> (List<OfferDTO>)
     */
    @GetMapping()
    public List<OfferDTO> getAllOffers(){
        return offerService
                .findAll()
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем предложение по id
     * <p>пример запроса: localhost:8179/wtg/api/v1/offers/2</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - id предложения
     *
     * @return ПредложениеДТО (OfferDTO)
     *
     * Инициализируем Новое ПредложениеДТО (OfferDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод найтиПоId() (findById()),
     * сервисаПредложений (offerService),
     * с параметром id.
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Предложение(Offer) с данным id не найдено".
     */
    @GetMapping("/{id}")
    public OfferDTO getOfferById(@PathVariable Long id){
        return new OfferDTO(offerService
                .findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Предложение(Offer) с данным id не найдено")));
    }


    /**
     * Получаем маршрут по наименованию
     * <p>пример запроса: localhost:8179/wtg/api/v1/offers/title?title=Музей истории СК ЖД</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру Наименование (title) имя - title,
     *    с помощью атрибута name,
     *    ля его дальнейшего использования.
     * </p>
     *
     * @param title (String) - Наименование предложения
     *
     * @return ПредложениеДТО (OfferDTO)
     *
     * Инициализируем Новое ПредложениеДТО (OfferDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод найтиПоНазванию() (findByTitle()),
     * сервисаПредложений (offerService),
     * с параметром Наименование (title).
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Предложение(Offer) с данным наименованием (title) не найдено".
     */
    @GetMapping("/title")
    public OfferDTO getOfferByTitle(@RequestParam(name = "title") String title){
        return new OfferDTO(offerService
                .findByTitle(title)
                .orElseThrow(()-> new ResourceNotFoundException("Предложение(Offer) с данным наименованием(title) не найдено")));
    }


    /**
     * Получаем все предложения по id категории
     * <p>пример запроса: localhost:8179/wtg/api/v1/offers/category/4</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - где id это категория предложения

     * @return Список<ПредложенийДТО> (List OfferDTO)
     *
     * 1) Используем метод найтиВсеПоIdКатегорииПредложения() (findAllByOfferCategory()),
     *    сервиса<Предложений (offerService),
     *    возвращающего список<Предложений (List<Offer>),
     *    туда параметром отдаем id.
     *
     * 2) Используя StreamAPI (.stream()):
     *    из Списка<Предложений> (List<Offer>),
     *    получаем Стрим<Предложений> (Stream<Offer>).
     *
     * 3) Пересобираем Стрим<Предложений> (Stream<Offer>),
     *    в Стрим<ПредложенийДТО> (Stream <OfferDTO>).
     *
     * 4) Переводим Стрим<ПредложенийДТО> (Stream<OfferDTO>),
     *    в Список<ПредложенийДТО> (List<OfferDTO>)
     */
    @GetMapping("/category/{id}")
    public List<OfferDTO> getAllOffersByCategory(@PathVariable Long id){
        return offerService
                .findAllByOfferCategory(id)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем все предложения по наименованию категории
     * <p>пример запроса: localhost:8179/wtg/api/v1/offers/category/title?title=STORY</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру Наименование (title) имя - title,
     *    с помощью атрибута name, для его дальнейшего использования.
     * </p>
     * @param title (String) - Наименование, оно же - наименование категории

     * @return Список<ПредложенийДТО> (List OfferDTO)
     *
     * 1) Используем метод найтиВсеПоКатегорииПредложения() (findAllByOfferCategory()),
     *    сервисаПредложений (offerService),
     *    возвращающего списокПредложений (List<Offer>),
     *    туда параметром отдаем Наименование (title).
     *
     * 2) Используя StreamAPI (.stream()):
     *    из Списка<Предложений> (List<Offer>),
     *    получаем Стрим<Предложений> (Stream<Offer>).
     *
     * 3) Пересобираем Стрим<Предложений> (Stream<Offer>),
     *    в Стрим<ПредложенийДТО> (Stream<OfferDTO>).
     *
     * 4) Переводим Стрим<ПредложенийДТО> (Stream<OfferDTO>),
     *    в Список<ПредложенийДТО> (List<OfferDTO>)
     */
    @GetMapping("/category/title")
    public List<OfferDTO> getAllOffersByCategory(@RequestParam(name = "title") String title){
        return offerService
                .findAllByOfferCategory(title)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем все события по id создавшего юзера
     * <p>пример запроса:  localhost:8179/wtg/api/v1/offers/created/user/4</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - это id создавшего пользователя

     * @return Список<ПредложенийДТО> (List OfferDTO)
     *
     * 1) Используем метод НайтиВсеПоСоздавшемуПользователю() (findAllByUserCreated()),
     *    сервисаПредложений (offerService),
     *    возвращающего списокПредложений (List<Offer>),
     *    туда параметром отдаем id.
     *
     * 2) Используя StreamAPI (.stream()):
     *    из Списка<Предложений> (List<Offer>),
     *    получаем Стрим<Предложений> (Stream<Offer>).
     *
     * 3) Пересобираем Стрим<Предложений> (Stream<Offer>),
     *    в Стрим<ПредложенийДТО> (Stream <OfferDTO>).
     *
     * 4) Переводим Стрим<ПредложенийДТО> (Stream<OfferDTO>),
     *    в Список<ПредложенийДТО> (List<OfferDTO>)
     */
    @GetMapping("/created/user/{id}")
    public List<OfferDTO> getAllOffersByUserCreated(@PathVariable Long id){
        return offerService
                .findAllByUserCreated(id)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем все предложения по логину создавшего юзера
     * <p>пример запроса: localhost:8179/wtg/api/v1/offers/created/user/login?login=Gromoboy_333</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру логинСоздавшегоПользователя (login) имя - login,
     *    с помощью атрибута name, для его дальнейшего использования.
     * </p>
     * @param login (String) - Логин создавшего пользователя

     * @return Список<ПредложенийДТО> (List OfferDTO)
     *
     * 1) Используем метод НайтиВсеСобытияПоСоздавшемуИхЮзеру() findAllByUserCreated(),
     *    сервисаПредложений (offerService),
     *    возвращающего списокПредложений (List<Offer>),
     *    туда параметром отдаем Логин (login).
     *
     * 2) С помощью Stream API:
     *    из Списка<Событий> (List<Offer>),
     *    получаем Стрим<Предложений> (Stream<Offer>).
     *
     * 3) Пересобираем Стрим<Предложений> (Stream<Offer>),
     *    в Стрим<ПредложенийДТО> (Stream<OfferDTO>).
     *
     * 4) Переводим Стрим<ПредложенийДТО> (Stream<OfferDTO>),
     *    в Список<ПредложенийДТО> (List<OfferDTO>)
     */
    @GetMapping("/created/user/login")
    public List<OfferDTO> getAllOffersByUserCreated(@RequestParam(name = "login") String login){
        return offerService
                .findAllByUserCreated(login)
                .stream()
                .map(OfferDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Создаем новый маршрут
     * <p>пример запроса: localhost:8179/wtg/api/v1/offers/offer/create?
     *         title=Новое предложение&
     *         description=описание предложения</p>
     *
     * (@PostMapping) в методе используется запрос типа: POST.
     *
     * @param title (String)            - Наименование маршрута
     * @param description (String)      - Описание
     *
     * <p>Получаем данные следующим образом:</p>
     * <p>Инициализируем Новое Предложение (offer),
     *    в котором через сеттеры формируем предложение:
     *    setTitle()                    - параметром отдаем title;
     *    setDescription()              - параметром отдаем description;
     * </p>
     *
     * <p>Сохраняем сформированный маршрут,
     *    с помощью метода (saveOffer()),
     *    сервисаМаршрутов (offerService),
     *    куда параметром отдаем (offer).
     * </p>
     *
     * <p>Передаем указанные выше параметры,
     *    для создания нового предложения.
     * </p>
     */
    @PostMapping("/offer/create")
    public void createOffer(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description)
    {
        Offer offer = new Offer();
        offer.setTitle(title);
        offer.setDescription(description);
        offerService.saveOffer(offer);
    }


    /**
     * Удаляем предложение по id:
     *  <p>пример запроса: localhost:8179/wtg/api/v1/offers/offer/delete/1</p>
     *
     * (@DeleteMapping) в методе используется запрос типа: DELETE.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * <p>Получаем данные с помощью метода,
     *    удалитьПредложение() (deleteOffer()),
     *    с параметром (id)
     *    из сервисаПредложений (offerService)
     * </p>
     *
     * @param id (Long) - id предложения
     *
     * Передаем указанный параметр,
     * для определения предложения,
     * которое хотим удалить.
     */
    @DeleteMapping("/offer/delete/{id}")
    public void deleteOfferById(@PathVariable Long id){
        offerService.deleteOffer(id);
    }
}
