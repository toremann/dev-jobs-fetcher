const fs = require('fs');

// Read the JSON file
fs.readFile('lonn2023.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const jsonData = JSON.parse(data);

  // Calculate average salary by employees for each location
  const averageSalaryByLocation = {};
  jsonData.forEach(element => {
    const employees = element.employees;
    const salary = element.salary;
    const location = element.location;

    if (employees && salary && location) {
      if (!averageSalaryByLocation[location]) {
        averageSalaryByLocation[location] = {
          employeeValues: {},
          avg_salary: 0,
          count: 0
        };
      }

      if (!averageSalaryByLocation[location].employeeValues[employees]) {
        averageSalaryByLocation[location].employeeValues[employees] = [];
      }

      averageSalaryByLocation[location].employeeValues[employees].push(salary);
      averageSalaryByLocation[location].avg_salary += salary;
      averageSalaryByLocation[location].count++;
    }
  });

  // Calculate average salary and format the output
  const output = Object.entries(averageSalaryByLocation).map(([location, { employeeValues, avg_salary, count }]) => {
    const formattedEmployeeValues = Object.entries(employeeValues).map(([employees, salaries]) => ({
      [employees]: salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length
    }));

    return {
      location,
      employeeValues: formattedEmployeeValues,
      avg_salary: avg_salary / count
    };
  });

  // Write the output to a new JSON file
  fs.writeFile('average_salary_by_location.json', JSON.stringify(output, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('New file "average_salary_by_location.json" created!');
  });
});
