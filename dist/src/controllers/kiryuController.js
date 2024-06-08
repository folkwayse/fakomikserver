import axios from "axios"; // Make sure to install axios if it's not already installed
export const getChapterByid = async (c) => {
    try {
        const { id } = await c.req.json();
        console.log(id);
        const options = {
            method: "GET",
            url: "http://45.76.148.33:8080/api/kiryuu/v6/chapter",
            params: { "": "", id: id },
            headers: {
                "User-Agent": "user-agent: Dart/2.8 (dart:io)",
                "Accept-Encoding": "gzip",
                "Content-Type": "application/json",
            },
        };
        const response = await axios.request(options).then(function (response) {
            return response.data;
        });
        return c.json({
            success: true,
            data: response,
        }, 200);
    }
    catch (error) {
        return c.json({
            success: false,
            error: error,
        }, 500);
    }
};
export const getMangaDetailById = async (c) => {
    try {
        const { id } = await c.req.json();
        console.log(id);
        const options = {
            method: "GET",
            url: "http://45.76.148.33:8080/api/kiryuu/v6/manga",
            params: { "": "", id: id },
            headers: {
                "User-Agent": "user-agent: Dart/2.8 (dart:io)",
                "Accept-Encoding": "gzip",
                "Content-Type": "application/json",
            },
        };
        const response = await axios.request(options).then(function (response) {
            return response.data;
        });
        return c.json({
            success: true,
            data: response,
        }, 200);
    }
    catch (error) {
        return c.json({
            success: false,
            error: error,
        }, 500);
    }
};
