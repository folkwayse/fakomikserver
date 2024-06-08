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
const genreController_1 = require("../controllers/genreController");
const genres = new hono_1.Hono();
genres.get("/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, genreController_1.getSingleGenre)(c);
}));
genres.post("/:id", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, genreController_1.patchGenre)(c);
}));
genres.get("/slug/:slug/:cursor", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, genreController_1.getMangaByGenreSlug)(c);
}));
genres.post("/", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, genreController_1.createGenre)(c);
}));
genres.get("/", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, genreController_1.getGenres)(c);
}));
exports.default = genres;
