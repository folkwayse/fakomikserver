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
exports.patch = exports.getGenreById = exports.createNewGenre = exports.AllGenres = exports.MangaByGenreSlug = void 0;
const prisma_1 = require("../utils/prisma");
const MangaByGenreSlug = (slug, cursor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const take = 24;
        const genre = yield prisma_1.prisma.genre.findUnique({
            where: {
                slug,
            },
            include: {
                manga: {
                    orderBy: {
                        createdAt: "desc",
                    },
                    skip: cursor, // Menggunakan cursor untuk melompati data sebelumnya
                    take: take,
                },
            },
        });
        // Menghitung total data manga pada genre tertentu
        const total = yield prisma_1.prisma.manga.count({
            where: {
                genre: {
                    some: {
                        slug,
                    },
                },
            },
        });
        // Menghitung cursor untuk halaman berikutnya
        const nextCursor = cursor + take >= total ? null : cursor + take;
        // Menghitung cursor untuk halaman sebelumnya
        const prevCursor = cursor - take < 0 ? null : cursor - take;
        return {
            genre,
            total,
            nextCursor,
            prevCursor,
        };
    }
    catch (error) {
        console.log(error);
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.MangaByGenreSlug = MangaByGenreSlug;
const AllGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return prisma_1.prisma.genre.findMany({
            select: {
                id: true,
                name: true,
                slug: true,
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
exports.AllGenres = AllGenres;
const makeAslug = (name) => {
    // check slug on genre
    return name.replace(/\s+/g, "-").toLowerCase();
};
const createNewGenre = (name_1, description_1, ...args_1) => __awaiter(void 0, [name_1, description_1, ...args_1], void 0, function* (name, description, isMature = false) {
    try {
        const slug = makeAslug(name);
        return prisma_1.prisma.genre.create({
            data: {
                name,
                description,
                slug,
                isMature,
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
exports.createNewGenre = createNewGenre;
const getGenreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = yield prisma_1.prisma.genre.findUnique({
            where: {
                id,
            },
        });
        return genre;
    }
    catch (error) {
        return error;
    }
    finally {
        yield prisma_1.prisma.$disconnect();
    }
});
exports.getGenreById = getGenreById;
const patch = (id_1, name_2, description_2, ...args_2) => __awaiter(void 0, [id_1, name_2, description_2, ...args_2], void 0, function* (id, name, description, isMature = false) {
    try {
        const slug = makeAslug(name);
        return prisma_1.prisma.genre.update({
            where: {
                id,
            },
            data: {
                name,
                description,
                slug,
                isMature,
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
exports.patch = patch;
