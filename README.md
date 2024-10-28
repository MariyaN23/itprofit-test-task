# Тестовое задание itprofit

## Описание

В данном приложении есть форма и модальное окно.
ping API: https://itprofit-test-task-back.onrender.com/api/ping \
API code: https://github.com/MariyaN23/itprofit-test-task-back

## Функционал
- В форме есть обязательные для заполнения поля: имя, e-mail, телефон, сообщение
- При неправильном заполнении поля выводится текст ошибки, а также сообщение от сервера об ошибке
- При отправке формы идет запрос на API: https://itprofit-test-task-back.onrender.com/form
- При неудачном создании формы выводится сообщение "Error: Ошибка на сервере", форму можно отправить повторно
- При успешном создании формы выводится сообщение "Ваша заявка успешно отправлена", поля формы очищаются
- Кнопка "Модальное окно" открывает модальное окно с текстом

## Стили
Использовала SCSS