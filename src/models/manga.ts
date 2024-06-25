import { prisma } from "../utils/prisma";
import { makeAslug } from "../utils/slug";

export const hasUpdateManga = async (updateData: any[]): Promise<any> => {
  try {
    //update manga has_update to true
    for (const data of updateData) {
      const existingManga = await prisma.manga.findFirst({
        where: {
          slug: data.slug,
          last_chapter_number: {
            not: data.chapter_number,
          },
        },
      });
      if (existingManga) {
        await prisma.manga.update({
          where: {
            slug: data.slug,
          },
          data: {
            has_update: true,
          },
        });
      }
    }

    return true;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
export const advSearch = async (data: any): Promise<any> => {
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

    const genres = data.genres.map((genre: any) => genre.name);

    // Build the where clause
    const whereClause: any = {
      AND: genres.map((genre: string) => ({
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

    return await prisma.manga.findMany({
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
  } catch (error) {
    console.log(error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
export const AllMangas = async (): Promise<any> => {
  try {
    return prisma.manga.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const createNewManga = async (manga: any): Promise<any> => {
  try {
    const slug = makeAslug(manga.title);

    // Extract genre IDs from the manga object
    const genreIds = manga.genre; // Assuming manga.genres is an array of genre IDs

    // Create new manga with nested genres relation
    const newManga = await prisma.manga.create({
      data: {
        ...manga,
        rating: manga.rating < 10 ? manga.rating * 10 : manga.rating,
        start_chapters: "",
        last_chapters: "",
        views: 0,
        slug: slug,
        genre: {
          connect: genreIds.map((id: string) => ({ id })),
        },
      },
    });

    console.log(newManga);
    return newManga;
  } catch (error) {
    console.error("Error creating new manga:", error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const MangaByIds = async (ids: string[]): Promise<any> => {
  try {
    const mangas = await prisma.manga.findMany({
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
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
export const MangaById = async (id: string): Promise<any> => {
  try {
    const manga = await prisma.manga.findUnique({
      where: {
        id,
      },
    });
    return manga;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const newManga = async (page: number = 1): Promise<any> => {
  try {
    const mangas = await prisma.manga.findMany({
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
        chapter: {
          take: 2,
          orderBy: {
            chapter_number: "desc",
          },
          select: {
            chapter_number: true,
            // name: true,
            slug: true,
          },
        },
      },
    });

    // Get the next cursor
    // const nextCursor = mangas.length === 24 ? mangas[23].id : null;
    const total = await prisma.manga.count();
    const nextPage = page < Math.ceil(total / 24) ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
      mangas,
      nextPage,
      prevPage,
      // nextCursor,
    };
  } catch (error) {
    console.error("Error getting new manga:", error);

    return error;
  } finally {
    await prisma.$disconnect();
  }
};
export const newChapter = async (page: number = 1): Promise<any> => {
  try {
    const mangas = await prisma.manga.findMany({
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
        last_chapter_number: true,
        rating: true,
        views: true,
        poster: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
        chapter: {
          take: 2,
          orderBy: {
            chapter_number: "desc",
          },
          select: {
            chapter_number: true,
            // name: true,
            slug: true,
          },
        },
      },
    });

    // Get the next cursor
    // const nextCursor = mangas.length === 24 ? mangas[23].id : null;
    const total = await prisma.manga.count();
    const nextPage = page < Math.ceil(total / 24) ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;
    return {
      mangas,
      nextPage,
      prevPage,

      // nextCursor,
    };
  } catch (error) {
    console.error("Error getting new manga:", error);

    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const mangaBySlug = async (slug: string): Promise<any> => {
  try {
    const manga = await prisma.manga.findUnique({
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
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const mangaByName = async (s: string): Promise<any> => {
  try {
    const mangas = await prisma.manga.findMany({
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
        views: true,
        poster: true,
        // createdAt: true,
        slug: true,
      },
    });
    return mangas;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
