const cron = require("node-cron");
const insertJobsToDB = require('./db/insertJobs');
const getNavJobs = require("./fetchers/nav");
const getKode24Jobs = require("./fetchers/kode24");
const getFinnJobs = require("./fetchers/finn");
const getJobSalary = require("./salary/getSalary")

const navTimer = '0 * * * *';
const kode24Timer = '20 * * * *';
const finnTimer = '40 * * * *';

console.log('Running..')

// Schedule cron job for fetching Kode24 jobs
cron.schedule(kode24Timer, async () => {
  try {
    const jobs = await getKode24Jobs();
    const insertedJobs = await insertJobsToDB(jobs, 'kode24');

    const jobSalaries = await getJobSalary(insertedJobs);
    console.log(jobSalaries); 
  } catch (error) {
    console.error(error);
  }
});

// Schedule cron job for fetching NAV jobs
cron.schedule(navTimer, async () => {
  try {
    const jobs = await getNavJobs();
    const insertedJobs = await insertJobsToDB(jobs, 'nav');

    const jobSalaries = await getJobSalary(insertedJobs);
    console.log(jobSalaries); 
  } catch (error) {
    console.error(error);
  }
});

// Schedule cron job for fetching Finn jobs
cron.schedule(finnTimer, async () => {
  try {
    const jobs = await getFinnJobs();
    const insertedJobs = await insertJobsToDB(jobs, 'finn');

    const jobSalaries = await getJobSalary(insertedJobs);
    console.log(jobSalaries); 
  } catch (error) {
    console.error(error);
  }
});
