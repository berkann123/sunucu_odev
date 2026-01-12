import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
dotenv.config();
// connection to the DB
conn();
const app = express();
const PORT = process.env.PORT;
// EJS template engine
app.set("view engine", "ejs");
//STATIK FILES MIDDLEWARE
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(PORT, () => {
  console.log(`Application running port on:  ${PORT}`);
});
