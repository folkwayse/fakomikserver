import {
  addNewChapter,
  ChapterBySlug,
  prevChapter,
  nextChapter,
  chapterTitle
} from "../models/chapter";

export const addChapter = async (c: any) => {
  const mangaId = await c.req.param("mangaId");
  const data = await c.req.json();
  console.log(mangaId, data);
  const Chapter = await addNewChapter(mangaId, data);
  return c.json(
    {
      Chapter,
    },
    200
  );
};

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
  const prev = await prevChapter(slug) || null;
  const next = await nextChapter(slug) || null;
  return c.json(
    {
      prev,
      next,
    },
    200
  );
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
}