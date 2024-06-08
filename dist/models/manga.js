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
exports.mangaByName = exports.mangaBySlug = exports.newChapter = exports.newManga = exports.MangaById = exports.MangaByIds = exports.createNewManga = exports.AllMangas = exports.advSearch = exports.hasUpdateManga = void 0;
const prisma_1 = require("../utils/prisma");
const slug_1 = require("../utils/slug");
const hasUpdateManga = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //update manga has_update to true
        for (const data of updateData) {
            const existingManga = yield prisma_1.prisma.manga.findFirst({
                where: {
                    slug: data.slug,
                    last_chapter_number: {
                        not: data.chapter_number
                    }
                }
            });
            if (existingManga) {
                yield prisma_1.prisma.manga.update({
                    where: {
                        slug: data.slug
                    },
                    data: {
                        has_update: true
                    }
                });
            }
        }
        return true;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.hasUpdateManga = hasUpdateManga;
const advSearch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Set default sorting field if sortyBy is null or undefined
        let sortField;
        switch (data.sortyBy) {
            case "release":
                sortField = "release_year";
                break;
            case "rating":
                sortField = "rating";
                break;
            case "popularity":
                sortField = "views";
                break;
            case "update":
                sortField = "updatedAt";
                break;
            case "terbaru":
                sortField = "createdAt";
                break;
            default:
                sortField = "updatedAt";
                break;
        }
        const genres = data.genres.map((genre) => genre.name);
        // Build the where clause
        const whereClause = {
            AND: genres.map((genre) => ({
                genre: {
                    some: {
                        name: genre,
                    },
                },
            })),
        };
        // Add type to the where clause if it's provided
        if (data.type) {
            whereClause.type = {
                contains: data.type,
                mode: "insensitive",
            };
        }
        return yield prisma_1.prisma.manga.findMany({
            where: whereClause,
            include: {
                genre: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
            },
            orderBy: {
                [sortField]: "desc", // or 'asc' depending on your sorting requirement
            },
        });
    }
    catch (error) {
        console.log(error);
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.advSearch = advSearch;
const AllMangas = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return prisma_1.prisma.manga.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.AllMangas = AllMangas;
const createNewManga = (manga) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = (0, slug_1.makeAslug)(manga.title);
        // Extract genre IDs from the manga object
        const genreIds = manga.genre; // Assuming manga.genres is an array of genre IDs
        // Create new manga with nested genres relation
        const newManga = yield prisma_1.prisma.manga.create({
            data: Object.assign(Object.assign({}, manga), { rating: manga.rating < 10 ? manga.rating * 10 : manga.rating, start_chapters: "", last_chapters: "", views: 0, slug: slug, genre: {
                    connect: genreIds.map((id) => ({ id })),
                } }),
        });
        console.log(newManga);
        return newManga;
    }
    catch (error) {
        console.error("Error creating new manga:", error);
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.createNewManga = createNewManga;
const MangaByIds = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mangas = yield prisma_1.prisma.manga.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            orderBy: {
                updatedAt: "desc",
            },
        });
        return mangas;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.MangaByIds = MangaByIds;
const MangaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manga = yield prisma_1.prisma.manga.findUnique({
            where: {
                id,
            },
        });
        return manga;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.MangaById = MangaById;
const newManga = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1) {
    try {
        const mangas = yield prisma_1.prisma.manga.findMany({
            take: 24, // Limit to 24 items per page
            skip: (page - 1) * 24,
            orderBy: {
                createdAt: "desc", // Order by createdAt
            },
            select: {
                title: true,
                type: true,
                status: true,
                last_chapters: true,
                rating: true,
                views: true,
                poster: true,
                createdAt: true,
                updatedAt: true,
                slug: true,
            },
        });
        // Get the next cursor
        // const nextCursor = mangas.length === 24 ? mangas[23].id : null;
        const total = yield prisma_1.prisma.manga.count();
        const nextPage = page < Math.ceil(total / 24) ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
        return {
            mangas,
            nextPage,
            prevPage,
            // nextCursor,
        };
    }
    catch (error) {
        console.error("Error getting new manga:", error);
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.newManga = newManga;
const newChapter = (...args_2) => __awaiter(void 0, [...args_2], void 0, function* (page = 1) {
    try {
        const mangas = yield prisma_1.prisma.manga.findMany({
            take: 24, // Limit to 24 items per page
            skip: (page - 1) * 24,
            orderBy: {
                updatedAt: "desc", // Order by createdAt
            },
            select: {
                title: true,
                type: true,
                status: true,
                last_chapters: true,
                rating: true,
                views: true,
                poster: true,
                createdAt: true,
                updatedAt: true,
                slug: true,
            },
        });
        // Get the next cursor
        // const nextCursor = mangas.length === 24 ? mangas[23].id : null;
        const total = yield prisma_1.prisma.manga.count();
        const nextPage = page < Math.ceil(total / 24) ? page + 1 : null;
        const prevPage = page > 1 ? page - 1 : null;
        return {
            mangas,
            nextPage,
            prevPage,
            // nextCursor,
        };
    }
    catch (error) {
        console.error("Error getting new manga:", error);
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.newChapter = newChapter;
const mangaBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manga = yield prisma_1.prisma.manga.findUnique({
            where: {
                slug,
            },
            include: {
                genre: {
                    select: {
                        name: true,
                        slug: true,
                    },
                },
                chapter: {
                    select: {
                        name: true,
                        slug: true,
                        chapter_number: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                }, // Menyertakan semua data chapter yang terkait dengan manga
            },
        });
        return manga;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.mangaBySlug = mangaBySlug;
const mangaByName = (s) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mangas = yield prisma_1.prisma.manga.findMany({
            where: {
                title: {
                    contains: s,
                    mode: "insensitive",
                },
            },
            select: {
                title: true,
                type: true,
                // status: true,
                last_chapters: true,
                rating: true,
                // views: true,
                poster: true,
                // createdAt: true,
                slug: true,
            },
        });
        return mangas;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.mangaByName = mangaByName;
