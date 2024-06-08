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
exports.getMangaBySlug = exports.getNewChapter = exports.getNewManga = exports.createManga = exports.getMangaById = exports.getMangas = exports.getBookmark = exports.searchByName = exports.advanceSearch = exports.hasUpdate = void 0;
const manga_1 = require("../models/manga");
const hasUpdate = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { updateData } = yield c.req.json();
    // console.log(data)
    const manga = yield (0, manga_1.hasUpdateManga)(updateData);
    return c.json(manga, 200);
});
exports.hasUpdate = hasUpdate;
const advanceSearch = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const jsonData = yield c.req.json();
    const mangas = yield (0, manga_1.advSearch)(jsonData);
    return c.json(mangas, 200);
});
exports.advanceSearch = advanceSearch;
const searchByName = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { s } = yield c.req.json();
    // console.log(s)
    const mangas = yield (0, manga_1.mangaByName)(s);
    return c.json(mangas, 200);
});
exports.searchByName = searchByName;
const getBookmark = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { mangaIds } = yield c.req.json();
    const mangas = yield (0, manga_1.MangaByIds)(mangaIds);
    return c.json(mangas, 200);
});
exports.getBookmark = getBookmark;
const getMangas = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield (0, manga_1.AllMangas)();
    return c.json(genres, 200);
});
exports.getMangas = getMangas;
const getMangaById = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield c.req.param("id");
    const manga = yield (0, manga_1.MangaById)(id);
    return c.json({
        manga,
    }, 200);
});
exports.getMangaById = getMangaById;
const createManga = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield c.req.json();
    const manga = yield (0, manga_1.createNewManga)(data);
    try {
        return c.json(manga, 200);
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.createManga = createManga;
const getNewManga = (c) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // cursor
        const page = parseInt((_a = yield c.req.query('page')) !== null && _a !== void 0 ? _a : 1); // Mengambil nilai cursor dari parameter URL dan mengonversinya menjadi angka
        const mangas = yield (0, manga_1.newManga)(page);
        return c.json(mangas, 200);
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.getNewManga = getNewManga;
const getNewChapter = (c) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // cursor
        const page = parseInt((_b = yield c.req.query('page')) !== null && _b !== void 0 ? _b : 1); // Mengambil nilai cursor dari parameter URL dan mengonversinya menjadi angka
        const mangas = yield (0, manga_1.newChapter)(page);
        return c.json(mangas, 200);
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.getNewChapter = getNewChapter;
const getMangaBySlug = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = yield c.req.param("slug");
        const manga = yield (0, manga_1.mangaBySlug)(slug);
        return c.json(manga, 200);
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.getMangaBySlug = getMangaBySlug;
