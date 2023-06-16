const fs = require('fs');
const path = require('path');

// Read the input JSON file
const inputFile = path.join(__dirname, 'lonn2023.json');
const jsonData = fs.readFileSync(inputFile, 'utf8');
const data = JSON.parse(jsonData);

// Extract unique properties and their values
const uniqueProperties = {};
Object.keys(data).forEach((key) => {
  const obj = data[key];
  Object.keys(obj).forEach((prop) => {
    if (!uniqueProperties[prop]) {
      uniqueProperties[prop] = [];
    }
    if (!uniqueProperties[prop].includes(obj[prop])) {
      uniqueProperties[prop].push(obj[prop]);
    }
  });
});

// Create a new JSON object with unique properties and values
const outputData = { uniqueProperties };

// Write the output JSON file
const outputFile = path.join(__dirname, 'output.json');
const outputJsonData = JSON.stringify(outputData, null, 2);
fs.writeFileSync(outputFile, outputJsonData, 'utf8');

console.log('New JSON file created with unique properties and values.');
