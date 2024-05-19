import { prisma } from "../utils/prisma";

export const AllGenres = async (): Promise<any> => {
  try {
    return prisma.genre.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

const makeAslug = (name: string) => {
  // check slug on genre
  return name.replace(/\s+/g, "-").toLowerCase();
};

export const createNewGenre = async (
  name: string,
  description: string,
  isMature: boolean = false
): Promise<any> => {
  try {
    const slug = makeAslug(name);
    return prisma.genre.create({
      data: {
        name,
        description,
        slug,
        isMature,
      },
    });
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getGenreById = async (id: string): Promise<any> => {
  try {
    const genre = await prisma.genre.findUnique({
      where: {
        id,
      },
    });

    return genre;
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};

export const patch = async (
  id: string,
  name: string,
  description: string,
  isMature: boolean = false
): Promise<any> => {
  try {
    const slug = makeAslug(name);
    return prisma.genre.update({
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
  } catch (error) {
    return error;
  } finally {
    await prisma.$disconnect();
  }
};
