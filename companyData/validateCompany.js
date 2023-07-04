// Function to handle company names
// Input: Company Name Is Too Long
// Output: Company+Name

function validateCompany(company) {
    const words = company.match(/^[^\s]+(?:\s[^\s]+)?/);
    const formattedCompany = words ? words[0].replace(/\s+/g, '+') : '';
  
    console.log("Input:", company);
    console.log("Output:", formattedCompany);
  
    return formattedCompany;
  }
    
    
//   validateCompany('Kriminalomsorgsdirektoratet (KDI)')
//   validateCompany('Sopra Steria - Alle kontor')

module.exports = validateCompany;
