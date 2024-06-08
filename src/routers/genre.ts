import { Hono } from "hono";
import {
  getGenres,
  createGenre,
  getSingleGenre,
  patchGenre,
  getMangaByGenreSlug,
} from "../controllers/genreController";

const genres = new Hono();


genres.get("/:id", async (c) => {
  return await getSingleGenre(c);
});
genres.post("/:id", async (c) => {
  return await patchGenre(c);
});
genres.get("/slug/:slug/:cursor", async (c) => {
  return await getMangaByGenreSlug(c);
});

genres.post("/", async (c) => {
  return await createGenre(c);
});
genres.get("/", async (c) => {
  return await getGenres(c);
});


export default genres;
