
Запуск WTGApp_server:

1) WtgApplication.java - файл, точка старта приложения

2) Идем по следующей директории проекта:
   src/main/java/ru/gb/wtg

3) выбираем WtgApplication.java

4) ищем в IDE кнопку для запуска java кода
                  --or-- 
5)запускаем java кода WtgApplication.java через терминал

==============================================================================================================================================================
Схемы JSON

1) LocationDTO:
{
    "id": Long,
    "title": "String",
    "description": "String",
    "fullDescription": "String",
    "address": "String",
    "workTimeStart": LocalDateTime,
    "workTimeEnd": LocalDateTime,
    "workBreakStart": LocalDateTime,
    "workBreakEnd": LocalDateTime,
    "linkImage": "String",
    "linkSite": "String",
    "latitude": Double,
    "longitude": Double
}

2) EventDTO:
{
    "id": Long,
    "title": "String",
    "description": "String",
    "startDatetime": LocalDateTime,
    "finishDatetime": LocalDateTime,
    "linkEventSite": "String",
    "price": Integer,
    "location": Long,
    "isActive": Boolean,
    "userCreatedId": Long
}


3) UserDTO:
{
    "id": Long,
    "login": "String",
    "email": "String",
    "password": String,
    "firstName": "String",
    "lastName": "String",
    "birthdayDate": LocalDate,
    "userRoleString": "String",
    "enabled": Boolean,
    "authorities": [
        {
            "id": Long,
            "title": "String",
            "authority": "String"
        }
    ],
    "username": "String",
    "accountNonExpired": Boolean,
    "credentialsNonExpired": Boolean,
    "accountNonLocked": Boolean
}

4) RouteDTO:
{
    "id": Long,
    "title": "String",
    "description": "String",
    "duration": "LocalDateTime",
    "distance": Double,
    "routeCategoryId": Long,
    "userCreatedId": Long
}



==============================================================================================================================================================

Пример Локации с id = 1:
{
    "id": 1,
    "title": "Скейт парк",
    "description": "Короткое описание",
    "fullDescription": "Полное описание",
    "address": "Школьный м-н, Прикубанский округ, Краснодар",
    "workTimeStart": "2022-08-16T09:00:00",
    "workTimeEnd": "2022-08-16T19:00:00",
    "workBreakStart": null,
    "workBreakEnd": null,
    "linkImage": "https://i0.photo.2gis.com/images/geo/0/30258560049059317_9c5d.jpg",
    "linkSite": "https://www.culture.ru/",
    "latitude": 45.039703,
    "longitude": 39.030299
}


Пример События с id = 4: 
* "userCreatedId": null - пока не формируется. нужна доработка.

{
    "id": 4,
    "title": "Всероссийский праздник «Единый день фольклора»",
    "description": "17 июля – всероссийский праздник «Единый день фольклора».\r\n
                    Посетителей этно-комплекса в этот день ждут концертные программы
                    от коллективов со всего Краснодарского края.\r\nНа протяжении всего
                    фестивального дня – с 9 до 19 часов – будут работать станичная кузня,
                    коптильня,\r\nгончарная мастерская, конный прокат, выставки-ярмарки 
                    народных умельцев и станичный ЗАГС.
                    \r\nДля юных посетителей предусмотрели интерактивные пространства.",
    "startDatetime": "2022-07-17T09:00:00",
    "finishDatetime": "2022-07-17T19:00:00",
    "linkEventSite": "https://admkrai.krasnodar.ru/content/1131/show/642160/",
    "price": null,
    "location": 2,
    "isActive": true,
    "userCreatedId": null
}

Пример Пользователя с id = 1:
{
    "id": 1,
    "login": "Krolik_045",
    "email": "Zaycev80@mail.ru",
    "password": null,
    "firstName": "Ivan",
    "lastName": "Zaycev",
    "birthdayDate": "1980-05-05",
    "userRoleString": "ROLE_USER",
    "enabled": false,
    "authorities": [
        {
            "id": null,
            "title": "ROLE_USER",
            "authority": "ROLE_USER"
        }
    ],
    "username": "Krolik_045",
    "accountNonExpired": false,
    "credentialsNonExpired": false,
    "accountNonLocked": false
}

Пример маршрута с id = 1:
{
    "id": 1,
    "title": "Что посмотреть за 1 день самостоятельно",
    "description": "Краснодар часто посещают на 1 день
                    проездом — по дороге на черноморское побережье.\r\n
                    Город приятен для размеренных прогулок — несмотря на
                    отсутствие моря,\r\nздесь ощущается расслабленная
                    курортная атмосфера. В городе отлично развита
                    инфраструктура\r\n— много кафе и ресторанов достойного
                    уровня, интерактивных музеев и развлекательных заведений.
                    \r\nС чего начать знакомство с Краснодаром? Отправляйтесь
                    в Екатерининский сквер",
    "duration": "2022-08-22T05:00:00",
    "distance": 25.0,
    "routeCategoryId": null,
    "userCreatedId": null
}


==============================================================================================================================================================
Описание REST адресов:
______________________________________________________________________________________________________________________________________________________________
Локации:
1 - localhost:8179/wtg/api/v1/locations                                  - Получаем все локации
2 - localhost:8179/wtg/api/v1/locations/1                                - Получаем локацию по Id
3 - localhost:8179/wtg/api/v1/locations/title?title=Скейт парк           - Получаем локацию по наименованию
4 - localhost:8179/wtg/api/v1/locations/category_id/1                    - Получаем все локации по id категории (добавить категорию в локацию)
5 - localhost:8179/wtg/api/v1/locations/category_title?title=STORY       - Получаем все локации по названию категории (добавить категорию в локацию)
6 - localhost:8179/wtg/api/v1/locations/location/create?                  
                            title=13Локация&
                            description=описание полное&
                            fullDescription=описание полное&
                            address=Плющиха, 2&
                            latitude=10.0&
                            longitude=50.0)                              - Создаем новую локацию
7 - localhost:8179/wtg/api/v1/locations/location/delete/12               - Удаляем локации по id
______________________________________________________________________________________________________________________________________________________________
События:
1 - localhost:8179/wtg/api/v1/events                                     - Получаем все события
2 - localhost:8179/wtg/api/v1/events/1                                   - Получаем событие по id
3 - localhost:8179/wtg/api/v1/events
                /title?title=Ярмарка кубанских продуктов                 - Получаем событие по наименованию
4 - localhost:8179/wtg/api/v1/events/category/1                          - Получаем все события по id категории
5 - localhost:8179/wtg/api/v1/events/category/title?title=STORY          - Получаем все события по наименованию категории
6 - localhost:8179/wtg/api/v1/events/created/user/4                      - Получаем все события по id создавших юзеров
7 - localhost:8179/wtg/api/v1/events
                /created/user/login?login=Gromoboy_333                   - Получаем все события по логину создавших юзеров

   - localhost:8179/wtg/api/v1/events/eventmodels                        - Тестовый метод (можно удалить)
   - localhost:8179/wtg/api/v1/events/model/{id}                         - Тестовый метод (можно удалить)
  
8 -                                                                      - todo: Нужен метод для создания события
9 -                                                                      - todo: Нужен метод для удаления события
______________________________________________________________________________________________________________________________________________________________
Пользователи:
1 - localhost:8179/wtg/api/v1/users                                      - Получаем всех пользователей
2 - localhost:8179/wtg/api/v1/users/role/1                               - Получаем всех пользователей по id роли
3 - localhost:8179/wtg/api/v1/users/role/title?title=ROLE_BISNESS        - Получаем всех пользователей по наименованию роли
4 - localhost:8179/wtg/api/v1/users/1                                    - Получаем пользователя по id
5 - localhost:8179/wtg/api/v1/users/login/Krolik_045                     - Получаем пользователя по логину
6 - localhost:8179/wtg/api/v1/users/user/create?
                            
                                                                         - 
7 - localhost:8179/wtg/api/v1/users/user/delete/1                        - Удаляем пользователя по id
______________________________________________________________________________________________________________________________________________________________
Маршруты:
 1 - localhost:8179/wtg/api/v1/routes                                    - Получаем все маршруты
 2 - localhost:8179/wtg/api/v1/routes/1                                  - Получаем маршрут по id
 3 - localhost:8179/wtg/api/v1/routes/title?title=Второй день            - Получаем маршрут по наименованию
 4 - localhost:8179/wtg/api/v1/routes/category/4                         - Получаем все маршруты по id категории
 5 - localhost:8179/wtg/api/v1/routes/category/title?title=ARCHITECTURE  - Получаем все маршруты по наименованию категории
 6 - localhost:8179/wtg/api/v1/routes/route/create?
                                  title=Новый Маршрут&
                                  description=описание полное&
                                  distance=25.4                          - Создаем новый маршрут
 7 - localhost:8179/wtg/api/v1/routes/route/delete/1                     - Удаляем маршрут по id
______________________________________________________________________________________________________________________________________________________________
Предложения (подборки):
1 - localhost:8179/wtg/api/v1/offers                                     -
2 - localhost:8179/wtg/api/v1/offers/category/{id}                       -
3 - localhost:8179/wtg/api/v1/offers/category_title                      -
4 - localhost:8179/wtg/api/v1/offers/createOffer                         -
5 - localhost:8179/wtg/api/v1/offers/deleteOfferById/{id}                -
6 - localhost:8179/wtg/api/v1/offers/title                               -
7 - localhost:8179/wtg/api/v1/offers/user_created/{id}                   -
8 - localhost:8179/wtg/api/v1/offers/user_created_login                  -
9 - localhost:8179/wtg/api/v1/offers/{id}                                -
______________________________________________________________________________________________________________________________________________________________
Авторизация:
localhost:8179/wtg/login                                                 -
______________________________________________________________________________________________________________________________________________________________
Регистрация:
localhost:8179/wtg/signup                                                -
==============================================================================================================================================================