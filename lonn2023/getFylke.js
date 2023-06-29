const fs = require("fs");
const path = require("path");

async function searchFylkeByKommune(searchValue) {
  const filePath = path.join(__dirname, "fylke_kommune_uppercase.json");

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const jsonData = JSON.parse(data);

    for (const obj of jsonData) {
      if (obj.kommune.includes(searchValue)) {
        console.log(obj.fylke);
        return obj.fylke;
      }
    }

    return 'Invalid location'; // or any other value indicating no match
  } catch (err) {
    console.error("Error reading file:", err);
    return null; // or handle the error accordingly
  }
}

module.exports = searchFylkeByKommune;
