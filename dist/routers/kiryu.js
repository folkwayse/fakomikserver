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
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
const kiryuController_1 = require("../controllers/kiryuController");
const genres = new hono_1.Hono();
genres.post("/getmangadetailbyid", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, kiryuController_1.getMangaDetailById)(c);
}));
genres.post("/getchaptersbyid", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, kiryuController_1.getChapterByid)(c);
}));
exports.default = genres;
