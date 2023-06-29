const pool = require("./connect");

async function insertTokenToDB(token) {
    console.log(token)
  const client = await pool.connect();

  try {
    await client.query('UPDATE token SET token = $1', [token]);
    console.log('Token updated successfully in the database.');
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

module.exports = insertTokenToDB;
