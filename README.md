# fancy-todo
Membuat sebuah website fancy todo

| URL               | Method        |
| -------------     |:-------------:|
| /register         | POST          |
| /login            | POST          |
| /todos            | POST          |
| /todos            | GET           |
| /todos/:id        | GET           |
| /todos/:id        | PUT           |
| /todos/:id        | DELETE        |
| /publicHolidays   | GET           |

<br>

## /register
---
> Register new account
* method: POST
* request body: <br>
    ```json
    {
        "email": "ren@gmail.com",
        "password": "admin123",
    }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        {
            "id": 7,
            "email": "ren@gmail.com",
            "password": "$2a$10$vGDNHEv6eVd5t1m1z6Tske31y69h7xs346S7iwiKwwIo9d3T2vnDm"
        }
        ```
<br>

## /login
---
> Login into user account
* method: POST
* request body: <br>
    ```json
    {
        "email": "ren@gmail.com",
        "password": "********",
    }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        {
            "id": 7,
            "email": "ren@gmail.com",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImVtYWlsIjoicmVuQGdtYWlsLmNvbSIsImlhdCI6MTU5MjE4MDc5MX0.3P_VNWesK3gl_XGPos4JjUVpNQ-XybGpOQCprsKpFDc"
        }
        ```
<br>

## /todos
---
> Create new todo
* method: POST
* request header: <br>
    ```json
    {
        "token": <token>
    }
    ```
* request body: <br>
    ```json
    {
        "title": "Qianye Ying'er",
        "description": "Devil Queen",
        "due_date": "2020-06-18"
    }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        {
            "msg": "Todo successfully created",
            "data": {
                "id": 24,
                "title": "Qianye Ying'er",
                "description": "Devil Queen",
                "due_date": "2020-06-18",
                "UserId": 26,
                "updatedAt": "2020-06-13T09:20:35.951Z",
                "createdAt": "2020-06-13T09:20:35.951Z",
                "status": false
            }
        }
        ```
<br>

## /todos
---
> Show all todo
* method: GET
* request header: <br>
    ```json
        {
            "token": <token>
        }
        ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        [
            {
                "id": 23,
                "title": "Yun Che",
                "description": "Devil Master",
                "status": false,
                "due_date": "2020-06-18",
                "UserId": 26,
                "createdAt": "2020-06-13T09:19:19.943Z",
                "updatedAt": "2020-06-13T09:19:19.943Z"
            },
            {
                "id": 24,
                "title": "Qianye Ying'er",
                "description": "Devil Queen",
                "status": false,
                "due_date": "2020-06-18",
                "UserId": 26,
                "createdAt": "2020-06-13T09:20:35.951Z",
                "updatedAt": "2020-06-13T09:20:35.951Z"
            }
        ]
        ```
<br>

## /todos/:id
---
> Show todo based on ID
* method: GET
* request params: id <br>
* request header: <br>
    ```json
        {
            "token": <token>
        }
        ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        {
            "id": 24,
            "title": "Qianye Ying'er",
            "description": "Devil Queen",
            "status": false,
            "due_date": "2020-06-18",
            "UserId": 26,
            "createdAt": "2020-06-13T09:20:35.951Z",
            "updatedAt": "2020-06-13T09:20:35.951Z"
        }
        ```
<br>

## /todos/:id
---
> Edit todo based on ID
* method: PUT
* request params: id <br>
* request header: <br>
    ```json
        {
            "token": <token>
        }
        ```
* request body: <br>
    ```json
    {
        "title": "Qianye Ying'er",
        "description": "Devil Queen",
        "due_date": "2020-06-18"
    }
    ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        {
            "msg": "Todo successfully updated",
            "updateTodo": {
                "title": "edit api doc",
                "description": "edit api doc fancy todo",
                "status": "false"
            }
        }
        ```
<br>

## /todos/:id
---
> Delete todo based on ID
* method: DELETE
* request params: id <br>
* request header: <br>
    ```json
        {
            "token": <token>
        }
        ```
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        {
            "msg": "Todo successfully deleted",
            "deleteTodo": {
                "id": 24,
                "title": "edit api doc",
                "description": "edit api doc fancy todo",
                "status": false,
                "due_date": "2020-06-18",
                "UserId": 26,
                "createdAt": "2020-06-13T09:20:35.951Z",
                "updatedAt": "2020-06-15T00:58:32.045Z"
            }
        }
        ```
<br>

## /publicHolidays
---
> Get all public holidays in Indonesia
* method: GET
* success response: <br>
    * code: 200 <br>
    * content: <br>
        ```json
        [
            {
                "date": "2020-01-01",
                "localName": "Tahun Baru Masehi",
                "name": "New Year's Day",
                "countryCode": "ID",
                "fixed": true,
                "global": true,
                "counties": null,
                "launchYear": null,
                "type": "Public"
            },
            {
                "date": "2020-04-10",
                "localName": "Wafat Isa Almasih",
                "name": "Good Friday",
                "countryCode": "ID",
                "fixed": false,
                "global": true,
                "counties": null,
                "launchYear": null,
                "type": "Public"
            },
            {
                "date": "2020-04-12",
                "localName": "Paskah",
                "name": "Easter Sunday",
                "countryCode": "ID",
                "fixed": false,
                "global": true,
                "counties": null,
                "launchYear": null,
                "type": "Public"
            },
            {
                "date": "2020-05-01",
                "localName": "Hari Buruh Internasional",
                "name": "Labour Day",
                "countryCode": "ID",
                "fixed": true,
                "global": true,
                "counties": null,
                "launchYear": null,
                "type": "Public"
            },
            {
                "date": "2020-05-22",
                "localName": "Kenaikan Isa Almasih",
                "name": "Ascension Day",
                "countryCode": "ID",
                "fixed": false,
                "global": true,
                "counties": null,
                "launchYear": null,
                "type": "Public"
            },
            {
                "date": "2020-06-01",
                "localName": "Hari Lahir Pancasila",
                "name": "Pancasila Day",
                "countryCode": "ID",
                "fixed": true,
                "global": true,
                "counties": null,
                "launchYear": 2017,
                "type": "Public"
            },
            {
                "date": "2020-08-17",
                "localName": "Hari Ulang Tahun Kemerdekaan Republik Indonesia",
                "name": "Independence Day",
                "countryCode": "ID",
                "fixed": true,
                "global": true,
                "counties": null,
                "launchYear": null,
                "type": "Public"
            },
            {
                "date": "2020-12-25",
                "localName": "Hari Raya Natal",
                "name": "Christmas Day",
                "countryCode": "ID",
                "fixed": true,
                "global": true,
                "counties": null,
                "launchYear": null,
                "type": "Public"
            }
        ]
        ```
<br>