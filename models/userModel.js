import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username area is required"],
      lowercase: true,
      validate: [validator.isAlphanumeric, "Only alphanumeric characters"],
    },
    email: {
      type: String,
      required: [true, "Email area is required"],
      unique: true,
      validate: [validator.isEmail, "Valid email is required"],
    },
    password: {
      type: String,
      required: true,
      minLength: [4, "At least 4 characters"],
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function () {
  // 'next' parametresini sildik
  const user = this;

  // Şifre değişmemişse hiçbir şey yapmadan fonksiyondan çık
  if (!user.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    // 'next()' çağırmıyoruz, fonksiyonun bitmesi yeterli
  } catch (err) {
    throw err; // Hata varsa fırlat, Mongoose bunu yakalar
  }
});
// userSchema.pre(
//   "save",
//   async function (next) {
//     const user = this;
//     if (!user.isModified("password")) {
//       return next();
//     }
//     try {
//       // console.log("user pass 1", user.password);
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(user.password, salt);
//       user.password = hash;
//       // console.log("user pass 2 (Şifreli):", user.password);
//       next();
//     } catch (err) {
//       // Bir hata olursa hatayı Mongoose'a bildir
//       next(err);
//     }
//   }
//   // )
//   // console.log("user pass 1", user.password);
//   // bcrypt.hash(user.password, 10, (err, hash) => {
//   //   user.password = hash;
//   //   console.log("user pass 2", user.password);

//   //   next();
//   // });
// );
const User = mongoose.model("user", userSchema);
export default User;
