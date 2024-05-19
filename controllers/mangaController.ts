import {
  AllMangas,
  createNewManga,
  MangaById,
  newManga,
  mangaBySlug,
} from "../models/manga";

export const getMangas = async (c: any) => {
  const genres = await AllMangas();
  return c.json(genres, 200);
};

export const getMangaById = async (c: any) => {
  const id = await c.req.param("id");
  const manga = await MangaById(id);
  return c.json(
    {
      manga,
    },
    200
  );
};
export const createManga = async (c: any) => {
  const data = await c.req.json();
  const manga = await createNewManga(data);
  try {
    return c.json(data, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const getNewManga = async (c: any) => {
  try {
    console.log("hh");
    const mangas = await newManga();
    return c.json(mangas, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const getMangaBySlug = async (c: any) => {
  try {
    const slug = await c.req.param("slug");
    const manga = await mangaBySlug(slug);
    return c.json(manga, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};
