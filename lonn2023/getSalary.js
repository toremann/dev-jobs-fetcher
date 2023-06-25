const fs = require('fs');

function getAverageSalary(jsonFilePath, number, location) {
  // Read the JSON file
  const jsonData = fs.readFileSync(jsonFilePath, 'utf8');

  // Parse the JSON data
  const dataArray = JSON.parse(jsonData);

  // Find the data object for the specified location
  const data = dataArray.find(obj => obj.location === location);

  // Check if the data object exists
  if (!data) {
    return 'Location not found.';
  }

  // Find the employee value object that matches the number
  const employeeValueObj = data.employeeValues.find(obj => {
    const range = obj.range;
    if (range.low && range.high) {
      return number >= range.low && number <= range.high;
    } else if (range.low) {
      return number >= range.low;
    } else if (range.high) {
      return number <= range.high;
    }
  });

  // Check if the employee value object exists
  if (!employeeValueObj) {
    return 'Employee range not found.';
  }

  // Get the average salary from the employee value object
  const averageSalary = employeeValueObj.value;

  return averageSalary;
}

// Example usage:
const avgSalary = getAverageSalary('data.json', 250, 'Oslo');
console.log('Average Salary', avgSalary);
