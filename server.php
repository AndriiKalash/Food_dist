<?php 
//чтоб получить данные в формате json , нкжно их декодировать для php
$_POST = json_decode(file_get_contents("php://input"), true);

echo var_dump($_POST);