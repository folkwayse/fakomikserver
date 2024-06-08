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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadfromurl = void 0;
// import * as Minio from 'minio';
const client_s3_1 = require("@aws-sdk/client-s3");
const axios_1 = __importDefault(require("axios")); // Make sure to install axios if it's not already installed
// import got from "got";
const uuid_1 = require("uuid");
// const minioClient = new Minio.Client({
//   endPoint: '194.233.88.135',
//   port: 9000,
//   useSSL: false,
//   accessKey: process.env.MINIO_ACCESS_KEY || 'default',
//   secretKey: process.env.MINIO_SECRET_KEY || 'default',
// });
const s3Client = new client_s3_1.S3Client({
    region: "default",
    endpoint: process.env.ENDPOINT, // Contabo S3 endpoint
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID || "default",
        secretAccessKey: process.env.SECRET_ACCESS_KEY || "default",
    },
    forcePathStyle: true, // Required for Contabo
});
const uploadfromurl = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = yield c.req.json();
    try {
        // Fetch the file from the URL using axios
        const response = yield (0, axios_1.default)({
            method: "get",
            url: url,
            responseType: "arraybuffer",
            maxContentLength: Infinity, // Disable the content length limit
        });
        // Get the file buffer
        const buffer = Buffer.from(response.data);
        // const response = await got(url, { responseType: "buffer" });
        // // Mengubah response data menjadi buffer
        // const buffer = response.body;
        // Generate a unique filename (you can also get the file extension from the URL or response headers)
        const filename = `${(0, uuid_1.v4)()}-${(0, uuid_1.v4)()}.jpg`; // Example with jpg, adjust according to the actual file type
        // Upload the file to Minio
        // await minioClient.putObject('fakomik', filename, buffer);
        const putObjectParams = {
            Bucket: "fakomik",
            Key: filename,
            Body: buffer,
            ACL: 'public-read', // Adjust according to your needs
        };
        const ress = yield s3Client.send(new client_s3_1.PutObjectCommand(putObjectParams));
        // console.log(ress)
        // Respond with success
        return c.json({
            success: true,
            imageurl: `https://sin1.contabostorage.com/795b9edc476a414e89248e28ac95f27c:fakomik/fakomik/${filename}`,
        }, 200);
    }
    catch (error) {
        console.error(error);
        return c.json({
            success: false,
            error: error,
        }, 500);
    }
});
exports.uploadfromurl = uploadfromurl;
