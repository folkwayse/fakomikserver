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
exports.getTitle = exports.getPrevNextChapter = exports.getChapterBySlug = exports.checkChapterSlug = exports.addChapter = void 0;
const chapter_1 = require("../models/chapter");
const addChapter = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const mangaId = yield c.req.param("mangaId");
    const data = yield c.req.json();
    const Chapter = yield (0, chapter_1.addNewChapter)(mangaId, data);
    return c.json({
        Chapter,
    }, 200);
});
exports.addChapter = addChapter;
const checkChapterSlug = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = yield c.req.json();
    const exists = yield (0, chapter_1.isSlugExists)(title);
    return c.json({
        exists,
    }, 200);
});
exports.checkChapterSlug = checkChapterSlug;
const getChapterBySlug = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = yield c.req.param("slug");
    const Chapter = yield (0, chapter_1.ChapterBySlug)(slug);
    return c.json({
        Chapter,
    }, 200);
});
exports.getChapterBySlug = getChapterBySlug;
const getPrevNextChapter = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = yield c.req.param("slug");
    const data = yield (0, chapter_1.prevNextChapter)(slug);
    if (typeof data === "object" && data !== null) {
        return c.json(Object.assign({}, data), 200);
    }
    else {
        // Handle the case when data is not an object
        return c.json({
            error: "Invalid data"
        }, 400);
    }
});
exports.getPrevNextChapter = getPrevNextChapter;
const getTitle = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = yield c.req.param("slug");
    const Chapter = yield (0, chapter_1.chapterTitle)(slug);
    return c.json({
        Chapter,
    }, 200);
});
exports.getTitle = getTitle;
