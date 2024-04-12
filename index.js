import server from "./app/app.js";
import connectDataBase from "./db/dataBaseConnection.js";

const PORT = process.env.PORT || 8080;

// DATABASE CONNECTION******************
connectDataBase();

// SERVER STARTED AND LISTEN AT GIVEN PORT***********
server.listen(PORT, () => {
  console.log("Server is started at port 🥳🥳" + " " + PORT);
});
