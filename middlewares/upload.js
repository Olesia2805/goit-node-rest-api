import multer from "multer";
import path from "node:path";
import { callbackify } from "node:util";
import { imageExtensionOptions } from "../constants/messages.js";
import HttpError from "../helpers/HttpError.js";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    callback(null, filename);
  },
});

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split(".").pop();
  if (!imageExtensionOptions.includes(extension)) {
    return callback(HttpError(400, "expansion not allowed"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
