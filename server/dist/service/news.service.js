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
exports.getAllNews = exports.getContent = exports.crawlNews = void 0;
const crawlData_service_1 = require("./crawlData.service");
const logger_1 = require("../logger");
const news_entity_1 = require("../entity/news.entity");
const typeorm_1 = require("typeorm");
const newsDetail_service_1 = require("./newsDetail.service");
const newsDetail_entity_1 = require("../entity/newsDetail.entity");
const crawlNews = (categoryDetail) => __awaiter(void 0, void 0, void 0, function* () {
    const news = {};
    for (let [index, url] of categoryDetail.link.entries()) {
        if (url)
            yield (0, crawlData_service_1.getDomElement)(url)
                .then((data) => {
                if (data) {
                    data("article.item-news").each((i, e) => {
                        let newsEntity = new news_entity_1.NewsEntity();
                        news.categoryName = categoryDetail.category.name;
                        news.topic = categoryDetail.topic[index];
                        news.title =
                            data(e).children("h2.title-news").find("a").attr("title") || "";
                        news.description =
                            data(e).children("p.description").find("a").text().trim() || "";
                        news.link =
                            data(e)
                                .children("h2.title-news")
                                .find("a")
                                .attr("href") || "";
                        news.day = data("span.time-now").text() || "";
                        newsEntity = Object.assign({}, news);
                        existRecord(newsEntity, "TITILE_DESCRIPTION").then((data) => {
                            if (!data && !newsEntity.title && !newsEntity.description) {
                                console.log(newsEntity);
                                insertDatabase(newsEntity);
                            }
                        });
                        if (news.link) {
                            (0, exports.getContent)(news.link).then((data) => {
                                const newsDetailEntity = new newsDetail_entity_1.NewsDetailEntity();
                                if (data) {
                                    newsDetailEntity.content = data;
                                    getByLink(newsEntity).then((data) => {
                                        if (data) {
                                            newsDetailEntity.newsEntity = data;
                                            (0, newsDetail_service_1.insertNewsDeatilEntity)(newsDetailEntity);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            })
                .catch((e) => logger_1.log.error(e));
    }
});
exports.crawlNews = crawlNews;
const getContent = (url) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, crawlData_service_1.getDomElement)(url)
        .then((data) => {
        return data
            ? data("article.fck_detail").find("p.Normal").text() || ""
            : "";
    })
        .catch((e) => logger_1.log.error(e));
});
exports.getContent = getContent;
const insertDatabase = (news) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, typeorm_1.getRepository)(news_entity_1.NewsEntity).save(news);
    }
    catch (error) {
        logger_1.log.error("cannot insert News to database ", error);
    }
});
const getByLink = (news) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, typeorm_1.getRepository)(news_entity_1.NewsEntity).findOne({
            where: { link: news.link },
        });
    }
    catch (error) {
        logger_1.log.error("Cannot found NewsEntity Id");
    }
});
const getNewsByTitleAndDescription = (news) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, typeorm_1.getRepository)(news_entity_1.NewsEntity).findOne({
            where: { title: news.title, description: news.description },
        });
    }
    catch (error) {
        logger_1.log.error("connot found News with title from database", error);
    }
});
const existRecord = (newsEntity, keyWord) => __awaiter(void 0, void 0, void 0, function* () {
    let news;
    switch (keyWord) {
        case "TITILE_DESCRIPTION":
            news = yield getNewsByTitleAndDescription(newsEntity);
            break;
        case "LINKS":
            news = yield getByLink(newsEntity);
        default:
            break;
    }
    if (news)
        return true;
    return false;
});
const getAllNews = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, typeorm_1.getRepository)(news_entity_1.NewsEntity).find({
            relations: ["newsDetailEntities"],
        });
    }
    catch (error) {
        logger_1.log.error("connot found News from database ", error);
    }
});
exports.getAllNews = getAllNews;
