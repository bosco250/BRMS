import getCloudinaryConfig from "../config/cloudinary";

export type UploadImageOptions = {
  file: File | Blob;
  folder?: string; // optional: Cloudinary folder
  onProgress?: (percent: number) => void;
};

export type UploadImageResult = {
  secureUrl: string;
  publicId: string;
};

/**
 * Upload an image to Cloudinary from the browser and return the secure URL.
 * Requires VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.
 */
export const uploadImage = async (
  options: UploadImageOptions
): Promise<UploadImageResult> => {
  const { apiUrl, uploadPreset } = getCloudinaryConfig();

  const formData = new FormData();
  formData.append("file", options.file);
  formData.append("upload_preset", uploadPreset);
  if (options.folder) {
    formData.append("folder", options.folder);
  }

  const xhr = new XMLHttpRequest();

  const response: UploadImageResult = await new Promise((resolve, reject) => {
    xhr.open("POST", apiUrl);

    xhr.upload.onprogress = (event) => {
      if (options.onProgress && event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        options.onProgress(percent);
      }
    };

    xhr.onerror = () => reject(new Error("Image upload failed"));
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ secureUrl: data.secure_url, publicId: data.public_id });
        } else {
          reject(new Error(data.error?.message || "Upload error"));
        }
      } catch (e) {
        reject(new Error("Invalid response from upload server"));
      }
    };

    xhr.send(formData);
  });

  return response;
};

export default uploadImage;
