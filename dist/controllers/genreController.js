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
exports.patchGenre = exports.getSingleGenre = exports.createGenre = exports.getGenres = exports.getMangaByGenreSlug = void 0;
const genre_1 = require("../models/genre");
const getMangaByGenreSlug = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = c.req.param('slug');
        const cursor = parseInt(c.req.param('cursor')) || 0; // Mengambil nilai cursor dari parameter URL dan mengonversinya menjadi angka
        const manga = yield (0, genre_1.MangaByGenreSlug)(slug, cursor); // Menggunakan cursor sebagai parameter untuk mengambil data
        return c.json(manga, 200);
    }
    catch (error) {
        console.log(error);
        return c.json(error, 500);
    }
});
exports.getMangaByGenreSlug = getMangaByGenreSlug;
const getGenres = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const genres = yield (0, genre_1.AllGenres)();
    return c.json(genres, 200);
});
exports.getGenres = getGenres;
const createGenre = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, isMature } = yield c.req.json();
    try {
        const genre = yield (0, genre_1.createNewGenre)(name, description, isMature ? true : false);
        return c.json(genre, 200);
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.createGenre = createGenre;
const getSingleGenre = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield c.req.param("id");
        const genre = yield (0, genre_1.getGenreById)(id);
        return c.json(genre, 200);
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.getSingleGenre = getSingleGenre;
const patchGenre = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = yield c.req.param("id");
        const { name, description, isMature } = yield c.req.json();
        const genre = yield (0, genre_1.patch)(id, name, description, isMature ? true : false);
        return c.json(genre, 200);
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.patchGenre = patchGenre;
