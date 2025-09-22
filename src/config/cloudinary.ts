// Centralized Cloudinary configuration for browser uploads

type CloudinaryConfig = {
  cloudName: string;
  uploadPreset: string;
  apiUrl: string;
};

export const getCloudinaryConfig = (): CloudinaryConfig => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as
    | string
    | undefined;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as
    | string
    | undefined;

  if (!cloudName) {
    throw new Error("Missing VITE_CLOUDINARY_CLOUD_NAME in environment");
  }
  if (!uploadPreset) {
    throw new Error("Missing VITE_CLOUDINARY_UPLOAD_PRESET in environment");
  }

  return {
    cloudName,
    uploadPreset,
    apiUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  };
};

export default getCloudinaryConfig;
