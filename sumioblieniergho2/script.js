document.addEventListener('DOMContentLoaded', () => {
    const vacanciesContainer = document.getElementById('vacanciesContainer');
    const paginationContainer = document.getElementById('pagination');
    const filterForm = document.getElementById('filterForm');
    const globalSearchInput = document.getElementById('globalSearch');
    const searchAndFiltersSection = document.getElementById('searchAndFiltersSection');
    const selectedFiltersSection = document.getElementById('selectedFiltersSection');
    const selectedFiltersContainer = document.getElementById('selectedFiltersContainer');

    const vacanciesPerPage = 8;
    let currentPage = 1;

    let allVacancies = [];
    let filteredVacancies = [];

    let activeFilters = {
        department: [],
        level: [],
        education: [],
        city: [],
        salary: []
    };

    async function fetchVacancies() {
        try {
            const response = await fetch('vacancies.php');
            const data = await response.json();
            allVacancies = data;
            applyFiltersAndRender();
        } catch (error) {
            console.error('Помилка завантаження вакансій:', error);
            vacanciesContainer.innerHTML = '<p class="error-message">Не вдалося завантажити вакансії. Спробуйте пізніше.</p>';
        }
    }

    function createMetaItem(label, value) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = label;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(' ' + value));
        return p;
    }

    function renderVacancies(vacs) {
        vacanciesContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * vacanciesPerPage;
        const endIndex = startIndex + vacanciesPerPage;
        const vacanciesToDisplay = vacs.slice(startIndex, endIndex);

        if (vacanciesToDisplay.length === 0) {
            vacanciesContainer.innerHTML = '<p class="no-results-message">Вакансій за вашими критеріями не знайдено.</p>';
            return;
        }

        vacanciesToDisplay.forEach(vacancy => {
            const jobCard = document.createElement('div');
            jobCard.classList.add('job-card');

            const titleEl = document.createElement('h3');
            titleEl.textContent = vacancy.title;

            const metaEl = document.createElement('div');
            metaEl.classList.add('meta');
            metaEl.appendChild(createMetaItem('Рівень:', vacancy.level));
            metaEl.appendChild(createMetaItem('Освіта:', vacancy.education));
            metaEl.appendChild(createMetaItem('Місто:', vacancy.city));
            metaEl.appendChild(createMetaItem('Зарплата:', vacancy.sal));

            const detailsButton = document.createElement('button');
            detailsButton.classList.add('details-button');
            detailsButton.textContent = 'Деталі';
            detailsButton.dataset.id = vacancy.id;
            detailsButton.addEventListener('click', () => {
                window.location.href = `vacancy-details.php?id=${vacancy.id}`;
            });

            jobCard.appendChild(titleEl);
            jobCard.appendChild(metaEl);
            jobCard.appendChild(detailsButton);

            vacanciesContainer.appendChild(jobCard);
        });
    }

    function renderPagination(totalVacancies) {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalVacancies / vacanciesPerPage);
        if (totalPages <= 1) return;

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Попередня';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderVacancies(filteredVacancies);
            renderPagination(filteredVacancies.length);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        paginationContainer.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) pageButton.disabled = true;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderVacancies(filteredVacancies);
                renderPagination(filteredVacancies.length);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            paginationContainer.appendChild(pageButton);
        }

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

    function parseSalary(salaryStr) {
        if (!salaryStr) return 0;
        return parseInt(salaryStr.replace(/\D/g, ''));
    }

    function updateSelectedFiltersDisplay() {
        selectedFiltersContainer.innerHTML = '';
        let filtersApplied = false;

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
                const strong = document.createElement('strong');
                strong.textContent = filterDisplayName + ': ';
                filterItem.appendChild(strong);
                filterItem.appendChild(document.createTextNode(values));

                const removeBtn = document.createElement('button');
                removeBtn.classList.add('remove-filter-btn');
                removeBtn.dataset.filterType = type;
                removeBtn.textContent = '✕';
                removeBtn.addEventListener('click', () => {
                    activeFilters[type] = [];
                    document.querySelectorAll(`input[name="${type}"]`).forEach(cb => cb.checked = false);
                    applyFiltersAndRender();
                });

                filterItem.appendChild(removeBtn);
                selectedFiltersContainer.appendChild(filterItem);
            }
        }

        if (globalSearchInput.value.trim() !== '') {
            filtersApplied = true;
            const searchItem = document.createElement('div');
            searchItem.classList.add('selected-filter-item');
            const strong = document.createElement('strong');
            strong.textContent = 'Пошук: ';
            searchItem.appendChild(strong);
            searchItem.appendChild(document.createTextNode(globalSearchInput.value.trim()));

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-filter-btn');
            removeBtn.dataset.filterType = 'globalSearch';
            removeBtn.textContent = '✕';
            removeBtn.addEventListener('click', () => {
                globalSearchInput.value = '';
                applyFiltersAndRender();
            });

            searchItem.appendChild(removeBtn);
            selectedFiltersContainer.appendChild(searchItem);
        }

        selectedFiltersSection.style.display = filtersApplied ? 'block' : 'none';
    }

    function applyFiltersAndRender() {
        const searchTerm = globalSearchInput.value.toLowerCase();

        filteredVacancies = allVacancies.filter(vacancy => {
            const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm) ||
                                  vacancy.description.toLowerCase().includes(searchTerm) ||
                                  vacancy.department.toLowerCase().includes(searchTerm) ||
                                  vacancy.city.toLowerCase().includes(searchTerm);

            const matchesDepartment = activeFilters.department.length === 0 || activeFilters.department.includes(vacancy.department);
            const matchesLevel = activeFilters.level.length === 0 || activeFilters.level.includes(vacancy.level);
            const matchesEducation = activeFilters.education.length === 0 || (Array.isArray(vacancy.education) ? activeFilters.education.some(edu => vacancy.education.includes(edu)) : activeFilters.education.includes(vacancy.education));
            const matchesCity = activeFilters.city.length === 0 || activeFilters.city.includes(vacancy.city);
            const matchesSalary = activeFilters.salary.length === 0 || activeFilters.salary.some(range => {
                const vacancySalary = parseSalary(vacancy.sal);
                if (range === '0-15000') return vacancySalary > 0 && vacancySalary <= 15000;
                if (range === '15001-20000') return vacancySalary >= 15001 && vacancySalary <= 20000;
                if (range === '20001-25000') return vacancySalary >= 20001 && vacancySalary <= 25000;
                if (range === '25001-MAX') return vacancySalary >= 25001;
                return false;
            });

            return matchesSearch && matchesDepartment && matchesLevel && matchesEducation && matchesCity && matchesSalary;
        });

        currentPage = 1;
        renderVacancies(filteredVacancies);
        renderPagination(filteredVacancies.length);
        updateSelectedFiltersDisplay();
    }

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

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filter-dropdown') && !event.target.classList.contains('btn-validate')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
                menu.closest('.filter-dropdown').querySelector('.dropdown-toggle').classList.remove('active');
            });
        }
    });

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

    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        applyFiltersAndRender();
    });

    filterForm.addEventListener('reset', () => {
        globalSearchInput.value = '';
        document.querySelectorAll('.checkbox-list input[type="checkbox"]').forEach(cb => cb.checked = false);
        Object.keys(activeFilters).forEach(key => activeFilters[key] = []);
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
