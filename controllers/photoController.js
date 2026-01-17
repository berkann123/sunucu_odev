import Photo from "../models/photoModels.js";

const createPhoto = async (req, res) => {
  try {
    await Photo.create({
      name: req.body.name,
      description: req.body.description,
      user: res.locals.user._id,
    });
    res.status(201).redirect("/user/dashboard");
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const getAllPhoto = async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.status(200).render("photos", { photos, link: "photos" });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
const getAPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    res.status(200).render("photo", { photo, link: "photos" });
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    });
  }
};
export { createPhoto, getAllPhoto, getAPhoto };
