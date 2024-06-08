"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMangaDetailById = exports.getChapterByid = void 0;
const axios_1 = __importDefault(require("axios")); // Make sure to install axios if it's not already installed
const getChapterByid = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield c.req.json();
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
        const response = yield axios_1.default.request(options).then(function (response) {
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
});
exports.getChapterByid = getChapterByid;
const getMangaDetailById = (c) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = yield c.req.json();
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
        const response = yield axios_1.default.request(options).then(function (response) {
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
});
exports.getMangaDetailById = getMangaDetailById;
