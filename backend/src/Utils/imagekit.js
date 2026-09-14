import fs from "fs";
import ImageKit from "@imagekit/nodejs";

//1. setup imagekit credentials
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(req, res) {
  try {
    // Check if a file was actually uploaded by the client
    if (!req.file) {
      return res.status(400).json({ error: "Please select a file to upload." });
    }

    // Send the file buffer directly to ImageKit
    const imagekitResponse = await imagekit.upload({
      file: req.file.buffer, // The file buffer from Multer
      fileName: req.file.originalname, // The original name of the file
      folder: "/M-Khata/uploads", // Optional: target folder in ImageKit Media Library
      useUniqueFileName: true, // Optional: prevents duplicates by appending random string
    });

    console.log(imagekitResponse.url);

    // Return the ImageKit response object back to the client
    return res.status(200).json({
      message: "File uploaded successfully to ImageKit!",
      data: imagekitResponse,
    });
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return res.status(500).json({
      error: "Failed to upload file to ImageKit.",
      details: error.message,
    });
  }
}

export default uploadFile;
