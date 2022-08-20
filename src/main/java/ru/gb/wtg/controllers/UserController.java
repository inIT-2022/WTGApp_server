package ru.gb.wtg.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.gb.wtg.dto.user.UserDTO;
import ru.gb.wtg.exceptions.ResourceNotFoundException;
import ru.gb.wtg.models.user.User;
import ru.gb.wtg.services.UserService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;


/**
 * UserController
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
 *    (@RequestMapping) Эта аннотация позволяет
 *    запускать методы и фрагменты кода каждый раз,
 *    когда конечный пользователь попадает
 *    в конечную точку (endpoint) с помощью HTTP-запроса.
 * </p>
 * <p>
 *    С учетом того, что в application.yaml
 *    прописан префикс "/wtg",
 *    итоговый endpoint для EventController,
 *    будет выглядеть так:
 *      "/wtg/api/v1/users"
 * </p
 * <p>
 *    Для локального запуска:
 *      "localhost:8179/wtg/api/v1/users"
 *    где:
 *      localhost - локальный адрес,
 *      8179      - порт, прописанный в application.yaml
 * </p>
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {

    /**
     * Инжектим бин UserService в UserController
     * с именем userService.
     */
    private final UserService userService;

    /**
     * Получаем всех пользователей
     * <p>пример запроса: localhost:8179/wtg/api/v1/users</p>
     *
     * (@Get/Post/Put/DeleteMapping) - аннотация для отображения запросов HTTP,
     * на определенные методы-обработчики.
     * Это составная аннотация, действует как ярлык.
     * (@RequestMapping(method) = RequestMethod.GET)
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * @return Список<ПользователейДТО> (List UserDTO)
     *
     * 1)Используем метод найтиВсе() (findAll()),
     * сервисаПользователей (userService),
     * возвращающего списокПользователей (List<User>).
     *
     * С помощью Stream API:
     * 2) из Списка<Пользователей> (List<User>),
     * получаем Стрим<Пользователей> (Stream<User>).
     *
     * 3) пересобираем Стрим<Пользователей> (Stream<User>),
     * в Стрим<ПользователейДТО> (Stream <UserDTO>).
     *
     * 4) переводим Стрим<ПользователейДТО> (Stream<UserDTO>),
     * в Список<ПользователейДТО> (List<UserDTO>)
     */
    @GetMapping
    public List<UserDTO> getAllUsers(){
        return userService
                .findAll()
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Получаем всех пользователей по id роли
     * <p>пример запроса: localhost:8179/wtg/api/v1/users/role/1</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - где id это категория

     * @return Список<ПользователейДТО> (List UserDTO)
     *
     * 1) Используем метод найтиВсеПользователейПоРоли (findAllByUserRole()),
     *    сервисаПользователей (userService),
     *    возвращающего списокПользователей (List<User>),
     *    туда параметром отдаем id.
     *
     * 2) Используя StreamAPI (.stream()):
     *    из Списка<Пользователей> (List<User>),
     *    получаем Стрим<Пользователей> (Stream<User>).
     *
     * 3) Пересобираем Стрим<Пользователей> (Stream<User>),
     *    в Стрим<ПользователейДТО> (Stream<UserDTO>).
     *
     * 4) Переводим Стрим<ПользователейДТО> (Stream<UserDTO>),
     *    в Список<ПользователейДТО> (List<UserDTO>)
     */
    @GetMapping("/role/{id}")
    public List<UserDTO> getAllUsersByRoleId(@PathVariable Long id){
        return userService
                .findAllByUserRole(id)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем всех пользователей по наименованию роли
     * <p>пример запроса: localhost:8179/wtg/api/v1/users/role/title?title=ROLE_BISNESS</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @RequestParam,
     *    присваиваем параметру Наименование (title) имя - title,
     *    с помощью атрибута name, для его дальнейшего использования.
     * </p>
     * @param title (String) - Наименование, оно же - наименование роли пользователя

     * @return Список<ПользователейДТО> (List UserDTO)
     *
     * 1) Используем метод НайтиВсехПользователейПоНаименованиюРоли() findAllByUserRole(),
     *    сервисаПользователей (userService),
     *    возвращающего списокПользователей (List<User>),
     *    туда параметром отдаем Наименование (title).
     *
     * 2) Используя StreamAPI (.stream()):
     *    из Списка<Пользователей> (List<User>),
     *    получаем Стрим<Пользователей> (Stream<User>).
     *
     * 3) пересобираем Стрим<Пользователей> (Stream<User>),
     *    в Стрим<ПользователейДТО> (Stream<UserDTO>).
     *
     * 4) переводим Стрим<ПользователейДТО> (Stream<UserDTO>),
     *    в Список<ПользователейДТО> (List<UserDTO>)
     */
    @GetMapping("/role/title")
    public List<UserDTO> getAllUsersByRoleTitle(@RequestParam(name = "title") String title){
        return userService
                .findAllByUserRole(title)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }


    /**
     * Получаем пользователя по id
     * <p>пример запроса: localhost:8179/wtg/api/v1/users/1</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * @param id (Long) - id пользователя
     *
     * @return ПользовательДТО (UserDTO)
     *
     * Инициализируем Нового ПользователяДТО (UserDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод найтиПоId() (findById()),
     * сервисаПользователей (userService),
     * с параметром id.
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Пользователь(User) с данным id не найден".
     */
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id){
        return new UserDTO(userService
                .findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Пользователь(User) с данным id не найден")));
    }


    /**
     * Получаем пользователя по логину
     * <p>пример запроса: localhost:8179/wtg/api/v1/users/login/Krolik_045</p>
     *
     * (@GetMapping) в методе используется запрос типа: GET.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {login}
     * </p>
     *
     * @param login (String) - логин пользователя
     *
     * @return ПользовательДТО (UserDTO)
     *
     * Инициализируем Нового ПользователяДТО (UserDTO),
     * в качестве параметра,
     * туда отдаем следующее лямбда выражения:
     *
     * Используем метод найтиПоЛогину() (findByLogin()),
     * сервисаПользователей (userService),
     * с параметром id.
     *
     * В случае отсутствия, метод вернет исключение:
     * РесурсНеНайден (ResourceNotFoundException),
     * с текстом: "Пользователь(User) с данным логином(login) не найден".
     */
    @GetMapping("/login/{login}")
    public UserDTO getUserByLogin(@PathVariable String login){
        return new UserDTO(userService
                .findByLogin(login)
                .orElseThrow(()-> new ResourceNotFoundException("Пользователь(User) с данным логином(login) не найден")));
    }


    // TODO разобраться как работает метод createUser(),
    //  ошибка 500 при получении вновь созданного пользователя.
    //  localhost:8179/wtg/api/v1/users/user/create?login&password&firstName&lastName&email
    @PostMapping("/user/create")
    public void createUser(
            @RequestParam(name = "login")       String login,
            @RequestParam(name = "password")    String password,
            @RequestParam(name = "firstName")   String fistName,
            @RequestParam(name = "lastName")    String lastName,
//            @RequestParam(name = "birthday_date") LocalDate birthday_date,
            @RequestParam(name = "email")       String email) {
        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        user.setFirstName(fistName);
        user.setLastName(lastName);
        user.setEmail(email);
//        user.setBirthdayDate(birthday_date);

        userService.saveUser(user);
    }

    /**
     * Удаляем пользователя по id:
     *  <p>пример запроса: localhost:8179/wtg/api/v1//user/delete/1</p>
     *
     * (@DeleteMapping) в методе используется запрос типа: DELETE.
     *
     * <p>Используем аннотацию @PathVariable
     *    для извлечения шаблонной части URI,
     *    представленной переменной {id}
     * </p>
     *
     * <p>Получаем данные с помощью метода,
     *    удалитьПользователя() (deleteUser()),
     *    с параметром (id)
     *    из сервисаПользователей (userService)
     * </p>
     *
     * @param id (Long)
     * Передаем указанный параметр,
     * для определения пользователя,
     * которого хотим удалить.
     */
    @DeleteMapping("/user/delete/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
