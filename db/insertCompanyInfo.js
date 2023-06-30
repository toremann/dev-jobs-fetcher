require("dotenv").config();
const pool = require("./connect");

// NOT IN USE

async function insertCompanyInfoToDB(data) {
  const client = await pool.connect();

  try {
    const query = `
        INSERT INTO companies (
          name, 
          orgnr, 
          phone, 
          mobile, 
          address, 
          zip_code, 
          post_place,
          country_part, 
          county, 
          municipality, 
          revenue, 
          currency,
          profit, 
          employees, 
          contact_person_name, 
          contact_person_role
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `;

    const values = [
      data.name,
      data.orgnr,
      data.phone,
      data.mobile,
      data.visitorAddress.addressLine,
      data.visitorAddress.zipCode,
      data.visitorAddress.postPlace,
      data.location.countryPart,
      data.location.county,
      data.location.municipality,
      data.revenue,
      data.currency,
      data.profit,
      data.employees,
      data.contactPerson.name,
      data.contactPerson.role,
    ];

    await client.query(query, values);
    console.log("Data inserted into PostgreSQL database!");
  } catch (error) {
    console.error("Error inserting data into PostgreSQL database:", error);
  } finally {
    client.release();
  }
}

module.exports = insertCompanyInfoToDB;
