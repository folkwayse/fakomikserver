import { Hono } from "hono";
import {
    uploadfromurl
} from "../controllers/imageController";

const genres = new Hono();

genres.post("/uploadfromurl", async (c) => {
  return await uploadfromurl(c);
});
export default genres;
