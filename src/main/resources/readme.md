
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

LocationDTO:
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

EventDTO:
{
    "id": Long,
    "title": "String",
    "description": "String",
    "startDatetime": "LocalDateTime",
    "finishDatetime": "LocalDateTime",
    "linkEventSite": "String",
    "price": Integer,
    "location": Long,
    "isActive": Boolean,
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
==============================================================================================================================================================

Описание REST адресов:

______________________________________________________________________________________________________________________________________________________________
Локации:
1 - localhost:8179/wtg/api/v1/locations                                 - Получаем все локации
2 - localhost:8179/wtg/api/v1/locations/1                               - Получаем локацию по Id
3 - localhost:8179/wtg/api/v1/locations/title?title=Скейт парк          - Получаем локацию по названию 
4 - localhost:8179/wtg/api/v1/locations/category_id/1                   - Получаем все локации по id категории (добавить категорию в локацию)
5 - localhost:8179/wtg/api/v1/locations/category_title?title=STORY      - Получаем все локации по названию категории (добавить категорию в локацию)
6 - localhost:8179/wtg/api/v1/locations/deleteLocationById/12           - Удаляем локации по id
7 - localhost:8179/wtg/api/v1/locations/createLocation?                  
                            title=13Локация&
                            description=описание полное&
                            fullDescription=описание полное&
                            address=Плющиха, 2&
                            latitude=10.0&
                            longitude=50.0)                             - Создаем локацию

______________________________________________________________________________________________________________________________________________________________
События:
1 - localhost:8179/wtg/api/v1/events                                    - Получаем все события
2 - localhost:8179/wtg/api/v1/events/1                                  - Получаем событие по id
3 - localhost:8179/wtg/api/v1/events
                /title?title=Ярмарка кубанских продуктов                - Получаем событие по названию
4 - localhost:8179/wtg/api/v1/events/category/1                         - Получаем все события по id категории
5 - localhost:8179/wtg/api/v1/events/category/title?title=STORY         - Получаем все события по наименованию категории
6 - localhost:8179/wtg/api/v1/events/created/user/4                     - Получаем все события по id создавших юзеров
7 - localhost:8179/wtg/api/v1/events
                /created/user/login?login=Gromoboy_333                  - Получаем все события по логину создавших юзеров

  - localhost:8179/wtg/api/v1/events/eventmodels                        - тестовый метод (можно удалить)
  - localhost:8179/wtg/api/v1/events/model/{id}                         - тестовый метод (можно удалить)

______________________________________________________________________________________________________________________________________________________________
Предложения (подборки):
1 - localhost:8179/wtg/api/v1/offers                                    -
2 - localhost:8179/wtg/api/v1/offers/category/{id}                      -
3 - localhost:8179/wtg/api/v1/offers/category_title                     -
4 - localhost:8179/wtg/api/v1/offers/createOffer                        -
5 - localhost:8179/wtg/api/v1/offers/deleteOfferById/{id}               -
6 - localhost:8179/wtg/api/v1/offers/title                              -
7 - localhost:8179/wtg/api/v1/offers/user_created/{id}                  -
8 - localhost:8179/wtg/api/v1/offers/user_created_login                 -
9 - localhost:8179/wtg/api/v1/offers/{id}                               -

______________________________________________________________________________________________________________________________________________________________
Маршруты:
1 - localhost:8179/wtg/api/v1/routes                                    -
2 - localhost:8179/wtg/api/v1/routes/category_id/{id}                   -
3 - localhost:8179/wtg/api/v1/routes/category_title                     -
4 - localhost:8179/wtg/api/v1/routes/createRoute                        -
5 - localhost:8179/wtg/api/v1/routes/deleteRouteById/{id}               -
6 - localhost:8179/wtg/api/v1/routes/title                              -
7 - localhost:8179/wtg/api/v1/routes/{id}                               -

______________________________________________________________________________________________________________________________________________________________
Пользователи:
localhost:8179/wtg/api/v1/users
localhost:8179/wtg/api/v1/users/createUser
localhost:8179/wtg/api/v1/users/deleteUserById/{id}
localhost:8179/wtg/api/v1/users/login/{login}
localhost:8179/wtg/api/v1/users/role_id/{id}
localhost:8179/wtg/api/v1/users/role_title
localhost:8179/wtg/api/v1/users/{id}

______________________________________________________________________________________________________________________________________________________________
Авторизация:
localhost:8179/wtg/login

______________________________________________________________________________________________________________________________________________________________
Регистрация:
localhost:8179/wtg/signup

==============================================================================================================================================================