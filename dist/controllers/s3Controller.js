"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const uuid_1 = require("uuid");
const bucketName = "swapit-item-images-original";
const region = "eu-north-1";
const credentials = {
    region: region,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};
const s3Client = new client_s3_1.S3Client(credentials);
const generateUploadUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        const fileType = req.query.fileType || "jpg";
        const contentType = req.query.contentType || "image/jpeg";
        if (!itemId) {
            return res.status(400).json({ error: "Item ID is required" });
        }
        const fileName = `${(0, uuid_1.v4)()}.${fileType}`;
        const key = `${itemId}/${fileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            ContentType: contentType,
        });
        const signedUrl = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
            expiresIn: 600,
        });
        res.json({ uploadUrl: signedUrl, key: key });
    }
    catch (error) {
        console.error("Error generating upload URL:", error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.default = {
    generateUploadUrl,
};
