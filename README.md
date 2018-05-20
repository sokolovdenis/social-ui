# Задание по фронтенду №1

Необходимо реализовать с использованием HTML и CSS интерфейс социальной сети.
Дизайн интерфейса необходимо придумать самостоятельно.

Функциональные возможности интерфейса:
1. Регистрация. Поля для заполнения: почта, пароль, имя, дата рождения.
2. Вход. Поля для заполнения: почта, пароль, чекбокс "запомнить".
3. Просмотр профиля любого пользователя. Профиль включает: имя, возвраст, аватар, инфо, количество подписок и подписчиков.
4. Редактирование своего профиля. Поля для редактирования: имя, дата рождения, аватар, инфо.
5. Публикация нового поста. Пост может содержать картинку.
6. Просмотр своей ленты, состоящей из постов пользователей, на которых вы подписаны.
7. Просмотр постов любого пользователя.
8. Просмотр списка всех пользователей.
9. Подписка на пользователя.



# Задание по фронтенду №2

Необходимо написать фронтенд социальной сети.

Библиотеки, которые нужно использовать:
* https://reactjs.org/

## REST API

http://social-webapi.azurewebsites.net/swagger/

Техподдержка 24/7 в Telegram.

## Аутентификация

Результатом вызова методов signup и signin является объект с полем token.
Подробнее об этих токенах: https://jwt.io/

При вызове всех остальных методов нужно подставлять полученный токен в заголовки запроса:
```
Authorization: Bearer eyJhbGciOiJ
```

## Критерии приёмки

Для высшего балла необходимо продемонстрировать каждый пункт из задания №1.
