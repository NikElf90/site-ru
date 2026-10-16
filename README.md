# logispotio.ru — российская версия сайта Logispot

Статический сайт (RU + EN), без внешних CDN: шрифты и three.js лежат в `static/`.

## Выкладка
Каждый push в `main` → GitHub Actions копирует файлы на VPS (`.github/workflows/deploy.yml`).
Секреты репозитория (Settings → Secrets and variables → Actions):
- `SSH_HOST` — IP сервера
- `SSH_USER` — пользователь с правом записи в /var/www/logispotio.ru
- `SSH_KEY` — приватный ключ, созданный только для выкладки (публичная часть — в ~/.ssh/authorized_keys этого пользователя)

## Сервер
Конфиг nginx: `deploy/nginx-logispotio.ru.conf`. SSL: `sudo certbot --nginx -d logispotio.ru -d www.logispotio.ru`.

## Яндекс Метрика
Номер счётчика — в `window.LP_METRIKA_ID` в `index.html` и `en/index.html`. Загружается только после согласия в cookie-баннере.
