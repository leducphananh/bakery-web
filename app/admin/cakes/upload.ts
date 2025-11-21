"use server";

import { cloudinary } from "@/lib/cloudinary";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return {
        success: false,
        error:
          "Invalid file type. Please upload an image (JPEG, PNG, GIF, or WebP)",
      };
    }

    // Validate file size (10MB max for Cloudinary free tier)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return { success: false, error: "File size must be less than 10MB" };
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataUri = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "bakery-cakes",
      resource_type: "image",
      transformation: [
        { width: 1080, height: 1080, crop: "limit" },
        { quality: "auto" },
      ],
    });

    console.log("File uploaded successfully to Cloudinary:", {
      publicId: result.public_id,
      url: result.secure_url,
      fileSize: file.size,
    });

    return { success: true, url: result.secure_url };
  } catch (error) {
    console.error("Failed to upload image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
