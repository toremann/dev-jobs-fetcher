const getEmployeeAmount = require("../companyData/getEmployeeAmount");
const getAverageSalary = require("../lonn2023/getAvarageSalary");
const searchFylkeByKommune = require("../lonn2023/getFylke");

async function getJobSalary(insertedJobs) {
  try {
    const employeeAmountPromises = insertedJobs.map(async (job) => {
      const employeeAmount = await getEmployeeAmount(job.company, job.lokasjon);
      return {
        ...job,
        employeeAmount
      };
    });

    const jobsWithEmployeeAmounts = await Promise.all(employeeAmountPromises);

    // To get salary from kode24 data we need company employee amount and fylke
    const salaryPromises = jobsWithEmployeeAmounts.map(async (job) => {
      const fylke = await searchFylkeByKommune(job.lokasjon);
      const salary = await getAverageSalary(job.employeeAmount, fylke);

      return {
        ...job,
        avgSalary: salary,
      };
    });

    const resolveSalary = await Promise.all(salaryPromises);

    console.log("Length of resolveSalary array:", resolveSalary.length);

    return resolveSalary;
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

module.exports = getJobSalary;
