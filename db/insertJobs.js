require("dotenv").config();
const pool = require("./connect");
const sendWebhook = require("../webhook/hook");
const generatePayload = require("../webhook/payload");
const getCompanyData = require("../companyData/getCompanyData");

async function insertJobsToDB(jobs, fetcher) {
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

    // TEST LOOP
    for (let job of insertedJobs) {
      const companyData = await getCompanyData(job.company, job.lokasjon);
      console.log("salary test: ", job.company, companyData);
    }
    

    if (insertedJobs.length > 0) {
      const payload = generatePayload(insertedJobs, fetcher);
      await sendWebhook(payload);
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

module.exports = insertJobsToDB;
