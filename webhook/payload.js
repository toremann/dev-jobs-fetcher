const getCompanyData = require('../companyData/getCompanyData')

function generatePayload(insertedJobs, fetcher) {
  let color = 0x00ff00; // Default color as green

  if (fetcher === "nav") {
    color = 0xff0000; // Red color for "nav"
  } else if (fetcher === "finn") {
    color = 0x0000ff; // Blue color for "finn"
  } else if (fetcher === "kode24") {
    color = 0xffa500; // Orange color for "kode24:"
  }

  console.log('Generating payload for:', fetcher, 'jobs:', insertedJobs.length);

  const payload = {
    embeds: [
      {
        color: color,
        fields: insertedJobs.map((job) => {
          const valueString = `ID: ${job.id}\nLocation: ${job.lokasjon}\nDate: ${job.dato}\nText: ${job.tekst}\nLink: ${job.link} <-- max 1024 chars`;
          console.log('fields.value character count:', valueString.length);

          // if shit hits the fan, remove this log
          // console.log(getCompanyData('salary data test', job.company, job.lokasjon))
          return {
            name: job.company,
            value: `ID: ${job.id}\nLocation: ${job.lokasjon}\nDate: ${job.dato}\nText: ${job.tekst}\nLink: ${job.link}`,
          };
        }),
        footer: {
          text: `Source: ${fetcher}, amount: ${insertedJobs.length}`
        }
      }
    ]
  };


  const payloadString = JSON.stringify(payload);
  const payloadSize = payloadString.length;

  console.log('Payload character count:', payloadSize, '<-- must not exceed 8,192 characters');

  return payload;
}

module.exports = generatePayload;
