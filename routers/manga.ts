import { Hono } from "hono";
import {
  getMangas,
  createManga,
  getMangaById,
  getNewManga,
  getMangaBySlug,
  searchByName,
  getBookmark,
  getNewChapter,
  advanceSearch
  
} from "../controllers/mangaController";
import { addChapter } from "../controllers/chapterController";

const mangas = new Hono();

mangas.get("/", async (c) => {
  return await getMangas(c);
});

mangas.post("/getbookmark", async (c) => {
  
  return await getBookmark(c);
});


mangas.get("/newmanga", async (c) => {
  return await getNewManga(c);
});
mangas.get("/newchapter", async (c) => {
  return await getNewChapter(c);
});
mangas.post("/searchbyname", async (c) => {
  return await searchByName(c);
});
mangas.post("/advancesearch", async (c) => {
  return await advanceSearch(c);
});
mangas.get("/getmanga/:slug", async (c) => {
  return await getMangaBySlug(c);
});

mangas.get("/:id", async (c) => {
  return await getMangaById(c);
});
mangas.post("/", async (c) => {
  return await createManga(c);
});

mangas.post("/:mangaId/newchapter", async (c) => {
  return await addChapter(c);
});


export default mangas;
