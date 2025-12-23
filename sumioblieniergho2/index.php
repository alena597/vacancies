<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вакансії Сумиобленерго</title>

    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="icon2.png" type="image/png">

    <style>
        .visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
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
            <button type="button" onclick="alert('Ця функція поки недоступна!')">
                Авторизація
            </button>
            <button type="button" onclick="alert('Ця функція поки недоступна!')">
                Реєстрація
            </button>
        </div>
    </div>
</header>

<main class="container">

    <h1 class="page-title">Вакансії Сумиобленерго</h1>

    <section id="searchAndFiltersSection" class="search-and-filters-enedis">
        <form id="filterForm" class="enedis-search-form">

            <div class="search-input-wrapper">
                <label for="globalSearch" class="visually-hidden">
                    Пошук вакансій
                </label>

                <input
                    type="text"
                    id="globalSearch"
                    name="globalSearch"
                    placeholder="Шукати посаду, відділ..."
                    class="global-search-input"
                >

                <button
                    type="submit"
                    class="search-button"
                    aria-label="Пошук вакансій"
                >
                    <svg viewBox="0 0 24 24" width="24" height="24"
                         stroke="currentColor" stroke-width="2"
                         fill="none" stroke-linecap="round"
                         stroke-linejoin="round"
                         aria-hidden="true">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>

            <div class="filter-options-bar">

                <div class="filter-dropdown">
                    <button type="button" class="dropdown-toggle" data-filter-type="department">
                        Відділ <span class="arrow-icon"></span>
                    </button>

                    <div class="dropdown-menu">
                        <fieldset>
                            <legend>Вибір відділу</legend>
                            <ul class="checkbox-list">
                                <li><label><input type="checkbox" name="department" value="Юридичний відділ"> Юридичний відділ</label></li>
                                <li><label><input type="checkbox" name="department" value="Відділ охорони праці"> Відділ охорони праці</label></li>
                                <li><label><input type="checkbox" name="department" value="Експлуатаційний відділ"> Експлуатаційний відділ</label></li>
                                <li><label><input type="checkbox" name="department" value="Відділ IT"> Відділ IT</label></li>
                                <li><label><input type="checkbox" name="department" value="Диспетчерська служба"> Диспетчерська служба</label></li>
                                <li><label><input type="checkbox" name="department" value="Відділ збуту"> Відділ збуту</label></li>
                                <li><label><input type="checkbox" name="department" value="Адміністративний відділ"> Адміністративний відділ</label></li>
                                <li><label><input type="checkbox" name="department" value="Ремонтний цех"> Ремонтний цех</label></li>
                                <li><label><input type="checkbox" name="department" value="Транспортний цех"> Транспортний цех</label></li>
                            </ul>
                        </fieldset>

                        <button type="button" class="btn-validate" data-filter-type="department">
                            Застосувати
                        </button>
                    </div>
                </div>

                <div class="filter-dropdown">
                    <button type="button" class="dropdown-toggle" data-filter-type="level">
                        Рівень <span class="arrow-icon"></span>
                    </button>

                    <div class="dropdown-menu">
                        <fieldset>
                            <legend>Рівень кваліфікації</legend>
                            <ul class="checkbox-list">
                                <li><label><input type="checkbox" name="level" value="Початківець"> Початківець</label></li>
                                <li><label><input type="checkbox" name="level" value="Спеціаліст"> Спеціаліст</label></li>
                                <li><label><input type="checkbox" name="level" value="Досвідчений"> Досвідчений</label></li>
                            </ul>
                        </fieldset>

                        <button type="button" class="btn-validate" data-filter-type="level">
                            Застосувати
                        </button>
                    </div>
                </div>

                <div class="filter-dropdown">
                    <button type="button" class="dropdown-toggle" data-filter-type="education">
                        Освіта <span class="arrow-icon"></span>
                    </button>

                    <div class="dropdown-menu">
                        <fieldset>
                            <legend>Рівень освіти</legend>
                            <ul class="checkbox-list">
                                <li><label><input type="checkbox" name="education" value="Вища"> Вища</label></li>
                                <li><label><input type="checkbox" name="education" value="Середня спеціальна"> Середня спеціальна</label></li>
                                <li><label><input type="checkbox" name="education" value="Професійно-технічна"> Професійно-технічна</label></li>
                                <li><label><input type="checkbox" name="education" value="Посвідчення водія В-С"> Посвідчення водія В-С</label></li>
                            </ul>
                        </fieldset>

                        <button type="button" class="btn-validate" data-filter-type="education">
                            Застосувати
                        </button>
                    </div>
                </div>

                <div class="filter-dropdown">
                    <button type="button" class="dropdown-toggle" data-filter-type="city">
                        Місто <span class="arrow-icon"></span>
                    </button>

                    <div class="dropdown-menu">
                        <fieldset>
                            <legend>Місто роботи</legend>
                            <ul class="checkbox-list">
                                <li><label><input type="checkbox" name="city" value="Суми"> Суми</label></li>
                                <li><label><input type="checkbox" name="city" value="Конотоп"> Конотоп</label></li>
                                <li><label><input type="checkbox" name="city" value="Ямпіль"> Ямпіль</label></li>
                                <li><label><input type="checkbox" name="city" value="Шостка"> Шостка</label></li>
                                <li><label><input type="checkbox" name="city" value="Путивль"> Путивль</label></li>
                                <li><label><input type="checkbox" name="city" value="Краснопілля"> Краснопілля</label></li>
                                <li><label><input type="checkbox" name="city" value="Охтирка"> Охтирка</label></li>
                                <li><label><input type="checkbox" name="city" value="Ромни"> Ромни</label></li>
                                <li><label><input type="checkbox" name="city" value="Глухів"> Глухів</label></li>
                                <li><label><input type="checkbox" name="city" value="Грунь"> Грунь</label></li>
                            </ul>
                        </fieldset>

                        <button type="button" class="btn-validate" data-filter-type="city">
                            Застосувати
                        </button>
                    </div>
                </div>

                <div class="filter-dropdown">
                    <button type="button" class="dropdown-toggle" data-filter-type="salary">
                        Зарплата <span class="arrow-icon"></span>
                    </button>

                    <div class="dropdown-menu">
                        <fieldset>
                            <legend>Рівень заробітної плати</legend>
                            <ul class="checkbox-list">
                                <li><label><input type="checkbox" name="salary" value="0-15000"> До 15000 грн</label></li>
                                <li><label><input type="checkbox" name="salary" value="15001-20000"> 15000 – 20000 грн</label></li>
                                <li><label><input type="checkbox" name="salary" value="20001-25000"> 20000 – 25000 грн</label></li>
                                <li><label><input type="checkbox" name="salary" value="25001-MAX"> Понад 25000 грн</label></li>
                            </ul>
                        </fieldset>

                        <button type="button" class="btn-validate" data-filter-type="salary">
                            Застосувати
                        </button>
                    </div>
                </div>

                <div class="filter-reset-button">
                    <button type="reset" class="reset-filters-btn">
                        <span class="reset-icon" aria-hidden="true">✕</span>
                        Скинути фільтри
                    </button>
                </div>

            </div>
        </form>
    </section>

    <section id="selectedFiltersSection" class="selected-filters-section" style="display:none;">
        <h2>Обрані фільтри</h2>
        <div id="selectedFiltersContainer" class="selected-filters-container"></div>
    </section>

    <section class="vacancies-section">
        <h2>Актуальні вакансії</h2>
        <div id="vacanciesContainer" class="vacancies-grid"></div>
        <div class="pagination" id="pagination"></div>
    </section>

</main>

<footer>
    <div class="container">
        <p>&copy; 2025 Сумиобленерго. Усі права захищені.</p>
    </div>
</footer>

<script src="script.js"></script>

</body>
</html>
