import { allSlugOnly } from "../models/chapter";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
};

export const getChapterUrl = async (c: any) => {
  try {
    const chapters = await allSlugOnly();
    const baseUrl = c.req.query("baseUrl");

    if (Array.isArray(chapters)) {
      const urls = chapters.map((chapter: any) => ({
        loc: `${baseUrl}/${chapter.slug}`,
        lastmod: formatDate(chapter.updatedAt),
        changefreq: "weekly",
        priority: 0.8,
      }));

      return c.json(urls, 200);
    } else {
      return c.json(chapters, 500);
    }
  } catch (error) {
    return c.json(error, 500);
  }
};
