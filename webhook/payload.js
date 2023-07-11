
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
        title: `New jobs from ${fetcher}:`,
        color: color,
        fields: insertedJobs.map((job) => {

          return {
            name: job.company,
            value: `**Location:** ${job.lokasjon}\n**Date:** ${job.dato}\n**Text:** ${job.tekst}\n**Link:** [Read more..](${job.link})\n**Salary:** ${job.avgSalary}\n`,
            inline: false
          };
        }),
        footer: {
          text: "Salary guesstimated based on kode24.no salary data."
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
