import { prisma } from "../utils/prisma";
import { makeAslug } from "../utils/slug";
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
        rating : manga.rating <10 ? manga.rating*10 : manga.rating,
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

export const newManga = async (cursor?: string): Promise<any> => {
  try {
    const mangas = await prisma.manga.findMany({
      take: 24, // Limit to 24 items per page
      skip: cursor ? 1 : 0, // Skip the cursor if it exists
      cursor: cursor ? { id: cursor } : undefined, // Use cursor for pagination
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
        slug: true,
      },
    });

    // Get the next cursor
    // const nextCursor = mangas.length === 24 ? mangas[23].id : null;

    return {
      mangas,
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
