const getIndexPage = (req, res) => {
  console.log("request user :::", req.user);
  res.render("index", { link: "index" });
};
const getAboutPage = (req, res) => {
  res.render("about", { link: "about" });
};
const getRegisterpage = (req, res) => {
  res.render("register", { link: "register" });
};
const getLoginpage = (req, res) => {
  res.render("login", { link: "login" });
};
const getLogout = (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.redirect("/");
};
export { getIndexPage, getAboutPage, getRegisterpage, getLoginpage, getLogout };
