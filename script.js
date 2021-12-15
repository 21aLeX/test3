// Вход
async function sentData() {
    let input = document.getElementById('login')
    let login = input.value;
    input = document.getElementById('password')
    let password = input.value;
    if (!login || !password){
        alert('введите логин\пароль!')
        input.focus();
    }
    let formData = new FormData()
    formData.append('set', login)
    formData.append('password', password)
    let result = fetch('php.php', { method: 'POST', body: formData })
    .then(function (response) {
        return response.text()
    })
    .then(function (body) {
        if(body != 'неверный логин или пароль'){
            document.location.href = 'lk.html'
            localStorage.setItem('id', body)
        }
        else alert(body)
    })

}

// Регистрация
async function regData() {
    let input = document.getElementById('login')
    let login = input.value;
    input = document.getElementById('password')
    let password = input.value;
    input = document.getElementById('fio')
    let fio = input.value;
    input = document.getElementById('email')
    let email = input.value;
    validateEmail(email)
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( re.test(String(email).toLowerCase())){
            if(!login || !password || !fio || !email){
                alert('заполните все поля')
            }
            else{
                let formData = new FormData();
                formData.append('login', login);
                formData.append('password', password);
                formData.append('fio', fio);
                formData.append('email', email);
                let result = fetch('php.php', { method: 'POST', body: formData })
                .then(function (response) {
                    return response.text()
                })
                .then(function (body) {
                    if(body != 'ошибка регистрации') {
                        document.location.href = 'lk.html'
                        localStorage.setItem('id', body)
                    }
                    else alert(body)
                })
            }
        }
        else alert('введите корректный email')
    }
}


// Получение данных на страницу кабинета
async function getData(){
    let id = localStorage.getItem('id')
    let formData = new FormData()
    formData.append('get',id)
    let result = fetch('php.php', { method: 'POST', body: formData })
    .then(function (response) {
        return response.text();
    })
    .then(function (body) {
        let arr = body.split(' ')
        document.getElementById('fio').value = arr[0]
        document.getElementById('password').value = arr[1]
        document.getElementById('login').innerHTML = arr[2]
        document.getElementById('email').innerHTML = arr[3]
    })
}


// Изменение данных на странице кабинета
async function fioPasswordSet(){
    input = document.getElementById('password')
    let password = input.value
    let id = localStorage.getItem('id')
    input = document.getElementById('fio')
    let fio = input.value
    let formData = new FormData()
    formData.append('fioSet',fio)
    formData.append('id',id) 
    formData.append('password',password)
    let result = fetch('php.php', { method: 'POST', body: formData })
    .then(function (response) {
        return response.text()
    })
    .then(function (body) {

    })
}

fetch('php.php');