// Function to handle company names
// Input: Company Name Is Too Long
// Output: Company+Name

function validateCompany(company) {
  const words = company.split(/\s+/);
  const formattedCompany = words.slice(0, 2).join("+");

  console.log("validate Input:", company);
  console.log("validate Output:", formattedCompany);

  return formattedCompany;
}

module.exports = validateCompany;
