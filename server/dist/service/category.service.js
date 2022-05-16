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
exports.insertDatabase = exports.crawlCategory = void 0;
const crawlData_service_1 = require("./crawlData.service");
const string_utils_1 = require("../utils/string.utils");
const categoryDetail_service_1 = require("./categoryDetail.service");
const logger_1 = require("../logger");
const category_entity_1 = require("../entity/category.entity");
const typeorm_1 = require("typeorm");
const crawlCategory = (url) => __awaiter(void 0, void 0, void 0, function* () {
    let listCategory = [];
    let listCategoryName = [];
    return yield (0, crawlData_service_1.getDomElement)(url)
        .then((data) => {
        if (data) {
            data("ul.parent").each((i, e) => {
                listCategoryName = data(e).find("a").text().trim().split("\n");
                listCategoryName = listCategoryName.splice(1, listCategoryName.length - 2);
            });
            const keyClass = (0, string_utils_1.removeAccents)(listCategoryName);
            for (let i = 0; i < keyClass.length; i++) {
                const categoryEntity = new category_entity_1.CategoryEntity();
                const category = {};
                category.name = listCategoryName[i].trim();
                const path = data(`li.${keyClass[i]}`)
                    .find("a")
                    .attr("href");
                category.link =
                    url + path.substring(path.indexOf("/") + 1, path.length);
                listCategory.push(category);
                if (category.link)
                    (0, categoryDetail_service_1.crawlCategoryDetail)(category);
                categoryEntity.name = category.name;
                categoryEntity.link = category.link;
                (0, typeorm_1.getRepository)(category_entity_1.CategoryEntity)
                    .findOne({ name: category.name })
                    .then((data) => {
                    if (!data)
                        (0, exports.insertDatabase)(categoryEntity);
                })
                    .catch((err) => {
                    logger_1.log.error(err);
                });
            }
            return listCategory;
        }
    })
        .catch((e) => logger_1.log.error(e));
});
exports.crawlCategory = crawlCategory;
const insertDatabase = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, typeorm_1.getRepository)(category_entity_1.CategoryEntity).save(category);
    }
    catch (error) {
        logger_1.log.error("cannot insert Category to database ", error);
    }
});
exports.insertDatabase = insertDatabase;
