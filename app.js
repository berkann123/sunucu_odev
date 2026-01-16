import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageroute from "./routes/pageroute.js";
import photoRoutes from "./routes/photoRoutes.js";
import userroute from "./routes/userroute.js";

dotenv.config();
// connection to the DB
conn();
const app = express();
const PORT = process.env.PORT;
// EJS template engine
app.set("view engine", "ejs");
//STATIK FILES MIDDLEWARE
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", pageroute);
app.use("/photos", photoRoutes);
app.use("/users", userroute);

// app.get("/", (req, res) => {
//   res.render("index");
// });
// app.get("/about", (req, res) => {
//   res.render("about");
// });

app.listen(PORT, () => {
  console.log(`Application running port on:  ${PORT}`);
});
