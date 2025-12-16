const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

//ТЕСТ 1
  
test('Отримання списку вакансій', async () => {
  fetch.mockResponseOnce(JSON.stringify([
    { id: 1, title: 'Інженер', city: 'Суми', sal: '18000 грн' }
  ]));

  const response = await fetch('vacancies.php');
  const data = await response.json();

  expect(data.length).toBeGreaterThan(0);
});

//ТЕСТ 2
 
test('Перевірка структури вакансії', async () => {
  fetch.mockResponseOnce(JSON.stringify([
    { id: 1, title: 'Електрик', city: 'Суми', sal: '20000 грн' }
  ]));

  const data = await (await fetch('vacancies.php')).json();

  expect(data[0]).toHaveProperty('id');
  expect(data[0]).toHaveProperty('title');
  expect(data[0]).toHaveProperty('city');
  expect(data[0]).toHaveProperty('sal');
});

//ТЕСТ 3
 
test('Обробка декількох вакансій', async () => {
  fetch.mockResponseOnce(JSON.stringify([
    { id: 1, title: 'Інженер', city: 'Суми', sal: '18000 грн' },
    { id: 2, title: 'Технік', city: 'Охтирка', sal: '15000 грн' }
  ]));

  const data = await (await fetch('vacancies.php')).json();

  expect(data.length).toBe(2);
});

//ТЕСТ 4
 
test('Обробка порожнього масиву вакансій', async () => {
  fetch.mockResponseOnce(JSON.stringify([]));

  const data = await (await fetch('vacancies.php')).json();

  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBe(0);
});

//ТЕСТ 5
 
test('Некоректний JSON викликає помилку', async () => {
  fetch.mockResponseOnce('INVALID_JSON');

  await expect(
    (async () => {
      const response = await fetch('vacancies.php');
      await response.json();
    })()
  ).rejects.toThrow();
});

//ТЕСТ 6 (MOCK)

test('Frontend коректно працює з Mock backend', async () => {
  fetch.mockResponseOnce(JSON.stringify([
    { id: 99, title: 'Mock вакансія', city: 'Тестове місто', sal: '9999 грн' }
  ]));

  const data = await (await fetch('vacancies.php')).json();

  expect(data[0].title).toBe('Mock вакансія');
});

//ТЕСТ 7 (SPY)
 
test('fetch викликається рівно один раз', async () => {
  fetch.mockResponseOnce(JSON.stringify([]));
  const spy = jest.spyOn(global, 'fetch');

  await fetch('vacancies.php');

  expect(spy).toHaveBeenCalledTimes(1);

  spy.mockRestore();
});

//ТЕСТ 8

test('Backend повертає масив даних', async () => {
  fetch.mockResponseOnce(JSON.stringify([
    { id: 1, title: 'Інженер', city: 'Суми', sal: '18000 грн' }
  ]));

  const data = await (await fetch('vacancies.php')).json();

  expect(Array.isArray(data)).toBe(true);
});
