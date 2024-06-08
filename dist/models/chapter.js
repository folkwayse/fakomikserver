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
exports.allSlugOnly = exports.chapterTitle = exports.prevNextChapter = exports.ChapterBySlug = exports.isSlugExists = exports.addNewChapter = void 0;
const prisma_1 = require("../utils/prisma");
const slug_1 = require("../utils/slug");
const addNewChapter = (mangaId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = (0, slug_1.makeAslug)(data.name);
        console.log(slug);
        const chapter = yield prisma_1.prisma.chapter.create({
            data: Object.assign(Object.assign({}, data), { manga_id: mangaId, description: "", slug }),
        });
        // update manga last_chapters
        yield prisma_1.prisma.manga.update({
            where: {
                id: mangaId,
            },
            data: {
                last_chapters: chapter.name,
                last_chapter_number: chapter.chapter_number,
                has_update: false,
            },
        });
    }
    catch (error) {
        console.error("Error creating new chapter:", error);
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.addNewChapter = addNewChapter;
const isSlugExists = (title) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = (0, slug_1.makeAslug)(title);
        const chapter = yield prisma_1.prisma.chapter.findUnique({
            where: {
                slug,
            },
        });
        return !!chapter;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.isSlugExists = isSlugExists;
const ChapterBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chapter = yield prisma_1.prisma.chapter.findUnique({
            where: {
                slug,
            },
            include: {
                manga: true,
            },
        });
        return chapter;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.ChapterBySlug = ChapterBySlug;
/**
 * Retrieves the previous and next chapters for a given chapter slug.
 *
 * @param {string} slug - The slug of the chapter.
 * @return {Promise<{ prev: Chapter | null, next: Chapter | null }>} - An object containing the previous and next chapters, or null if they don't exist.
 * @throws {Error} - If there is an error fetching the chapter.
 */
const prevNextChapter = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get all chapters with same manga id by slug
        const manga = yield prisma_1.prisma.chapter.findUnique({
            where: {
                slug,
            },
            select: {
                manga_id: true,
            },
        });
        const chapters = yield prisma_1.prisma.chapter.findMany({
            where: {
                manga_id: manga === null || manga === void 0 ? void 0 : manga.manga_id,
            },
            orderBy: {
                chapter_number: "asc",
            },
            select: {
                slug: true,
                chapter_number: true,
            },
        });
        const chapterIndex = chapters.findIndex((chapter) => chapter.slug === slug);
        const prevChapter = chapters[chapterIndex - 1];
        const nextChapter = chapters[chapterIndex + 1];
        return {
            prev: prevChapter || null,
            next: nextChapter || null,
        };
    }
    catch (error) {
        console.error("Error fetching chapter:", error);
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.prevNextChapter = prevNextChapter;
const chapterTitle = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chapter = yield prisma_1.prisma.chapter.findFirst({
            where: {
                slug,
            },
            select: {
                name: true,
                slug: true,
                manga: true,
            },
        });
        if (!chapter) {
            throw new Error(`Chapter with slug '${slug}' not found.`);
        }
        return chapter;
    }
    catch (error) {
        console.error("Error fetching chapter:", error);
        return { error: "An error occurred while fetching the chapter." };
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.chapterTitle = chapterTitle;
const allSlugOnly = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chapters = yield prisma_1.prisma.chapter.findMany({
            select: {
                slug: true,
                updatedAt: true,
            },
        });
        return chapters;
    }
    catch (error) {
        console.error("Error fetching chapter:", error);
        return { error: "An error occurred while fetching the chapter." };
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.allSlugOnly = allSlugOnly;
