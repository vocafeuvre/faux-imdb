require("./config");
require("./database")
const app = require("./src/server.js");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App is being served at port ${PORT}!`));
