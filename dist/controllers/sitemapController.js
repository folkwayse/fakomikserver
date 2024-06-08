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
exports.getChapterUrl = void 0;
const chapter_1 = require("../models/chapter");
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
};
const getChapterUrl = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chapters = yield (0, chapter_1.allSlugOnly)();
        if (Array.isArray(chapters)) {
            const urls = chapters.map((chapter) => ({
                loc: `https://fakomik.cloud/chapters/${chapter.slug}`,
                lastmod: formatDate(chapter.updatedAt),
                changefreq: "daily",
                priority: 0.8,
            }));
            return c.json(urls, 200);
        }
        else {
            return c.json(chapters, 500);
        }
    }
    catch (error) {
        return c.json(error, 500);
    }
});
exports.getChapterUrl = getChapterUrl;
