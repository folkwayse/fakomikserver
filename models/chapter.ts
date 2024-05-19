import { prisma } from "../utils/prisma";
import { makeAslug } from "../utils/slug";

export const addNewChapter = async (mangaId: string, data: any) => {
  try {
    const slug = makeAslug(data.name);
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
      },
    });
  } catch (error) {
    console.error("Error creating new chapter:", error);
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
        manga: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });
    return chapter;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const prevChapter = async (slug: string) => {
  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        slug: {
          lt: slug,
        },
      },
      select: {
        name: true,
        slug: true,
      },
      orderBy: {
        slug: "desc",
      },
    });
    return chapter;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const nextChapter = async (slug: string) => {
  try {
    const chapter = await prisma.chapter.findFirst({
      where: {
        slug: {
          gt: slug,
        },
      },
      select: {
        name: true,
        slug: true,
      },
      orderBy: {
        slug: "asc",
      },
    });
    return chapter;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
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
        manga: {
          select: {
            title: true,
            slug: true,
          },
        },
      },
    });

    if (!chapter) {
      throw new Error(`Chapter with slug '${slug}' not found.`);
    }

    return chapter;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return { error: "An error occurred while fetching the chapter." };
  } finally {
    await prisma.$disconnect();
  }
};
