const fs = require("fs");
const path = require("path");

function getAverageSalary(employees, location) {
  // Get the absolute file path for data.json
  const filePath = path.join(__dirname, "data.json");

  // Read the JSON file
  const jsonData = fs.readFileSync(filePath, "utf8");

  // Parse the JSON data
  const dataArray = JSON.parse(jsonData);

  // Find the data object for the specified location
  const data = dataArray.find((obj) => obj.location === location);

  // Check if the data object exists
  if (!data) {
    return "Location not found.";
  }

  // Find the employee value object that matches the employees
  const employeeValueObj = data.employeeValues.find((obj) => {
    const range = obj.range;
    if (range.low && range.high) {
      return employees >= range.low && employees <= range.high;
    } else if (range.low) {
      return employees >= range.low;
    } else if (range.high) {
      return employees <= range.high;
    }
  });

  // Check if the employee value object exists
  if (!employeeValueObj) {
    return "Employee range not found.";
  }

  // Get the average salary from the employee value object
  const averageSalary = employeeValueObj.value;

  return averageSalary;
}

// Example usage:

module.exports = getAverageSalary;
