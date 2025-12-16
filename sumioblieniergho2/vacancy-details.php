<?php

header('Content-Type: text/html; charset=UTF-8');

require_once 'data.php'; 


$vacancy = null; // Змінна для вакансії

// Перевіряємо, чи був переданий параметр 'id' у URL-адресі
if (isset($_GET['id'])) {
    $vacancyId = (int)$_GET['id'];
    foreach ($vacancies as $v) {
        if ($v['id'] === $vacancyId) {
            $vacancy = $v;
            break; 
        }
    }
}

?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $vacancy ? htmlspecialchars($vacancy['title']) : 'Вакансія не знайдена'; ?> - Сумиобленерго</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="icon2.png" type="image/png">
    <style>
        /* Стилі для картки деталей вакансії */
        .vacancy-details-card {
            background-color: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin: 40px auto;
            max-width: 800px;
            text-align: left;
        }
        /* Стилі для заголовка вакансії */
        .vacancy-details-card h1 {
            color: #32559E;
            margin-top: 0;
            font-size: 2em;
            margin-bottom: 20px;
            border-bottom: 2px solid #a0c5ed;
            padding-bottom: 10px;
        }
        /* Стилі для параграфів з інформацією про вакансію */
        .vacancy-details-card p {
            font-size: 1.1em;
            margin-bottom: 10px;
            color: #444;
        }
        /* Стилі для жирного тексту (назви полів) */
        .vacancy-details-card p strong {
            color: #0056b3;
        }
        /* Стилі для секції опису вакансії */
        .vacancy-details-card .description {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #eee;
        }
        /* Контейнер для кнопок "Повернутися" та "Відгукнутися" */
        .buttons-container {
            display: flex;
            gap: 15px; 
            margin-top: 30px;
            justify-content: flex-start;
            flex-wrap: wrap; 
        }
        /* Загальні стилі для кнопок "Повернутися" та "Відгукнутися" */
        .back-button, .apply-button { 
            display: inline-block;
            background-color: #32559E;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            text-decoration: none; 
            transition: background-color 0.3s ease;
        }
         .back-button:hover, .apply-button:hover {
            background-color: #0056b3;
        }
        .apply-button {
            background-color: #28a745;
        }
        .apply-button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <header>
        <div class="container header-content">
            <a href="/">
                <img src="icon.png" alt="Логотип Сумиобленерго" class="logo">
            </a>
            <div class="auth-buttons">
                <button onclick="alert('Ця функція поки недоступна!')">Авторизація</button>
                <button onclick="alert('Ця функція поки недоступна!')">Реєстрація</button>
            </div>
        </div>
    </header>

    <main class="container">
        <?php if ($vacancy): ?>
            <div class="vacancy-details-card">
                <h1><?php echo htmlspecialchars($vacancy['title']); ?></h1>
                <p><strong>Відділ:</strong> <?php echo htmlspecialchars($vacancy['department']); ?></p>
                <p><strong>Рівень:</strong> <?php echo htmlspecialchars($vacancy['level']); ?></p>
                <p><strong>Освіта:</strong> <?php echo htmlspecialchars($vacancy['education']); ?></p>
                <p><strong>Опубліковано:</strong> <?php echo htmlspecialchars($vacancy['published_date']); ?></p>
                <p><strong>Місто:</strong> <?php echo htmlspecialchars($vacancy['city']); ?></p>
                <p><strong>Зарплата:</strong> <?php echo htmlspecialchars($vacancy['sal']); ?></p>
                <div class="description">
                    <p><strong>Опис:</strong></p>
                    <p><?php echo nl2br(htmlspecialchars($vacancy['description'])); ?></p>
                </div>
                <div class="buttons-container">
                    <a href="index.php" class="back-button">Повернутися до вакансій</a>
                    <button class="apply-button" onclick="alert('Функціонал відгуку поки не реалізовано.')">Відгукнутися</button>
                </div>
            </div>
        <?php else: ?>
            <div class="vacancy-details-card">
                <h1>Вакансія не знайдена</h1>
                <p>На жаль, вакансію з таким ідентифікатором не знайдено.</p>
                <a href="index.php" class="back-button">Переглянути всі вакансії</a>
            </div>
        <?php endif; ?>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Сумиобленерго. Усі права захищені.</p>
        </div>
    </footer>
</body>
</html>