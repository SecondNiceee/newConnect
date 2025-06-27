
## Запуск

1. Установите зависимости:
   npm install

2. Создайте файл `.env` и укажите параметры подключения к БД и JWT:
   ```env
    PORT=7001
    POSTGRES_HOST=localhost
    POSTGRES_USER = postgres
    POSTGRES_DB = promocodes
    POSTGRES_PASSWORD = 11559966332211kkKK
    POSTGRES_PORT = 5432
    SECRET_KEY = somesecretkeykqweqwcA
    FRONTEND_MAIN_URL=http://localhost:3000
    FRONTEND_EXTRA_URL=http://localhost:3001
    X_API_KEY=SOME_UR_KEY

   ```
3. Запустите сервер:
   ```bash
   npm run start:dev
   ```

## Swagger (Документация API)

После запуска перейдите по адресу:
```
/docs
```

## Авторизация и API-KEY
- Для защищённых эндпоинтов требуется заголовок:
  - `X-API-KEY:`
- Для авторизации используйте эндпоинт `/auth/login` (POST):
  - **Body:** `{ "login": "user", "password": "pass" }`
  - В ответе устанавливается httpOnly cookie `jwt`.
- Для выхода используйте `/auth/logout` (POST).

## Промокоды
- **Получить все промокоды пользователя:**
  - `GET /promocodes/findByUserId`
  - Требуется: `X-API-KEY: hi`, JWT (cookie)
  - **Query:** не требуется
- **Получить все промокоды:**
  - `GET /promocodes/findAll`
  - Требуется: `X-API-KEY: hi`
  - **Query:** не требуется
- **Создать промокод:**
  - `POST /promocodes/create`
  - Требуется: `X-API-KEY: hi`, JWT (cookie)
  - **Body:** `{ "code": "PROMO2024", "description": "Описание", "ownerId": 1 }`
- **Увеличить sales у промокода:**
  - `POST /promocodes/implemetSales?promocodeId=1`
  - Требуется: `X-API-KEY: hi`, JWT (cookie)
  - **Query:** `promocodeId` (например, `?promocodeId=1`)

## Роли
- При создании пользователя автоматически присваивается роль USER.
- Пользователь может иметь несколько ролей.

## Пример curl-запроса
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: hi" \
  -d '{"login":"user","password":"pass"}'
```

---

**Вся структура и примеры доступны в Swagger!**
