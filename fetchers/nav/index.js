require("dotenv").config({ path: "../../.env" });
const cron = require("node-cron");
const fetch = require("cross-fetch");
const insertJobsToDB = require("../../db/insertJobs");

async function getNavJobs() {
  const response1 = await fetch(
    "https://arbeidsplassen.nav.no/stillinger/api/search?from=0&size=25&occupationFirstLevels[]=IT&occupationSecondLevels[]=IT.Utvikling",
    {
      headers: {
        accept: "*/*",
      },
    }
  );

  const data1 = await response1.json();

  const value = data1.hits.total.value;

  const response2 = await fetch(
    `https://arbeidsplassen.nav.no/stillinger/api/search?from=0&size=${value}&occupationFirstLevels[]=IT&occupationSecondLevels[]=IT.Utvikling`,
    {
      headers: {
        accept: "*/*",
      },
    }
  );

  const data2 = await response2.json();

  const jobs = []; // Array to store data from data2 with source: "IMPORTAPI"

  data2.hits.hits.forEach((hit) => {
    if (hit._source.source === "IMPORTAPI") {
      jobs.push({
        company: hit._source.businessName,
        dato: new Date(hit._source.published).toLocaleDateString("en-GB"),
        lokasjon: hit._source.locationList[0].city,
        tekst: hit._source.title,
        link: `https://arbeidsplassen.nav.no/stillinger/stilling/${hit._source.uuid}`,
        id: `nav_${hit._source.reference}`,
      });
    }
  });

  return jobs; // Return the array with data from data2
}

async function getJobs() {
  const jobs = await getNavJobs();

  insertJobsToDB(jobs, 'nav');
}

cron.schedule('0 * * * *', async () => {
  getJobs();
});

