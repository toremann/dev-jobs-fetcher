const fs = require('fs');

// Read the JSON file
const jsonData = fs.readFileSync('average_salary_by_location.json', 'utf8');

// Parse the JSON data
const dataArray = JSON.parse(jsonData);

// Create a copy of the data array with the new properties
const reformattedDataArray = dataArray.map(data => {
  const reformattedData = {
    ...data,
    employeeValues: data.employeeValues.map(obj => {
      const range = Object.keys(obj)[0];
      const value = obj[range];
      const [low, high] = range.split('-').map(str => parseInt(str.trim()));

      return {
        range: {
          low,
          high
        },
        value
      };
    })
  };
  
  return reformattedData;
});

// Convert the reformatted data array to JSON
const reformattedJson = JSON.stringify(reformattedDataArray, null, 2);

// Write the reformatted JSON to a new file
fs.writeFileSync('reformatted_data.json', reformattedJson);

console.log('Reformatted data has been created.');
