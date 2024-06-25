import { Hono } from "hono";
import {
  addChapter,
  getChapterBySlug,
  getPrevNextChapter,
  getTitle,
  checkChapterSlug,
  // getChapterbyMangaSlug
} from "../controllers/chapterController";

import { getChapterList } from "../models/chapter";

const chapters = new Hono();
chapters.post("/checkslug", async (c) => {
  return await checkChapterSlug(c);
});
chapters.get("/getchapter/:slug", async (c) => {
  return await getChapterBySlug(c);
});

chapters.get("/chapterlist/:slug", async (c) => {
  const slug =  c.req.param("slug");
  // console.log(slug)
  const chapters = await getChapterList(slug) as any;
  
  return c.json(chapters, 200);
});

// chapters.get("/getchapterlist/:slug", async (c) => {
//   return await getChapterbyMangaSlug(c);
// });
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
