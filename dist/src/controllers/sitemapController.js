import { allSlugOnly } from "../models/chapter";
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString();
};
export const getChapterUrl = async (c) => {
    try {
        const chapters = await allSlugOnly();
        if (Array.isArray(chapters)) {
            const urls = chapters.map((chapter) => ({
                loc: `https://fakomik.cloud/chapters/${chapter.slug}`,
                lastmod: formatDate(chapter.updatedAt),
                changefreq: "daily",
                priority: 0.8,
            }));
            return c.json(urls, 200);
        }
        else {
            return c.json(chapters, 500);
        }
    }
    catch (error) {
        return c.json(error, 500);
    }
};
