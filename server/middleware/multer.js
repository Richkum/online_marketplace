import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/cloud.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "marketplace",
    format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) => "computed-filename-using-request",
  },
});

const upload = multer({ storage: storage });

export default upload;
