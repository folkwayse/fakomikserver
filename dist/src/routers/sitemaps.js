import { Hono } from "hono";
import { getChapterUrl } from "../controllers/sitemapController";
const mangas = new Hono();
mangas.get("/chapters", async (c) => {
    return await getChapterUrl(c);
});
export default mangas;
