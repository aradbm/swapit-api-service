import { Request, Response } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const bucketName = "swapit-item-images-original";
const region = "eu-north-1";

const credentials = {
  region: region,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const s3Client = new S3Client(credentials);

const generateUploadUrl = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.itemId;
    const fileType = (req.query.fileType as string) || "jpg";
    const contentType = (req.query.contentType as string) || "image/jpeg";

    if (!itemId) {
      return res.status(400).json({ error: "Item ID is required" });
    }

    const fileName = `${uuidv4()}.${fileType}`;
    const key = `${itemId}/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 600,
    });

    res.json({ uploadUrl: signedUrl, key: key });
  } catch (error) {
    console.error("Error generating upload URL:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

export default {
  generateUploadUrl,
};
