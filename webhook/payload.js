function generatePayload(insertedJobs, fetcher) {
  let color = 0x00ff00; // Default color as green

  if (fetcher === "nav") {
    color = 0xff0000; // Red color for "nav"
  } else if (fetcher === "finn") {
    color = 0x0000ff; // Blue color for "finn"
  } else if (fetcher === "kode24") {
    color = 0xffa500; // Orange color for "kode24:"
  }

  console.log('generating payload for: ', fetcher, 'jobs: ', insertedJobs.length)

  const payload = {
    embeds: [
      {
        color: color,
        fields: insertedJobs.map((job) => {
          return {
            name: job.company,
            value: `ID: ${job.id}\nLocation: ${job.lokasjon}\nDate: ${job.dato}\nText: ${job.tekst}\nLink: ${job.link}`,
          };
        }),
      },
    ],
    footer: {
      text: `Source: ${fetcher}`
    }
  };

  // console.log('Payload:', payload.embeds[0].fields);

  return payload;
}

module.exports = generatePayload;
