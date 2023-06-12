const company = "Sopra Steria";
const location = "OSLO";

fetch(
  "https://beta.proff.no/_next/data/bXvPhJVVcVDiPMDVY_jPI/search.json?q=Sopra+Steria",
  {
    headers: {
      accept: "*/*",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.pageProps.companiesByName.companies.location.county)
    const companies = data.pageProps.companiesByName.companies;
    const matchingCompany = companies.find((company) => company.name === company);

    if (matchingCompany) {
      const matchingLocation = matchingCompany.locations.find(
        (loc) => loc.county.toUpperCase() === location
      );
      if (matchingLocation) {
        console.log(`Location: ${matchingLocation.county}`);
      } else {
        console.log(`No matching location found for ${company} in ${location}`);
      }
    } else {
      console.log(`No matching company found for ${company}`);
    }
  })
  .catch((error) => console.log(error));