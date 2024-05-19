import { Hono } from "hono";
import {
  getGenres,
  createGenre,
  getSingleGenre,
  patchGenre,
} from "../controllers/genreController";

const genres = new Hono();

genres.get("/", async (c) => {
  return await getGenres(c);
});
genres.get("/:id", async (c) => {
  return await getSingleGenre(c);
});
genres.post("/:id", async (c) => {
  return await patchGenre(c);
});
genres.post("/", async (c) => {
  return await createGenre(c);
});

export default genres;
