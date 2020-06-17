# fancy-todo
Fancy Todo is an application to manage your todo list. This app has :<br>
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

| URL               | Method        |
| -------------     |:-------------:|
| /register         | POST          |
| /login            | POST          |
| /googleSign       | POST          |
| /todos            | POST          |
| /todos            | GET           |
| /todos/:id        | GET           |
| /todos/:id        | PUT           |
| /todos/:id        | DELETE        |
| /publicHolidays   | GET           |

<br>

## RESTful endpoints
### POST /register
> Register new account

_Request Body_
```json
{
    "email": "<your email>",
    "password": "<your password>",
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Email can't be empty, Email already exist, Password must be between 7 & 20 characters"
}
```
_Response (500 - Internal Server Error)_
```json
{
    "message": "Internal server error"
}
```
---
### POST /login
> Login using user account

_Request Body_
```json
{
    "email": "<your email>",
    "password": "<your password>",
}
```
_Response (200 - Ok)_
```
{
    "id": <given id by system>,
    "email": "<posted email>",
    "token": "<your token>"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Email/Password not match"
}
```
_Response(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### POST /googleSign
> Login with google account

_Request Body_
```
{
    "id_token": "<token from google>"
}
```
_Response (200 - Ok)_
```
{
    "id": <given id by system>,
    "email": "<posted email>",
    "token": "<your token>"
}
```
_Re sponse(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### POST /todos
> Create new todo

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Request Body_
```json
{
    "title": "todo title",
    "description": "todo description",
    "due_date": "2020-06-18"
}
```
_Response (201 - Created)_
```json
{
    "id": 1,
    "title": "todo title",
    "description": "todo description",
    "due_date": "2020-06-18",
    "UserId": 1,
    "updatedAt": "2020-06-13T09:20:35.951Z",
    "createdAt": "2020-06-13T09:20:35.951Z",
    "status": false
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Tittle can't be empty, Date must be greater than today"
}
```
_Re sponse(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### GET /todos
> Show all todo

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - Ok)_
```json
[
    {
        "id": 1,
        "title": "todo title",
        "description": "todo description",
        "status": false,
        "due_date": "2020-06-18",
        "UserId": 1,
        "createdAt": "2020-06-13T09:20:35.951Z",
        "updatedAt": "2020-06-13T09:20:35.951Z"
    },
    {
        "id": 2,
        "title": "Qianye Ying'er",
        "description": "Devil Queen",
        "status": false,
        "due_date": "2020-06-18",
        "UserId": 1,
        "createdAt": "2020-06-13T09:20:35.951Z",
        "updatedAt": "2020-06-13T09:20:35.951Z"
    }
]
```
_Re sponse(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### GET /todos/:id
> Show todo based on ID

_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - Ok)_
```json
{
    "id": 1,
    "title": "todo title",
    "description": "todo description",
    "due_date": "2020-06-18",
    "UserId": 1,
    "updatedAt": "2020-06-13T09:20:35.951Z",
    "createdAt": "2020-06-13T09:20:35.951Z",
    "status": false
}
```
_Response (404 - Not Found)_
```json
{
    "message": "not found"
}
```
_Re sponse(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### PUT /todos/:id
> Edit todo based on ID

_Request Params_
```json
{
    "id": "<your id>"
}
```
_Request Header_
```json
{
    "token": "<your token>"
}
```
_Request Body_
```json
{
    "title": "todo title 2",
    "description": "todo description 2",
    "due_date": "2020-06-19"
}
```
_Response (201 - Updated)_
```json
{
    "title": "todo title 2",
    "description": "todo description 2",
    "due_date": "2020-06-19"
}
```
_Response (400 - Bad Request)_
```json
{
    "message": "Title can't be empty, Date must be greater than today"
}
```
_Re sponse(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### DELETE /todos/:id
> Delete todo based on ID

_Request Params_
```json
{
    "id": "<your id>"
}
```
_Request Header_
```json
{
    "token": "<your token>"
}
```
_Response (200 - oK)_
```json
{
    "message": "Todo successfully deleted"
}
```
_Re sponse(500 - Error Server)_

```json
{
    "message": "Internal Server Error",
}
```
---
### GET /publicHolidays
> Get all public holidays in Indonesia

_Response (200 - Ok)_
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
    ...
]
```