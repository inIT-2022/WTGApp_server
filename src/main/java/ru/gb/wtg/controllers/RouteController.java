package ru.gb.wtg.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.route.RouteDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.route.Route;
import ru.gb.wtg.services.RouteService;

import java.util.List;
import java.util.stream.Collectors;


/**
 * RouteController
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
 *    итоговый endpoint для RouteController,
 *    будет выглядеть так:
 *      "/wtg/api/v1/routes"
 * </p
 * <p>
 *    Для локального запуска:
 *      "localhost:8179/wtg/api/v1/routes"
 *    где:
 *      localhost - локальный адрес,
 *      8179      - порт прописанный в application.yaml
 * </p>
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/routes")
public class RouteController {

    /**
     * Инжектим бин RouteService в RouteController
     * с именем routeService.
     */
    private final RouteService routeService;


    /**
     * Получаем все маршруты
     * <p>пример запроса: localhost:8179/wtg/api/v1/routes</p>
     *
     * (@Get/Post/Put/DeleteMapping) - аннотация для отображения запросов HTTP,
     * на определенные методы-обработчики.
     * Это составная аннотация, действует как ярлык.
     * (@RequestMapping(method) = RequestMethod.GET)
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * @return Список<МаршрутовДТО> (List RouteDTO)
     *
     * 1) Используем метод найтиВсе() (findAll()),
     *    сервисаМаршрутов (routeService),
     *    возвращающего списокМаршрутов (List<Route>).
     *
     * 2) С помощью Stream API:
     *    из Списка<Маршрутов> (List<Route>),
     *    получаем Стрим<Маршрутов> (Stream<Route>).
     *
     * 3) Пересобираем Стрим<Маршрутов> (Stream<Route>),
     *    в Стрим<МаршрутовДТО> (Stream <RouteDTO>).
     *
     * 4) Переводим Стрим<МаршрутовДТО> (Stream<RouteDTO>),
     *    в Список<МаршрутовДТО> (List<RouteDTO>)
     */
    @GetMapping()
    public List<RouteDTO> getAllRoutes(){
        return routeService
                .findAll()
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем маршрут по id
     * <p>пример запроса: localhost:8179/wtg/api/v1/routes/1</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - id маршрута
     *
     * @return МаршрутДТО (RouteDTO)
     *
     * Инициализируем Новый МаршрутДТО (RouteDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод найтиПоId() (findById()),
     * сервисаМаршрутов (routeService),
     * с параметром id.
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Маршрут(Route) с данным id не найден".
     */
    @GetMapping("/{id}")
    public RouteDTO getRouteById(@PathVariable Long id){
        return new RouteDTO(routeService
                .findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Маршрута(Route) с данным id не найдено")));
    }


    /**
     * Получаем маршрут по наименованию
     * <p>пример запроса: localhost:8179/wtg/api/v1/routes/title?title=Второй день</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру Наименование (title) имя - title,
     *    с помощью атрибута name,
     *    ля его дальнейшего использования.
     * </p>
     *
     * @param title (String) - Наименование маршрута
     *
     * @return МаршрутДТО (RouteDTO)
     *
     * Инициализируем Новый МаршрутДТО (RouteDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод найтиПоНазванию() (findByTitle()),
     * сервисаМаршрутов (routeService),
     * с параметром Наименование (title).
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Маршрут(Route) с данным наименованием (title) не найден".
     */
    @GetMapping("/title")
    public RouteDTO getRouteByTitle(@RequestParam(name = "title") String title){
        return new RouteDTO(routeService
                .findByTitle(title)
                .orElseThrow(()-> new ResourceNotFoundException("route с данным title не найден")));
    }


    /**
     * Получаем все маршруты по id категории
     * <p>пример запроса: localhost:8179/wtg/api/v1/routes/category/4</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - где id это категория

     * @return Список<МаршрутовДТО> (List RouteDTO)
     *
     * 1) Используем метод найтиВсеПоIdКатегорииМаршрута() (findAllByRoutesCategory()),
     *    сервисаМаршрутов (routeService),
     *    возвращающего списокМаршрутов (List<Route>),
     *    туда параметром отдаем id.
     *
     * 2) Используя StreamAPI (.stream()):
     *    из Списка<Маршрутов> (List<Route>),
     *    получаем Стрим<Маршрутов> (Stream<Route>).
     *
     * 3) Пересобираем Стрим<Маршрутов> (Stream<Route>),
     *    в Стрим<МаршрутовДТО> (Stream <RouteDTO>).
     *
     * 4) Переводим Стрим<МаршрутовДТО> (Stream<RouteDTO>),
     *    в Список<МаршрутовДТО> (List<RouteDTO>)
     */
    // TODO метод отрабатывает не корректно,
    //  1) не отображается цифра id категории маршрута (routeCategoryId),
    //  2) не отображается цифра id пользователя, создавшего маршрут  (userCreatedId)
    /*
        "id": Long,
        "title": "String",
        "description": "String",
        "duration": LocalDateTime,
        "distance": Double,
        "routeCategoryId": null, - тут проблема
        "userCreatedId": null    - тут проблема
    */
    @GetMapping("/category/{id}")
    public List<RouteDTO> getAllRoutesByCategory(@PathVariable Long id){
        return routeService
                .findAllByRouteCategory(id)
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем все маршруты по наименованию категории
     * <p>пример запроса: localhost:8179/wtg/api/v1/routes/category/title?title=ARCHITECTURE</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру Наименование (title) имя - title,
     *    с помощью атрибута name, для его дальнейшего использования.
     * </p>
     * @param title (String) - Наименование, оно же - наименование категории

     * @return Список<МаршрутовДТО> (List RouteDTO)
     *
     * 1) Используем метод найтиВсеПоКатегорииМаршрута() (findAllByRouteCategory()),
     *    сервисаСобытий (routeService),
     *    возвращающего списокМаршрутов (List<Route>),
     *    туда параметром отдаем Наименование (title).
     *
     * 2) Используя StreamAPI (.stream()):
     *    из Списка<Маршрутов> (List<Route>),
     *    получаем Стрим<Маршрутов> (Stream<Route>).
     *
     * 3) Пересобираем Стрим<Маршрутов> (Stream<Route>),
     *    в Стрим<МаршрутовДТО> (Stream<RouteDTO>).
     *
     * 4) Переводим Стрим<МаршрутовДТО> (Stream<RouteDTO>),
     *    в Список<МаршрутовДТО> (List<RouteDTO>)
     */
    @GetMapping("/category/title")
    public List<RouteDTO> getAllRoutesByCategory(@RequestParam(name = "title") String title){
        return routeService
                .findAllByRouteCategory(title)
                .stream()
                .map(RouteDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Создаем новый маршрут
     * <p>пример запроса: localhost:8179/wtg/api/v1/routes/route/create?
     *         title=Новый Маршрут&
     *         description=описание полное&
     *         distance=25.4</p>
     *
     * (@PostMapping) в методе используется запрос типа: POST.
     *
     * @param title (String)            - Наименование маршрута
     * @param description (String)      - Описание
     * @param distance (Double)         - Расстояние
     *
     * <p>Получаем данные следующим образом:</p>
     * <p>Инициализируем Новый Маршрут (route),
     *    в которой через сеттеры формируем маршрут:
     *    setTitle()                    - параметром отдаем title;
     *    setDescription()              - параметром отдаем description;
     *    setDistance()                 - параметром отдаем distance;
     * </p>
     *
     * <p>Сохраняем сформированный маршрут,
     *    с помощью метода (saveRoute()),
     *    сервисаМаршрутов (routeService),
     *    куда параметром отдаем (route).
     * </p>
     *
     * <p>Передаем указанные выше параметры,
     *    для создания нового маршрута.
     * </p>
     */
    @PostMapping("/route/create")
    public void createRoute(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "description") String description,
            // @RequestParam(name = "duration") LocalDateTime duration,
            @RequestParam(name = "distance") Double distance)
    {
        Route route = new Route();
        route.setTitle(title);
        route.setDescription(description);
        route.setDistance(distance);

        routeService.saveRoute(route);
    }


    /**
     * Удаляем маршрут по id:
     *  <p>пример запроса: localhost:8179/wtg/api/v1/routes/route/delete/1</p>
     *
     * (@DeleteMapping) в методе используется запрос типа: DELETE.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * <p>Получаем данные с помощью метода,
     *    удалитьМаршрут() (deleteRoute()),
     *    с параметром (id)
     *    из сервисаМаршрутов (routeService)
     * </p>
     *
     * @param id (Long)
     * Передаем указанный параметр,
     * для определения маршрута,
     * который хотим удалить.
     */
    @DeleteMapping("/route/delete/{id}")
    public void deleteRouteById(@PathVariable Long id){
        routeService.deleteRoute(id);
    }

}
