function parseSalary(salaryStr) {
  if (!salaryStr) return 0;
  const num = parseInt(salaryStr.replace(/\D/g, ''));
  return isNaN(num) ? 0 : num;
}

function matchesSalaryRange(salaryStr, range) {
  const salary = parseSalary(salaryStr);

  if (range === '0-15000') {
    return salary > 0 && salary <= 15000;
  }
  if (range === '15001-20000') {
    return salary >= 15001 && salary <= 20000;
  }
  if (range === '20001-25000') {
    return salary >= 20001 && salary <= 25000;
  }
  if (range === '25001-MAX') {
    return salary >= 25001;
  }

  return false;
}

function matchesSearch(vacancy, searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') return true;

  const term = searchTerm.toLowerCase();

  return (
    vacancy.title.toLowerCase().includes(term) ||
    vacancy.description.toLowerCase().includes(term) ||
    vacancy.department.toLowerCase().includes(term) ||
    vacancy.city.toLowerCase().includes(term)
  );
}

module.exports = {
  parseSalary,
  matchesSalaryRange,
  matchesSearch
};
