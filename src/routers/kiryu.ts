import { Hono } from "hono";
import {
  getMangaDetailById,
  getChapterByid,
} from "../controllers/kiryuController";

const genres = new Hono();

genres.post("/getmangadetailbyid", async (c) => {
  return await getMangaDetailById(c);
});

genres.post("/getchaptersbyid", async (c) => {
  return await getChapterByid(c);
});
export default genres;
