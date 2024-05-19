import { Hono } from "hono";
import {
  getMangas,
  createManga,
  getMangaById,
  getNewManga,
  getMangaBySlug
} from "../controllers/mangaController";
import { addChapter } from "../controllers/chapterController";

const mangas = new Hono();

mangas.get("/", async (c) => {
  return await getMangas(c);
});
mangas.get("/newmanga", async (c) => {
  return await getNewManga(c);
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
