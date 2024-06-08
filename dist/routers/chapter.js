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
const chapterController_1 = require("../controllers/chapterController");
const chapters = new hono_1.Hono();
chapters.post("/checkslug", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, chapterController_1.checkChapterSlug)(c);
}));
chapters.get("/getchapter/:slug", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, chapterController_1.getChapterBySlug)(c);
}));
chapters.get("/getprevnext/:slug", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, chapterController_1.getPrevNextChapter)(c);
}));
chapters.get("/gettitle/:slug", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, chapterController_1.getTitle)(c);
}));
chapters.post("/:mangaId", (c) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, chapterController_1.addChapter)(c);
}));
exports.default = chapters;
