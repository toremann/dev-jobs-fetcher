const cron = require("node-cron");
const insertJobsToDB = require('./db/insertJobs');
const getNavJobs = require("./fetchers/nav");
const getKode24Jobs = require("./fetchers/kode24");
const getFinnJobs = require("./fetchers/finn");

const navTimer = '0 * * * *';
const kode24Timer = '20 * * * *';
const finnTimer = '40 * * * *';

console.log('Running..')

// Schedule cron job for fetching Kode24 jobs
cron.schedule(kode24Timer, async () => {
  try {
    const jobs = await getKode24Jobs();
    insertJobsToDB(jobs, 'kode24');
  } catch (error) {
    console.error(error);
  }
});

// Schedule cron job for fetching NAV jobs
cron.schedule(navTimer, async () => {
  try {
    const jobs = await getNavJobs();
    insertJobsToDB(jobs, 'nav');
  } catch (error) {
    console.error(error);
  }
});

// Schedule cron job for fetching Finn jobs
cron.schedule(finnTimer, async () => {
  try {
    const jobs = await getFinnJobs();
    insertJobsToDB(jobs, 'finn');
  } catch (error) {
    console.error(error);
  }
});

// Test
// async function runJobInsertion() {
//   try {
//     const jobs = await getKode24Jobs();
//     await insertJobsToDB(jobs, 'kode24:');
//   } catch (error) {
//     console.error(error);
//   }
// }

// runJobInsertion();