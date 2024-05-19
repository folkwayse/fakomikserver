import {
  AllGenres,
  createNewGenre,
  getGenreById,
  patch,
} from "../models/genre";

export const getGenres = async (c: any) => {
  const genres = await AllGenres();
  return c.json(genres, 200);
};

export const createGenre = async (c: any) => {
  const { name, description, isMature } = await c.req.json();

  try {
    const genre = await createNewGenre(
      name,
      description,
      isMature ? true : false
    );
    return c.json(genre, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const getSingleGenre = async (c: any) => {
  try {
    const id = await c.req.param("id");
    const genre = await getGenreById(id);
    return c.json(genre, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};

export const patchGenre = async (c: any) => {
  try {
    const id = await c.req.param("id");
    const { name, description, isMature } = await c.req.json();
    const genre = await patch(
      id,
      name,
      description,
      isMature ? true : false
    );
    return c.json(genre, 200);
  } catch (error) {
    return c.json(error, 500);
  }
};
