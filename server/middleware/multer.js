import cloudinary from "../cloudinary/cloud.js";

const uploadImageToCloudinary = async (file) => {
  const result = await cloudinary.uploader.upload(file.tempFilePath);
  return result.secure_url;
};

export default uploadImageToCloudinary;
