const pool = require("./connect");

async function retrieveTokenFromDB() {
  const client = await pool.connect();

  try {
    const result = await client.query('SELECT token FROM token LIMIT 1');
    if (result.rows.length > 0) {
      const token = result.rows[0].token;
      return token;
    } else {
      console.log('No token found in the database.');
      return null; 
    }
  } catch (err) {
    console.error(err);
    return null; 
  } finally {
    client.release();
  }
}

module.exports = retrieveTokenFromDB;
