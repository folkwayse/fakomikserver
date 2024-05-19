import { Hono } from "hono";
import {
  addChapter,
  getChapterBySlug,
  getPrevNextChapter,
  getTitle
} from "../controllers/chapterController";

const chapters = new Hono();

chapters.get("/getchapter/:slug", async (c) => {
  return await getChapterBySlug(c);
});
chapters.get("/getprevnext/:slug", async (c) => {
  return await getPrevNextChapter(c);
});
chapters.get("/gettitle/:slug", async (c) => {
  return await getTitle(c);
});

chapters.post("/:mangaId", async (c) => {
  return await addChapter(c);
});

export default chapters;
