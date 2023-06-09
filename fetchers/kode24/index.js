async function getKode24Jobs() {
  const jobs = [];
  const url = `https://functions.kode24.no/api/listing/job/sorted`;

  const response = await fetch(url, {
    headers: {
      accept: "*/*",
    },
  });

  const data = await response.json();

  data.ads.forEach((el) =>
    jobs.push({
      company: el.company.name,
      dato: new Date(el.published).toLocaleDateString("en-GB"),
      lokasjon: el.locations[0].toUpperCase(),
      tekst: el.title,
      link: `https://www.kode24.no/${el.id}`,
      id: `kode24_${el.id}`,
    })
  );

  return jobs;
}

async function run() {
  const jobs = await getKode24Jobs();

  insertJobsToDB(jobs);
}

run();
