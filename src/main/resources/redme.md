Схемы JSON

LocationDTO:

{
    "id": Long,
    "title": String",
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

Описание REST адресов:
Локации:
1 - localhost:8179/wtg/api/v1/locations                                 - получаем все локации
2 - localhost:8179/wtg/api/v1/locations/1                               - получаем локацию по Id
3 - localhost:8179/wtg/api/v1/locations/title?title=Скейт парк          - получаем локацию по названию 
4 - localhost:8179/wtg/api/v1/locations/category_id/1                   - получаем все локации по id категории (добавить категорию в локацию)
5 - localhost:8179/wtg/api/v1/locations/category_title?title=STORY      - получаем все локации по названию категории (добавить категорию в локацию)
6 - localhost:8179/wtg/api/v1/locations/deleteLocationById/12           - удаляем локации по id
7 - localhost:8179/wtg/api/v1/locations/createLocation?                  
                            title=ку&
                            description=ахаххахахаха&
                            fullDescription=бугагагаггагагагагаг&   
                            address=плющиха 2&
                            latitude=10.0&
                            longitude=50.0                          - создаем локацию


События:
1 - localhost:8179/wtg/api/v1/events                                                       -
2 - localhost:8179/wtg/api/v1/events/category/{id}                                         -
3 - localhost:8179/wtg/api/v1/events/category_title                                        -
4 - localhost:8179/wtg/api/v1/events/eventmodels                                           -
5 - localhost:8179/wtg/api/v1/events/model/{id}                                            -
6 - localhost:8179/wtg/api/v1/events/title                                                 -
7 - localhost:8179/wtg/api/v1/events/user_created/{id}                                     -
8 - localhost:8179/wtg/api/v1/events/user_created_login                                    -
9 - localhost:8179/wtg/api/v1/events/{id}                                                  -


События:
1 - localhost:8179/wtg/api/v1/offers
2 - localhost:8179/wtg/api/v1/offers/category/{id}
3 - localhost:8179/wtg/api/v1/offers/category_title
4 - localhost:8179/wtg/api/v1/offers/createOffer
5 - localhost:8179/wtg/api/v1/offers/deleteOfferById/{id}
6 - localhost:8179/wtg/api/v1/offers/title
7 - localhost:8179/wtg/api/v1/offers/user_created/{id}
8 - localhost:8179/wtg/api/v1/offers/user_created_login
9 - localhost:8179/wtg/api/v1/offers/{id}


Маршруты:
1 - localhost:8179/wtg/api/v1/routes
2 - localhost:8179/wtg/api/v1/routes/category_id/{id}
3 - localhost:8179/wtg/api/v1/routes/category_title
4 - localhost:8179/wtg/api/v1/routes/createRoute
5 - localhost:8179/wtg/api/v1/routes/deleteRouteById/{id}
6 - localhost:8179/wtg/api/v1/routes/title
7 - localhost:8179/wtg/api/v1/routes/{id}


Пользователи:
localhost:8179/wtg/api/v1/users
localhost:8179/wtg/api/v1/users/createUser
localhost:8179/wtg/api/v1/users/deleteUserById/{id}
localhost:8179/wtg/api/v1/users/login/{login}
localhost:8179/wtg/api/v1/users/role_id/{id}
localhost:8179/wtg/api/v1/users/role_title
localhost:8179/wtg/api/v1/users/{id}


Авторизация:
localhost:8179/wtg/login


Регистрация:
localhost:8179/wtg/signup