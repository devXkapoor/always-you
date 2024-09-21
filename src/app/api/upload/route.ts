import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "cloudinary";
import { Readable } from "stream";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define the expected structure of the upload result from Cloudinary
interface CloudinaryUploadResult {
  secure_url: string;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const text = formData.get("text") as string;
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    // Convert file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a readable stream from the buffer
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signal the end of the stream

    // Upload to Cloudinary
    const uploadResult = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          }
        );

        stream.pipe(uploadStream);
      }
    );

    // Check if the result is defined
    if (!uploadResult || !uploadResult.secure_url) {
      return NextResponse.json(
        { error: "Upload failed, no URL returned" },
        { status: 500 }
      );
    }

    // Create the memory in the database
    const newMemory = await prisma.memory.create({
      data: {
        text: text,
        imageUrl: uploadResult.secure_url, // Use 'imageUrl' as defined in your model
      },
    });

    return NextResponse.json({ memory: newMemory }, { status: 201 });
  } catch (error) {
    console.error("Error during upload:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
