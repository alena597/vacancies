document.addEventListener('DOMContentLoaded', () => {
    // Отримуємо посилання на ключові елементи
    const vacanciesContainer = document.getElementById('vacanciesContainer');
    const paginationContainer = document.getElementById('pagination');
    const filterForm = document.getElementById('filterForm');
    const globalSearchInput = document.getElementById('globalSearch');
    const searchAndFiltersSection = document.getElementById('searchAndFiltersSection');
    const selectedFiltersSection = document.getElementById('selectedFiltersSection');
    const selectedFiltersContainer = document.getElementById('selectedFiltersContainer');

    const vacanciesPerPage = 8;
    let currentPage = 1;

    // Зберігає всі завантажені вакансії
    let allVacancies = [];
    // Зберігає вакансії після застосування фільтрів
    let filteredVacancies = [];

    // Об'єкт для зберігання активних значень фільтрів
    let activeFilters = {
        department: [],
        level: [],
        education: [],
        city: [],
        salary: []
    };

    // Завантаження вакансій з vacancies.php
    async function fetchVacancies() {
        try {
             // Відправляємо запит до vacancies.php
            const response = await fetch('vacancies.php');
            const data = await response.json();
            allVacancies = data;
            // Застосовуємо фільтри та відображаємо вакансії
            applyFiltersAndRender();
        } catch (error) {
            console.error('Помилка завантаження вакансій:', error);
            vacanciesContainer.innerHTML = '<p class="error-message">Не вдалося завантажити вакансії. Спробуйте пізніше.</p>';
        }
    }

    // Функція для відображення вакансій на поточній сторінці
    function renderVacancies(vacs) {
        vacanciesContainer.innerHTML = '';
        // Визначаємо індекси початку та кінця для відображення вакансій на поточній сторінці
        const startIndex = (currentPage - 1) * vacanciesPerPage;
        const endIndex = startIndex + vacanciesPerPage;

        const vacanciesToDisplay = vacs.slice(startIndex, endIndex);

        if (vacanciesToDisplay.length === 0) {
            vacanciesContainer.innerHTML = '<p class="no-results-message">Вакансій за вашими критеріями не знайдено.</p>';
            return;
        }

        // Для кожної вакансії створюємо картку
        vacanciesToDisplay.forEach(vacancy => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');
            jobCard.innerHTML = `
                <h3>${vacancy.title}</h3>
                <div class="meta">
                    <p><strong>Рівень:</strong> ${vacancy.level}</p>
                    <p><strong>Освіта:</strong> ${vacancy.education}</p>
                    <p><strong>Місто:</strong> ${vacancy.city}</p>
                    <p><strong>Зарплата:</strong> ${vacancy.sal}</p>
                </div>
                <button class="details-button" data-id="${vacancy.id}">Деталі</button>
            `;
            // Додаємо картку до контейнера вакансій
            vacanciesContainer.appendChild(jobCard);
        });

         // Додаємо обробники подій для кнопок "Деталі" на кожній картці
        document.querySelectorAll('.details-button').forEach(button => {
            button.addEventListener('click', (event) => {
                // Переходимо на сторінку деталей вакансії
                const vacancyId = event.target.dataset.id;
                window.location.href = `vacancy-details.php?id=${vacancyId}`;
            });
        });
    }

    // Функція для відображення пагінації
    function renderPagination(totalVacancies) {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalVacancies / vacanciesPerPage);

        if (totalPages <= 1) {
            return;
        }

        // Створюємо кнопку "Попередня"
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Попередня';
        prevButton.disabled = currentPage === 1;
        // Обробник кліку для кнопки "Попередня"
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderVacancies(filteredVacancies);
            renderPagination(filteredVacancies.length);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(prevButton); // Додаємо кнопку до контейнера

        // Створюємо кнопки для кожної сторінки
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;

            if (i === currentPage) {
                pageButton.disabled = true;
            }

            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderVacancies(filteredVacancies);
                renderPagination(filteredVacancies.length);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageButton);
        }

        // Створюємо кнопку "Наступна"
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Наступна';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            currentPage++;
            renderVacancies(filteredVacancies);
            renderPagination(filteredVacancies.length);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(nextButton);
    }

    // видаляємо всі нецифрові символи і перетворюємо в число
    function parseSalary(salaryStr) {
        if (!salaryStr) return 0;
        return parseInt(salaryStr.replace(/\D/g, ''));
    }

    // Оновлення відображення обраних фільтрів
    function updateSelectedFiltersDisplay() {
        selectedFiltersContainer.innerHTML = ''; 
        let filtersApplied = false; 

        // Функція для отримання відображуваної назви фільтра
        const getFilterDisplayName = (filterType) => {
            switch (filterType) {
                case 'department': return 'Відділ';
                case 'level': return 'Рівень';
                case 'education': return 'Освіта';
                case 'city': return 'Місто';
                case 'salary': return 'Зарплата';
                default: return filterType;
            }
        };

        for (const type in activeFilters) {
            if (activeFilters[type] && activeFilters[type].length > 0) {
                filtersApplied = true;
                const filterDisplayName = getFilterDisplayName(type);
                const values = activeFilters[type].join(', '); 

                const filterItem = document.createElement('div');
                filterItem.classList.add('selected-filter-item');
                filterItem.innerHTML = `
                    <strong>${filterDisplayName}:</strong> ${values}
                    <button class="remove-filter-btn" data-filter-type="${type}" data-filter-value="${values}">✕</button>
                `;
                selectedFiltersContainer.appendChild(filterItem);
            }
        }

        // Відображаємо або приховуємо розділ "Обрані фільтри"
        if (filtersApplied || globalSearchInput.value.trim() !== '') {
            selectedFiltersSection.style.display = 'block';
        } else {
            selectedFiltersSection.style.display = 'none';
        }

        // Додаємо обробники подій для кнопок видалення фільтрів
        document.querySelectorAll('.remove-filter-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const filterType = event.target.dataset.filterType;
                const filterValueToRemove = event.target.dataset.filterValue; 

                const checkboxes = document.querySelectorAll(`input[name="${filterType}"]`);

                // Знімаємо вибір з відповідних чекбоксів
                activeFilters[filterType].forEach(activeVal => {
                    checkboxes.forEach(checkbox => {
                        if (checkbox.value === activeVal) {
                            checkbox.checked = false;
                        }
                    });
                });

                activeFilters[filterType] = [];

                if (filterType === 'globalSearch' && globalSearchInput.value.trim() !== '') {
                    globalSearchInput.value = '';
                }

                applyFiltersAndRender();
            });
        });

         // Додаємо елемент для глобального пошуку, якщо він активний
         if (globalSearchInput.value.trim() !== '') {
            filtersApplied = true;
            const searchItem = document.createElement('div');
            searchItem.classList.add('selected-filter-item');
            searchItem.innerHTML = `
                <strong>Пошук:</strong> ${globalSearchInput.value.trim()}
                <button class="remove-filter-btn" data-filter-type="globalSearch">✕</button>
            `;
            selectedFiltersContainer.appendChild(searchItem);
        }

        if (filtersApplied || globalSearchInput.value.trim() !== '') {
            selectedFiltersSection.style.display = 'block';
        } else {
            selectedFiltersSection.style.display = 'none';
        }
    }

    // Основна функція для застосування всіх фільтрів та оновлення відображення вакансій
    function applyFiltersAndRender() {
        const searchTerm = globalSearchInput.value.toLowerCase();

        // Фільтруємо всі вакансії
        filteredVacancies = allVacancies.filter(vacancy => {
            const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm) ||
                                 vacancy.description.toLowerCase().includes(searchTerm) ||
                                 vacancy.department.toLowerCase().includes(searchTerm) ||
                                 vacancy.city.toLowerCase().includes(searchTerm);

            const matchesDepartment = activeFilters.department.length === 0 || activeFilters.department.includes(vacancy.department);
            const matchesLevel = activeFilters.level.length === 0 || activeFilters.level.includes(vacancy.level);
            const matchesEducation = activeFilters.education.length === 0 || (Array.isArray(vacancy.education) ? activeFilters.education.some(edu => vacancy.education.includes(edu)) : activeFilters.education.includes(vacancy.education) );
            const matchesCity = activeFilters.city.length === 0 || activeFilters.city.includes(vacancy.city);
            const matchesSalary = activeFilters.salary.length === 0 || activeFilters.salary.some(range => {
                const vacancySalary = parseSalary(vacancy.sal);
                if (range === '0-15000') {
                    return vacancySalary > 0 && vacancySalary <= 15000;
                } else if (range === '15001-20000') {
                    return vacancySalary >= 15001 && vacancySalary <= 20000;
                } else if (range === '20001-25000') {
                    return vacancySalary >= 20001 && vacancySalary <= 25000;
                } else if (range === '25001-MAX') {
                    return vacancySalary >= 25001;
                }
                return false;
            });

            return matchesSearch && matchesDepartment && matchesLevel && matchesEducation && matchesCity && matchesSalary;
        });

        currentPage = 1;
        renderVacancies(filteredVacancies);
        renderPagination(filteredVacancies.length);
        updateSelectedFiltersDisplay(); 
    }

    // Обробники подій для випадаючих списків фільтрів
    document.querySelectorAll('.filter-dropdown .dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== this.nextElementSibling) {
                    menu.classList.remove('show');
                    menu.closest('.filter-dropdown').querySelector('.dropdown-toggle').classList.remove('active');
                }
            });
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('show');
        });
    });

    // Закриваємо випадаючі меню, якщо клікнути поза ними
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filter-dropdown') && !event.target.classList.contains('btn-validate')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
                menu.closest('.filter-dropdown').querySelector('.dropdown-toggle').classList.remove('active');
            });
        }
    });

    // Обробники для кнопок "Застосувати" у випадаючих списках фільтрів
    document.querySelectorAll('.btn-validate').forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filterType;
            const parentMenu = button.closest('.dropdown-menu');
            const checkboxes = parentMenu.querySelectorAll(`input[name="${filterType}"]:checked`);

            activeFilters[filterType] = Array.from(checkboxes).map(cb => cb.value);

            parentMenu.classList.remove('show');
            parentMenu.closest('.filter-dropdown').querySelector('.dropdown-toggle').classList.remove('active');

            applyFiltersAndRender();
        });
    });

    // Обробник відправки форми
    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        applyFiltersAndRender();
    });

    // Обробник для скидання фільтрів
    filterForm.addEventListener('reset', () => {
        globalSearchInput.value = '';

        document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        activeFilters.department = [];
        activeFilters.level = [];
        activeFilters.education = [];
        activeFilters.city = [];
        activeFilters.salary = [];

        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
            menu.closest('.filter-dropdown').querySelector('.dropdown-toggle').classList.remove('active');
        });

        applyFiltersAndRender(); 
    });

    globalSearchInput.addEventListener('input', () => {
        updateSelectedFiltersDisplay();
    });


    fetchVacancies();

    
});