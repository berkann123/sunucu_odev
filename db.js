import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "lenslight_tr",
      //   useNewUrlParser: true,
      //   useunifiedTopology: true,
    })
    .then(() => {
      console.log("connected to the db succesfully");
    })
    .catch((err) => {
      console.log(`Db connected error:, ${err}`);
    });
};
export default conn;
