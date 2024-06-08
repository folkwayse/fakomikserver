import {
  addNewChapter,
  ChapterBySlug,
  prevNextChapter,
  chapterTitle,
  isSlugExists
} from "../models/chapter";

export const addChapter = async (c: any) => {
  const mangaId = await c.req.param("mangaId");
  const data = await c.req.json();
  const Chapter = await addNewChapter(mangaId, data);
  return c.json(
    {
      Chapter,
    },
    200
  );
};
export const checkChapterSlug = async (c: any) => {
  const {title} = await c.req.json();
  const exists = await isSlugExists(title);
  return c.json(
    {
      exists,
    },
    200
  );
}
export const getChapterBySlug = async (c: any) => {
  const slug = await c.req.param("slug");
  const Chapter = await ChapterBySlug(slug);
  return c.json(
    {
      Chapter,
    },
    200
  );
};

export const getPrevNextChapter = async (c: any) => {
  const slug = await c.req.param("slug");
  const data  = await prevNextChapter(slug);
  
  if (typeof data === "object" && data !== null) {
    return c.json(
      {
        ...data
      },
      200
    );
  } else {
    // Handle the case when data is not an object
    return c.json(
      {
        error: "Invalid data"
      },
      400
    );
  }
};

export const getTitle = async (c: any) => {
  const slug = await c.req.param("slug");
  const Chapter = await chapterTitle(slug);
  return c.json(
    {
      Chapter,
    },
    200
  );
};
