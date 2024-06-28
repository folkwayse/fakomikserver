import { allSlugOnly } from "../models/chapter";
import { allSlugManga } from "../models/manga";
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

export const getChapterUrl = async (c: any) => {
  try {
    const chapters = await allSlugOnly();
    const mangas = await allSlugManga();

    if (Array.isArray(chapters)) {
      const urls = chapters.map((chapter: any) => ({
        loc: `/chapters/${chapter.slug}`,
        lastmod: formatDate(chapter.updatedAt),
        changefreq: "daily",
        priority: 0.8,
      }));
      const urlsManga = mangas.map((manga: any) => ({
        loc: `/manga/${manga.slug}`,
        lastmod: formatDate(manga.updatedAt),
        changefreq: "daily",
        priority: 0.8,
      }));
      const combinedUrls = [ ...urlsManga, ...urls];

      return c.json(combinedUrls, 200);
    } else {
      return c.json(chapters, 500);
    }
  } catch (error) {
    return c.json(error, 500);
  }
};
