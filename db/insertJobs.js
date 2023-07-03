require("dotenv").config();
const pool = require("./connect");

// Filer and insert new jobs to database, also return the new jobs array.

async function insertJobsToDB(jobs) {
  const client = await pool.connect();

  try {
    const insertedJobs = [];

    for (let job of jobs) {
      const result = await client.query(
        "INSERT INTO jobs(id, company, dato, lokasjon, tekst, link) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING",
        [job.id, job.company, job.dato, job.lokasjon, job.tekst, job.link]
      );

      if (result.rowCount !== 0) {
        insertedJobs.push(job);
      }
    }

    console.log("Number of jobs inserted:", insertedJobs.length);

    return insertedJobs;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

module.exports = insertJobsToDB;
