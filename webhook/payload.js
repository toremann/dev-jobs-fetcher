function generatePayload(successfulInserts, insertedJobs, fetcher) {
    let color = 0x00ff00; // Default color as green
  
    if (fetcher === "nav") {
      color = 0xff0000; // Red color for "nav"
    } else if (fetcher === "finn") {
      color = 0x0000ff; // Blue color for "finn"
    } else if (fetcher === "kode24") {
      color = 0xffa500; // Orange color for "kode24:"
    }
  
    const payload = {
      embeds: [
        {
          title: "New Jobs Inserted",
          description: `Found ${successfulInserts} new job(s)`,
          color: color,
          fields: insertedJobs.map((job) => ({
            name: job.company,
            value: `ID: ${job.id}\nLocation: ${job.lokasjon}\nDate: ${job.dato}\nText: ${job.tekst}\nLink: ${job.link}`,
          })),
        },
      ],
    };
  
    return payload;
  }
  
  module.exports = generatePayload;
  