import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (localImagePath, folderName) => {
  try {
    let cloudinaryResponse = null;
    if (localImagePath) {
      cloudinaryResponse = await cloudinary.uploader.upload(localImagePath, {
        folder: folderName,
      });
    }
    fs.unlink(localImagePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });
    return cloudinaryResponse;
  } catch (error) {
    throw error;
  }
};

export default cloudinary;

export const extractPublicId = (imageURL) => {
  const urlParts = imageURL.split("/");
  const folder = urlParts[urlParts.length - 2];
  const fileNameWithExt = urlParts[urlParts.length - 1];
  const fileName = fileNameWithExt.split(".")[0];

  const publicId = `${folder}/${fileName}`;
  return publicId;
};
