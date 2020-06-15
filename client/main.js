let baseUrl = 'http://localhost:3000'
let todoCurrentId;

$(document).ready(function () {
    auth()
});

function auth() {
    if (localStorage.token) {
        $('.login-page').hide()
        $('.register-page').hide()
        $('.home-page').show()
        $('.holidays-page').hide()
        $('.add-todo').hide()
        $('.edit-todo').hide()
        fetchTodos()
    } else {
        $('.login-page').show()
        $('.register-page').hide()
        $('.home-page').hide()
        $('.holidays-page').hide()
        $('.add-todo').hide()
        $('.edit-todo').hide()
    }
}

function login(event) {
    event.preventDefault()
    let email = $('#email').val()
    let password = $('#password').val()

    $.ajax({
        method: 'post',
        url: baseUrl + '/login',
        data: { email, password }
    })
        .done((data) => {
            localStorage.setItem('token', data.token)
            auth()
        })
        .fail(err => {
            console.log(err.responseJSON);
        })
        .always(() => {
            $('#email').val('')
            $('#password').val('')
        })
}

function logout() {
    localStorage.clear()
    auth()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function registerForm() {
    $('.login-page').hide()
    $('.home-page').hide()
    $('.add-todo').hide()
    $('.register-page').show()
}

function register(event) {
    event.preventDefault()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()

    $.ajax({
        method: 'post',
        url: baseUrl + '/register',
        data: { email, password }
    })
        .done((data) => {
            console.log(data, '<<<<<<< data register');
            auth()
        })
        .fail(err => {
            console.log(err, 'err register');
        })
        .always(() => {
            $('#emailRegister').val('')
            $('#passwordRegister').val('')
        })
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token);
    auth()
    $.ajax({
        method: 'post',
        url: baseUrl + '/googleSign',
        data: { id_token }
    })
        .done(data => {
            console.log(data, '<<<<< data googleSignIn');
            localStorage.setItem('token', data.data.token)
            auth()
        })
        .fail(err => {
            console.log('ini error >>>> ', err.responseJSON);
        })
}

function addTodoForm() {
    $('.login-page').hide()
    $('.home-page').hide()
    $('.add-todo').show()
}

function addTodo(event) {
    event.preventDefault()
    let title = $('#title').val()
    let description = $('#description').val()
    let due_date = $('#due_date').val()

    $.ajax({
        method: 'post',
        url: baseUrl + '/todos',
        headers: {
            token: localStorage.token
        },
        data: { title, description, due_date }
    })
        .done((data) => {
            console.log(data, 'success add');
            auth()
        })
        .fail(err => {
            console.log(err.responseJSON, '<<<<< err addTodo');
        })
        .always(() => {
            $('#title').val('')
            $('#description').val('')
            $('#due_date').val('')
        })
}

function editTodoForm(id) {
    todoCurrentId = id;
    $.ajax({
        method: 'get',
        url: baseUrl + `/todos/${id}`,
        headers: {
            token: localStorage.token
        }
    })
        .done((data) => {
            $('.login-page').hide()
            $('.home-page').hide()
            $('.edit-todo').show()
            $('#titleEdit').val(data.title)
            $('#descriptionEdit').val(data.description)
            $('#due_dateEdit').val(data.due_date)
        })
        .fail(err => {
            console.log(err.responseJSON, '<<<<< err addTodo');
        })
}

function updateTodo(event) {
    event.preventDefault()
    let title = $('#titleEdit').val()
    let description = $('#descriptionEdit').val()
    let due_date = $('#due_dateEdit').val()

    $.ajax({
        method: 'put',
        url: baseUrl + `/todos/${todoCurrentId}`,
        headers: {
            token: localStorage.token
        },
        data: { title, description, due_date }
    })
        .done((data) => {
            auth()
        })
        .fail(err => {
            console.log(err.responseJSON, '<<<<< err updateTodo');
        })
}

function deleteTodo(id) {
    $.ajax({
        method: 'delete',
        url: baseUrl + `/todos/${id}`,
        headers: {
            token: localStorage.token
        }
    })
        .done((data) => {
            console.log(data, 'success add');
            fetchTodos()
        })
        .fail(err => {
            console.log(err.responseJSON, '<<<<< err addTodo');
        })
}

function fetchTodos() {
    $.ajax({
        method: 'get',
        url: baseUrl + '/todos',
        headers: {
            token: localStorage.token
        }
    })
        .done(data => {
            $('.table-data').empty()
            data.forEach((todo, i) => {
                $('.table-data').append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${todo.title} </td>
                    <td>${todo.description}</td>
                    <td>${todo.status}</td>
                    <td>${todo.due_date}</td>
                    <th>
                        <a href="#" class="btn btn-outline-primary btn-sm" onclick="editTodoForm(${todo.id})">Edit</a>
                        <a href="#" class="btn btn-outline-danger btn-sm" onclick="return confirm('Are you sure to delete this todo ?'); deleteTodo(${todo.id})">Delete</a>
                    </th>
                </tr>
                `)
            });
        })
        .fail(err => {
            console.log(err, '<<< err fetchTodos');
        })
}

function fetchPublicHolidays() {
    $('.login-page').hide()
    $('.home-page').hide()
    $('.add-todo').hide()
    $('.edit-todo').hide()
    $('.holidays-page').show()
    $.ajax({
        method: 'get',
        url: baseUrl + '/publicHolidays',
    })
        .done(data => {
            $('.table-data-holidays').empty()
            data.forEach((day, i) => {
                $('.table-data-holidays').append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${day.date} </td>
                    <td>${day.name}</td>
                    <td>${day.localName}</td>
                </tr>
                `)
            });
        })
        .fail(err => {
            console.log(err, '<<< err holidays');
        })
}