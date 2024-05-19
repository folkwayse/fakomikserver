import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import "dotenv/config";
import genres from "../routers/genre";
import mangas from "../routers/manga";
import images from "../routers/images";
import chapters from "../routers/chapter";
import kiryu from "../routers/kiryu";
import appRoutes from "../routers/app";

const api = new Hono().basePath("/api");
const app = new Hono();

// app.get("/", (c) => {
//   return c.text("Hello Hono!");
// });
app.use("*", cors());
app.route("/", appRoutes);
api.route("/genres", genres);
api.route("/mangas", mangas);
api.route("/images", images);
api.route("/chapters", chapters);
api.route("/kiryu", kiryu);
app.route("/", api);

const port = parseInt(process.env.PORT || "3000") || 3000;

console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
