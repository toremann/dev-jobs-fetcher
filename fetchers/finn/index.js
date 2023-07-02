const fetch = require("cross-fetch");

async function getFinnJobs() {
  let page = 1;
  let hasMoreData = true;
  const jobs = [];

  while (hasMoreData) {
    const url = `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_JOB_FULLTIME&location=0.20001&occupation=0.23&sort=RELEVANCE&page=${page}&vertical=job`;
    const response = await fetch(url, {
      headers: {
        accept: "*/*",
      },
    });
    const data = await response.json();

    if (data.docs.length === 0) {
      hasMoreData = false;
    } else {
      data.docs.forEach((el) => {
        if (el.company_name !== undefined) {
          jobs.push({
            company: el.company_name,
            dato: new Date(el.timestamp).toLocaleDateString("en-GB"),
            lokasjon: el.location.toUpperCase(),
            tekst: el.heading,
            link: `https://www.finn.no/job/fulltime/ad.html?finnkode=${el.ad_id}`,
            id: `finn_${el.ad_id}`,
          });
        } else {
          console.log("Skipped job with undefined company_name:", el);
        }
      });
      page++;
      const delay = Math.floor(Math.random() * 10) + 1;
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
    }
  }

  return jobs;
}

module.exports = getFinnJobs;
