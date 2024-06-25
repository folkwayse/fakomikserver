import { prisma } from "../utils/prisma";
import { makeAslug } from "../utils/slug";

export const getChapterList = async (slug: string) => {
  try {
    const thisCahpter = await prisma.chapter.findUnique({
      where: {
        slug,
      },
      select: {
        manga_id: true,
      },
    });

    if (!thisCahpter) {
      return [];
    }
    // console.log(thisCahpter.manga_id);
    const chapters = await prisma.chapter.findMany({
      where: {
        manga_id: thisCahpter?.manga_id,
      },
      select: {
        slug: true,
        chapter_number: true,
      },
      orderBy: {
        chapter_number: "desc",
      },
    });
    return chapters;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
export const addNewChapter = async (mangaId: string, data: any) => {
  try {
    const slug = makeAslug(data.name);
    console.log(slug);
    const chapter = await prisma.chapter.create({
      data: {
        ...data,
        manga_id: mangaId,
        description: "",
        slug,
      },
    });
    // update manga last_chapters
    await prisma.manga.update({
      where: {
        id: mangaId,
      },
      data: {
        last_chapters: chapter.name,
        last_chapter_number: chapter.chapter_number,
        has_update: false,
      },
    });
  } catch (error) {
    console.error("Error creating new chapter:", error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const isSlugExists = async (title: string) => {
  try {
    const slug = makeAslug(title);
    const chapter = await prisma.chapter.findUnique({
      where: {
        slug,
      },
    });

    return !!chapter;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const ChapterBySlug = async (slug: string) => {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: {
        slug,
      },
      include: {
        manga: true,
      },
    });

    return chapter;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

/**
 * Retrieves the previous and next chapters for a given chapter slug.
 *
 * @param {string} slug - The slug of the chapter.
 * @return {Promise<{ prev: Chapter | null, next: Chapter | null }>} - An object containing the previous and next chapters, or null if they don't exist.
 * @throws {Error} - If there is an error fetching the chapter.
 */

export const prevNextChapter = async (slug: string) => {
  try {
    //get all chapters with same manga id by slug
    const manga = await prisma.chapter.findUnique({
      where: {
        slug,
      },
      select: {
        manga_id: true,
      },
    });

    const chapters = await prisma.chapter.findMany({
      where: {
        manga_id: manga?.manga_id,
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
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
const incementViews = async (id: string): Promise<void> => {
  try {
    // await prisma.manga.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     views: {
    //       increment: 1,
    //     },
    //   },
    // });
    const query = `UPDATE "Manga" SET "views" = "views" + 1 WHERE "id" = $1`;

    await prisma.$executeRawUnsafe(query, id);
    return;
  } catch (error) {
    console.error("Error incrementing views:", error);
    return;
  } finally {
    await prisma.$disconnect();
  }

  // console.log(id);
  return;
};

export const chapterTitle = async (slug: string) => {
  try {
    const chapter = await prisma.chapter.findFirst({
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
    // add increment view
    // console.log(chapter.manga.id);
    incementViews(chapter.manga.id);
    return chapter;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return { error: "An error occurred while fetching the chapter." };
  } finally {
    await prisma.$disconnect();
  }
};

export const allSlugOnly = async () => {
  try {
    const chapters = await prisma.chapter.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });
    return chapters;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return { error: "An error occurred while fetching the chapter." };
  } finally {
    await prisma.$disconnect();
  }
};
