const fs = require("fs");
const path = require("path");

async function getAverageSalary(employees, location) {
  if (employees === null || employees === undefined || isNaN(employees)) {
    return "Invalid employees value.";
  }

  const filePath = path.join(__dirname, "data.json");

  const jsonData = fs.readFileSync(filePath, "utf8");

  const dataArray = JSON.parse(jsonData);

  const data = dataArray.find((obj) => obj.location.toUpperCase() === location.toUpperCase());

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

  if (!employeeValueObj) {
    return "Employee range not found.";
  }

  const averageSalary = Math.floor(employeeValueObj.value);
  const formattedSalary = `${averageSalary.toLocaleString(undefined, { style: 'currency', currency: 'NOK', minimumFractionDigits: 0 })}`;
  
  return formattedSalary;
}

module.exports = getAverageSalary;
