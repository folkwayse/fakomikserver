import {
  AllMangas,
  createNewManga,
  MangaById,
  MangaByIds,
  newManga,
  mangaBySlug,
  mangaByName,
  newChapter,
  advSearch,
  hasUpdateManga
} from "../models/manga";

export const hasUpdate = async (c: any) => {
  const {updateData} = await c.req.json();
  // console.log(data)
  const manga = await hasUpdateManga(updateData);
  return c.json(manga, 200);
}
export const advanceSearch = async (c: any) => {
  const jsonData = await c.req.json();
  const mangas = await advSearch(jsonData);
  return c.json(mangas, 200);
}
export const searchByName = async (c: any) => {
  const { s } = await c.req.json();
  // console.log(s)
  const mangas = await mangaByName(s);
  return c.json(mangas, 200);
};

export const getBookmark = async (c: any) => {
  const { mangaIds } = await c.req.json();

  const mangas = await MangaByIds(mangaIds);
  return c.json(mangas, 200);
};
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
    // cursor
    const page =parseInt( await c.req.query('page') ?? 1 );  // Mengambil nilai cursor dari parameter URL dan mengonversinya menjadi angka
    const mangas = await newManga(page);
    return c.json(mangas, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};
export const getNewChapter = async (c: any) => {
  try {
    // cursor
    const page = parseInt(await c.req.query('page') ?? 1);  // Mengambil nilai cursor dari parameter URL dan mengonversinya menjadi angka
    const mangas = await newChapter(page);
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
