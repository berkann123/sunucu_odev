import express from "express";
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("INDEX SAYFASI 2");
});

app.listen(PORT, () => {
  console.log(`Application running port on:  ${PORT}`);
});
