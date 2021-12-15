<?php

// Подключение к бд
$servername = "localhost";
$username = "root";
$password = "";
$dbname ="one";
$conn = mysqli_connect($servername, $username, $password, $dbname);


// Регистрация
if(isset( $_POST['fio'])){
    if (!$conn) {
        echo ( 'Ошибка подключения');
        exit();
    }
    $login = $_POST['login'];
    $value = mysqli_query($conn, "SELECT id FROM users WHERE login = '$login'");
    $com_pol = mysqli_fetch_row($value);
    $value ->close();
    if($com_pol[0]){
        echo 'пользователь с таким логином уже есть';
    }
    else{
        $pass = $_POST['password'];
        $fio = $_POST['fio'];
        $email = $_POST['email'];
        $qweri = mysqli_query($conn, "INSERT INTO users (login,password,fio,email)  VALUES ('$login', '$pass', '$fio', '$email') ");          
        $value = mysqli_query($conn, "SELECT id FROM users WHERE login = '$login'and password = '$pass'");
        $com_pol = mysqli_fetch_row($value);
        $value ->close();             
        if(!$qweri){
            echo 'ошибка регистрации';
        }
        else echo $com_pol[0];
    }
}
    

// Вход
if(isset($_POST['set'])){
    if (!$conn) {
        echo ( 'Ошибка подключения');
        exit();   
    }
    $login = $_POST['set'];
    $pass = $_POST['password'];
    $value = mysqli_query($conn, "SELECT id FROM users WHERE login = '$login'and password = '$pass'");
    $com_pol = mysqli_fetch_row($value);
    $value ->close();     
    if($com_pol[0] == null){
        echo 'неверный логин или пароль';
    }
    else echo $com_pol[0];
}

// Получение данных на страницу кабинета
if(isset($_POST['get'])){
    if (!$conn) {
        echo ( 'Ошибка подключения');
        exit();
    }
    $id = $_POST['get'];
    $value = mysqli_query($conn, "SELECT fio, password,login,email FROM users WHERE id = '$id'");
    $com_pol = mysqli_fetch_row($value);
    $value ->close();
    echo $com_pol[0].' '.$com_pol[1].' '.$com_pol[2].' '.$com_pol[3];
}

// Изменение данных на странице кабинета
if(isset( $_POST['fioSet'])){
    if (!$conn) {
        echo ( 'Ошибка подключения');
        exit();
    }
    $fio = $_POST['fioSet'];
    $id= $_POST['id'];
    $pass= $_POST['password'];
    $qweri = mysqli_query($conn,"UPDATE users SET fio = '$fio' , password = '$pass'  WHERE id = '$id'" );
    echo $fio;
}

?>