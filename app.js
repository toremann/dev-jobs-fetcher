const cron = require("node-cron");
const getNewToken = require("./companyData/getNewToken");
const insertJobsToDB = require("./db/insertJobs");
const getNavJobs = require("./fetchers/nav");
const getKode24Jobs = require("./fetchers/kode24");
const getFinnJobs = require("./fetchers/finn");
const getJobSalary = require("./salary/getSalary");
const generatePayload = require("./webhook/payload");
const sendWebhook = require("./webhook/hook");

const navTimer = "0 * * * *";
const kode24Timer = "20 * * * *";
const finnTimer = "40 * * * *";
const freshPath = "50 * * * *";

console.log("Running..");

// Get fresh path
cron.schedule(freshPath, async () => {
  try {
    await getNewToken();
  } catch (error) {
    console.error(error);
  }
});

// Schedule cron job for fetching Kode24 jobs
cron.schedule(kode24Timer, async () => {
  try {
    // Get job listings
    const jobs = await getKode24Jobs();
    // Filter and insert to database
    const insertedJobs = await insertJobsToDB(jobs, "kode24");
    // Get salaries for filtered job listings
    const jobSalaries = await getJobSalary(insertedJobs);
    console.log(jobSalaries);
    if (jobSalaries.length > 0) {
      const payload = generatePayload(jobSalaries, "kode24");
      // Send webhook
      console.log("kode24", payload);
      await sendWebhook(payload);
    }
  } catch (error) {
    console.error(error);
  }
});

// Schedule cron job for fetching NAV jobs
cron.schedule(navTimer, async () => {
  try {
    // Get job listings
    const jobs = await getNavJobs();
    // Filter and insert to database
    const insertedJobs = await insertJobsToDB(jobs, "nav");
    // Get salaries for filtered job listings
    const jobSalaries = await getJobSalary(insertedJobs);
    console.log(jobSalaries);
    if (jobSalaries.length > 0) {
      const payload = generatePayload(jobSalaries, "nav");
      // Send webhook
      console.log("nav", payload);

      await sendWebhook(payload);
    }
  } catch (error) {
    console.error(error);
  }
});

// Schedule cron job for fetching Finn jobs
cron.schedule(finnTimer, async () => {
  try {
    // Get job listings
    const jobs = await getFinnJobs();
    // Filter and insert to database
    const insertedJobs = await insertJobsToDB(jobs, "finn");
    // Get salaries for filtered job listings
    const jobSalaries = await getJobSalary(insertedJobs);
    console.log(jobSalaries);
    if (jobSalaries.length > 0) {
      const payload = generatePayload(jobSalaries, "finn");
      // Send webhook
      console.log("finn", payload);

      await sendWebhook(payload);
    }
  } catch (error) {
    console.error(error);
  }
});
