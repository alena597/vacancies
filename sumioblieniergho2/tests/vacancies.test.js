const {
  parseSalary,
  matchesSalaryRange,
  matchesSearch
} = require('../src/vacanciesUtils');

describe('parseSalary()', () => {
  test('коректно витягує число із рядка', () => {
    expect(parseSalary('28000 грн')).toBe(28000);
  });

  test('повертає 0 для порожнього значення', () => {
    expect(parseSalary('')).toBe(0);
  });

  test('повертає 0 якщо цифр немає', () => {
    expect(parseSalary('немає')).toBe(0);
  });
});

describe('matchesSalaryRange()', () => {
  test('0-15000 підходить для 10000', () => {
    expect(matchesSalaryRange('10000 грн', '0-15000')).toBe(true);
  });

  test('15001-20000 не підходить для 10000', () => {
    expect(matchesSalaryRange('10000 грн', '15001-20000')).toBe(false);
  });

  test('25001-MAX підходить для 30000', () => {
    expect(matchesSalaryRange('30000 грн', '25001-MAX')).toBe(true);
  });
});

describe('matchesSearch()', () => {
  const vacancy = {
    title: 'Інженер служби',
    description: 'Обслуговування обладнання',
    department: 'Відділ IT',
    city: 'Суми'
  };

  test('знаходить за містом (регістр ігнорується)', () => {
    expect(matchesSearch(vacancy, 'суми')).toBe(true);
  });

  test('повертає true для порожнього пошуку', () => {
    expect(matchesSearch(vacancy, '')).toBe(true);
  });

  test('повертає false якщо нічого не знайдено', () => {
    expect(matchesSearch(vacancy, 'Київ')).toBe(false);
  });
});
