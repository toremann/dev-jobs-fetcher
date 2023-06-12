require("dotenv").config();
const pool = require("./connect");
const sendWebhook = require("../webhook/hook");
const generatePayload = require("../webhook/payload");

async function insertJobsToDB(jobs, fetcher) {
  const client = await pool.connect();
  let conflicts = 0;
  
  try {
    for (let job of jobs) {
      const insertedJobs = []; 
      const result = await client.query(
        "INSERT INTO jobs(id, company, dato, lokasjon, tekst, link) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING",
        [job.id, job.company, job.dato, job.lokasjon, job.tekst, job.link]
      );
      if (result.rowCount === 0) {
        conflicts++;
      } else {
        insertedJobs.push(job);
      }
      
      const successfulInserts = insertedJobs.length;
      console.log(
        `${fetcher} Inserted ${successfulInserts} new jobs to database (${conflicts} conflicts)`
      );

      if (successfulInserts > 0) {
        const payload = generatePayload(successfulInserts, insertedJobs, fetcher);
        await sendWebhook(payload);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

module.exports = insertJobsToDB;
