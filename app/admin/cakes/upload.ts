"use server";

import { bucketName, initializeBucket, minioClient } from "@/lib/minio";

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

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return { success: false, error: "File size must be less than 5MB" };
    }

    // Ensure bucket exists
    await initializeBucket();

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, "-");
    const filename = `cakes/${timestamp}-${originalName}`;

    // Upload to MinIO
    await minioClient.putObject(bucketName, filename, buffer, buffer.length, {
      "Content-Type": file.type,
    });

    console.log("File uploaded successfully to MinIO:", {
      filename,
      bucket: bucketName,
      fileSize: file.size,
    });

    // Generate public URL
    const publicUrl = `${process.env.MINIO_PUBLIC_URL}/${bucketName}/${filename}`;
    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Failed to upload image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
