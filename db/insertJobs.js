const pool = require("./db/connect");

async function insertJobsToDB(jobs) {
    const client = await pool.connect();
    let conflicts = 0;
    try {
      for (let job of jobs) {
        const result = await client.query(
          "INSERT INTO jobs(id, company, dato, lokasjon, tekst, link) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO NOTHING",
          [job.id, job.company, job.dato, job.lokasjon, job.tekst, job.link]
        );
        if (result.rowCount === 0) {
          conflicts++;
        }
      }
      const successfulInserts = jobs.length - conflicts;
      console.log(
        `Inserted ${successfulInserts} jobs to database (${conflicts} conflicts)`
      );
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  }

  module.exports = insertJobsToDB