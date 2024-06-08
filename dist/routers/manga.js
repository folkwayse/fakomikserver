"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const mangaController_1 = require("../controllers/mangaController");
const chapterController_1 = require("../controllers/chapterController");
const mangas = new hono_1.Hono();
mangas.get("/", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.getMangas)(c);
}));
mangas.post("/getbookmark", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.getBookmark)(c);
}));
mangas.post("/hasupdate", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.hasUpdate)(c);
}));
mangas.get("/newmanga", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.getNewManga)(c);
}));
mangas.get("/newchapter", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.getNewChapter)(c);
}));
mangas.post("/searchbyname", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.searchByName)(c);
}));
mangas.post("/advancesearch", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.advanceSearch)(c);
}));
mangas.get("/getmanga/:slug", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.getMangaBySlug)(c);
}));
mangas.get("/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.getMangaById)(c);
}));
mangas.post("/", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, mangaController_1.createManga)(c);
}));
mangas.post("/:mangaId/newchapter", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, chapterController_1.addChapter)(c);
}));
exports.default = mangas;
