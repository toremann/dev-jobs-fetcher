// Function to handle company names
// Input: Company Name Is Too Long
// Output: Company+Name

function validateCompany(company) {
    const words = company.match(/\b\w+\b/g);
    const formattedCompany = words ? words.slice(0, 2).join('+') : '';
  
    console.log("Input:", company);
    console.log("Output:", formattedCompany);
  
    return formattedCompany;
  }
    
//   validateCompany('Kriminalomsorgsdirektoratet (KDI)')
//   validateCompany('Sopra Steria - Alle kontor')

module.exports = validateCompany;
