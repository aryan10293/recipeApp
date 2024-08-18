import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: './config/.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});
interface Opts{
    overwrite: boolean,
    invalidate: boolean,
    resource_type: any,
}
const opts: Opts =  {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

export const uploadImage = (image: string) => {
  // Image => base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error:any, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

// export const uploadMultipleImages = (images) => {
//   return new Promise((resolve, reject) => {
//     const uploads = images.map((base) => uploadImage(base));
//     Promise.all(uploads)
//       .then((values) => resolve(values))
//       .catch((err) => reject(err));
//   });
// };