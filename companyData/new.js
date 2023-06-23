// Read the token from the JSON file and test it
const tokenFilePath = path.join(__dirname, "token.json");
if (fs.existsSync(tokenFilePath)) {
  const tokenData = JSON.parse(fs.readFileSync(tokenFilePath, "utf-8"));
  const storedToken = tokenData.token;
  console.log("Stored token:", storedToken);

  // Test the stored token
  testToken(storedToken).then((isValidToken) => {
    if (isValidToken) {
      console.log("Stored token is valid. Proceeding with fetchToken...");
      fetchToken().then((token) => {
        console.log("Final token:", token);
      });
    } else {
      console.log("Stored token is invalid. Getting a new token...");
      fetchToken().then((token) => {
        console.log("Final token:", token);
      });
    }
  });
} else {
  console.log("Token file not found. Getting a new token...");
  fetchToken().then((token) => {
    console.log("Final token:", token);
  });
}
