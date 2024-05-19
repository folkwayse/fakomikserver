import * as Minio from 'minio';
import axios from 'axios'; // Make sure to install axios if it's not already installed
import { v4 as uuidv4 } from 'uuid';
const minioClient = new Minio.Client({
  endPoint: '194.233.88.135',
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || 'default',
  secretKey: process.env.MINIO_SECRET_KEY || 'default',
});

export const uploadfromurl = async (c: any) => {
  const { url } = await c.req.json();

  try {
    // Fetch the file from the URL using axios
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    });

    // Get the file buffer
    const buffer = Buffer.from(response.data);

    // Generate a unique filename (you can also get the file extension from the URL or response headers)
    const filename = `${uuidv4()}-${uuidv4()}.jpg`; // Example with jpg, adjust according to the actual file type

    // Upload the file to Minio
    await minioClient.putObject('fakomik', filename, buffer);

    // Respond with success
    
    return c.json({
      success: true,
      imageurl : `https://image.fakomik.cloud/fakomik/${filename}`,
    }, 200);
  } catch (error) {
    return c.json({
      success: false,
      error: error,
    }, 500);
  }
};
