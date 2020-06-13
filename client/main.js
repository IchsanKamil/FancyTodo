let baseUrl = 'http://localhost:3000'

$(document).ready(function () {
    auth()    
});

function auth() {
    if (localStorage.token) {
        $('.login-page').hide()
        $('.home-page').show()
        $('.holidays-page').hide()
        $('.add-todo').hide()
        fetchTodos()
    } else {
        $('.login-page').show()
        $('.home-page').hide()
        $('.holidays-page').hide()
        $('.add-todo').hide()
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

function register(event) {
    event.preventDefault()
    let email = $('#emailRegister').val()
    let password = $('#passwordRegister').val()
    console.log(email, password, '<<<<<< tes');

    $.ajax({
        method: 'post',
        url: baseUrl + '/users/register',
        data: { email, password }
    })
        .done((data) => {
            $('#register-status').text('Successfully register ^^')
        })
        .fail(err => {
            $('#register-status').text(err.responseJSON.message)
        })
        .always(() => {
            $('#email').val('')
            $('#password').val('')
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

function myTodo() {
    auth()
}

function addTodo() {
    $('.login-page').hide()
    $('.home-page').hide()
    $('.add-todo').show()
    $.ajax({
        method: 'post',
        url: baseUrl + '/todos',
        headers: {
            token: localStorage.token
        }
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