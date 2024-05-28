import {
  AllMangas,
  createNewManga,
  MangaById,
  newManga,
  mangaBySlug,
  mangaByName
} from "../models/manga";

export const searchByName = async (c: any) => {
  const {s} = await c.req.json();
  // console.log(s)
  const mangas = await mangaByName(s);
  return c.json(mangas, 200);
}
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
    return c.json(manga, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const getNewManga = async (c: any) => {
  try {
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
