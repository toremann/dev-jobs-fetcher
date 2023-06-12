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
      const companies = data.pageProps.companiesByName.companies;
  
      companies.forEach((company) => {
        const county = company.location.county;
        if (county) {
          console.log(county);
        }
      });
    })
    .catch((error) => console.log(error));
  