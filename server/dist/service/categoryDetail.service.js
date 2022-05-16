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
exports.crawlCategoryDetail = void 0;
const crawlData_service_1 = require("./crawlData.service");
const news_service_1 = require("./news.service");
const logger_1 = require("../logger");
const crawlCategoryDetail = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryDetail = {
        category: category,
        topic: [],
        link: [],
    };
    if (category.link) {
        yield (0, crawlData_service_1.getDomElement)(category.link)
            .then((data) => {
            if (data) {
                data("ul.ul-nav-folder").each((i, e) => {
                    data(e)
                        .find("a")
                        .each((i, e) => {
                        categoryDetail.topic.push(data(e).text() || "");
                        const path = data(e).attr("href");
                        categoryDetail.link.push(process.env.URL +
                            path.substring(path.indexOf("/") + 1, path.length) || "");
                    });
                });
            }
            (0, news_service_1.crawlNews)(categoryDetail);
        })
            .catch((e) => logger_1.log.error(e));
    }
});
exports.crawlCategoryDetail = crawlCategoryDetail;
