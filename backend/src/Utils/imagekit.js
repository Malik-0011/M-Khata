import ImageKit from "@imagekit/nodejs";

//1. setup imagekit credentials
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file) {
  if (!file) {
    return null;
  }
 

  const imagekitResponse = await imagekit.files.upload({
    file: file.buffer.toString('base64'),
    fileName: file.originalname,
    folder: "/M-Khata/uploads",
    useUniqueFileName: true,
  });

  return imagekitResponse.url;
}

export default uploadFile;
