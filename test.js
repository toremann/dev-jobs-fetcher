const getKode24Jobs = require("./fetchers/kode24");
const getEmployeeAmount = require("./companyData/getEmployeeAmount");
const getAverageSalary = require("./lonn2023/getSalary");

async function executeAsyncFlow() {
  try {
    // Get the jobs
    const kode24 = await getKode24Jobs();

    const employeeAmountPromises = kode24.map(async (job) => {
      // Get the employee amount of company
      const employeeAmount = await getEmployeeAmount(job.company, job.lokasjon);
      return {
        company: job.company,
        lokasjon: job.lokasjon,
        employeeAmount: employeeAmount,
      };
    });

    const jobsWithEmployeeAmounts = await Promise.all(employeeAmountPromises);

    const salaryPromises = jobsWithEmployeeAmounts.map(async (job) => {
      const salary = await getAverageSalary(job.employeeAmount, job.lokasjon);
      return {
        company: job.company,
        lokasjon: job.lokasjon,
        employeeAmount: job.employeeAmount,
        salary: salary,
      };
    });

    const resolveSalary = await Promise.all(salaryPromises);

    // Return all the shit
    console.log(resolveSalary);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

executeAsyncFlow();
