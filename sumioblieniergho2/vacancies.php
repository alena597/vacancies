<?php

header('Content-Type: application/json');

require_once 'data.php'; 

// Перетворюємо масив $vacancies у формат JSON і виводимо його для JS
echo json_encode($vacancies);

?>