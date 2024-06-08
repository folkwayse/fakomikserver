"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
require("dotenv/config");
const genre_1 = __importDefault(require("./routers/genre"));
const manga_1 = __importDefault(require("./routers/manga"));
const images_1 = __importDefault(require("./routers/images"));
const chapter_1 = __importDefault(require("./routers/chapter"));
const kiryu_1 = __importDefault(require("./routers/kiryu"));
const sitemaps_1 = __importDefault(require("./routers/sitemaps"));
const app_1 = __importDefault(require("./routers/app"));
const api = new hono_1.Hono().basePath("/api");
const app = new hono_1.Hono();
// app.get("/", (c) => {
//   return c.text("Hello Hono!");
// });
app.use("*", (0, cors_1.cors)());
app.route("/", app_1.default);
api.route("/genres", genre_1.default);
api.route("/mangas", manga_1.default);
api.route("/images", images_1.default);
api.route("/chapters", chapter_1.default);
api.route("/kiryu", kiryu_1.default);
api.route("/sitemaps", sitemaps_1.default);
app.route("/", api);
const port = parseInt(process.env.PORT || "3000") || 3000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port,
});
