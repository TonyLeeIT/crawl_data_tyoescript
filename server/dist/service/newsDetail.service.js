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
exports.getAllNewsDtail = exports.insertNewsDeatilEntity = void 0;
const typeorm_1 = require("typeorm");
const newsDetail_entity_1 = require("../entity/newsDetail.entity");
const index_1 = require("../logger/index");
const insertNewsDeatilEntity = (newsDetail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, typeorm_1.getRepository)(newsDetail_entity_1.NewsDetailEntity).save(newsDetail);
    }
    catch (error) {
        index_1.log.error("cannot insert NewsDetail to database ", error);
    }
});
exports.insertNewsDeatilEntity = insertNewsDeatilEntity;
const getAllNewsDtail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, typeorm_1.getRepository)(newsDetail_entity_1.NewsDetailEntity).find({
            relations: ["newsEntity"]
        });
    }
    catch (error) {
        index_1.log.error("cannot found NewsDetail from database ", error);
    }
});
exports.getAllNewsDtail = getAllNewsDtail;
