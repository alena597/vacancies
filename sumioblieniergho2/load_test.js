import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    scenarios: {
        open_homepage: {
            executor: 'constant-vus',
            vus: 20,
            duration: '30s',
            exec: 'openHomepage'
        },
        view_vacancy: {
            executor: 'constant-vus',
            vus: 50,
            duration: '30s',
            exec: 'viewVacancy'
        },
        filter_vacancies: {
            executor: 'constant-vus',
            vus: 100,
            duration: '30s',
            exec: 'filterVacancies'
        },
    }
};

// Сценарій 1: відкриття головної сторінки
export function openHomepage() {
    let res = http.get('http://localhost/sumioblieniergho2/sumioblieniergho2/index.php');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1); 
}

// Сценарій 2: перегляд детальної інформації про вакансію
export function viewVacancy() {
        let res = http.get('http://localhost/sumioblieniergho2/sumioblieniergho2/vacancy-details.php?id=1');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}

// Сценарій 3: фільтрація вакансій
export function filterVacancies() {
    let res = http.get('http://localhost/sumioblieniergho2/sumioblieniergho2/index.php?department=IT');
    check(res, { 'status is 200': (r) => r.status === 200 });
    sleep(1);
}
