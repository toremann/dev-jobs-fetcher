require("dotenv").config({ path: "../../.env" });
const fetch = require("cross-fetch");
const insertJobsToDB = require("../../db/insertJobs");
const cron = require("node-cron");

async function getKode24Jobs() {
  const jobs = [];
  const url = `https://functions.kode24.no/api/listing/job/sorted`;

  const response = await fetch(url, {
    headers: {
      accept: "*/*",
    },
  });

  const data = await response.json();

  data.ads.forEach((el) => {
    if (el.locations && el.locations[0]) {
      jobs.push({
        company: el.company.name,
        dato: new Date(el.published).toLocaleDateString("en-GB"),
        lokasjon: el.locations[0].toUpperCase(),
        tekst: el.title,
        link: `https://www.kode24.no/${el.id}`,
        id: `kode24_${el.id}`,
      });
    }
  });

  return jobs;
}

async function getJobs() {
  const jobs = await getKode24Jobs();

  insertJobsToDB(jobs, 'kode24');
}

cron.schedule('0 * * * *', async () => {
  getJobs();
});