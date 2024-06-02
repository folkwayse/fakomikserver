// import * as Minio from 'minio';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import axios from "axios"; // Make sure to install axios if it's not already installed
// import got from "got";
import { v4 as uuidv4 } from "uuid";
// const minioClient = new Minio.Client({
//   endPoint: '194.233.88.135',
//   port: 9000,
//   useSSL: false,
//   accessKey: process.env.MINIO_ACCESS_KEY || 'default',
//   secretKey: process.env.MINIO_SECRET_KEY || 'default',
// });


const s3Client = new S3Client({
  region: "default",
  endpoint: process.env.ENDPOINT, // Contabo S3 endpoint
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || "default",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || "default",
  },
  forcePathStyle: true, // Required for Contabo
});

export const uploadfromurl = async (c: any) => {
  const { url } = await c.req.json();

  try {
    // Fetch the file from the URL using axios
    const response = await axios({
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
    const filename = `${uuidv4()}-${uuidv4()}.jpg`; // Example with jpg, adjust according to the actual file type

    // Upload the file to Minio
    // await minioClient.putObject('fakomik', filename, buffer);
    const putObjectParams = {
      Bucket: "fakomik",
      Key: filename,
      Body: buffer,
      ACL: "public-read", // Adjust according to your needs
    };
    const ress = await s3Client.send(new PutObjectCommand(putObjectParams));
    // console.log(ress)
    // Respond with success

    return c.json(
      {
        success: true,
        imageurl: `https://sin1.contabostorage.com/795b9edc476a414e89248e28ac95f27c:fakomik/fakomik/${filename}`,
      },
      200
    );
  } catch (error) {
    console.error(error);
    return c.json(
      {
        success: false,
        error: error,
      },
      500
    );
  }
};
