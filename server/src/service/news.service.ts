import { getDomElement } from "./crawlData.service";
import { News } from "../model/news.model";
import { CategoryDetail } from "../model/categoryDetail.model";
import { CheerioAPI } from "cheerio";
import { log } from "../logger";
import { NewsEntity } from "../entity/news.entity";
import { getRepository, createQueryBuilder } from "typeorm";
import { insertNewsDeatilEntity } from "./newsDetail.service";
import { NewsDetailEntity } from "../entity/newsDetail.entity";

export const crawlNews = async (categoryDetail: CategoryDetail) => {
  const news = {} as News;
  for (let [index, url] of categoryDetail.link.entries()) {
    if (url)
      await getDomElement(url)
        .then((data: CheerioAPI | undefined) => {
          if (data) {
            data("article.item-news").each((i, e) => {
              let newsEntity: NewsEntity = new NewsEntity();

              news.categoryName = categoryDetail.category.name;
              news.topic = categoryDetail.topic[index];
              news.title =
                data(e).children("h2.title-news").find("a").attr("title") || "";

              news.description =
                data(e).children("p.description").find("a").text().trim() || "";

              news.link =
                (data(e)
                  .children("h2.title-news")
                  .find("a")
                  .attr("href") as string) || "";

              news.day = data("span.time-now").text() || "";

              newsEntity = { ...news } as NewsEntity;

              existRecord(newsEntity, "TITILE_DESCRIPTION").then((data) => {
                if (!data || !newsEntity.title || !newsEntity.description) {
                  console.log(newsEntity);
                  insertDatabase(newsEntity);
                }
              });

              if (news.link) {
                getContent(news.link).then((data) => {
                  const newsDetailEntity = new NewsDetailEntity();
                  if (data) {
                    newsDetailEntity.content = data as string;
                    getByLink(newsEntity).then((data) => {
                      if (data) {
                        newsDetailEntity.newsEntity = data;
                        insertNewsDeatilEntity(newsDetailEntity);
                      }
                    });
                  }
                });
              }
            });
          }
        })
        .catch((e) => log.error(e));
  }
};

export const getContent = async (url: string) => {
  return await getDomElement(url)
    .then((data: CheerioAPI | undefined) => {
      return data
        ? data("article.fck_detail").find("p.Normal").text() || ""
        : "";
    })
    .catch((e) => log.error(e));
};

const insertDatabase = async (news: NewsEntity) => {
  try {
    return await getRepository(NewsEntity).save(news);
  } catch (error) {
    log.error("cannot insert News to database ", error);
  }
};

const getByLink = async (news: NewsEntity) => {
  try {
    return await getRepository(NewsEntity).findOne({
      where: { link: news.link },
    });
  } catch (error) {
    log.error("Cannot found NewsEntity Id");
  }
};

const getNewsByTitleAndDescription = async (news: NewsEntity) => {
  try {
    return await getRepository(NewsEntity).findOne({
      where: { title: news.title, description: news.description },
    });
  } catch (error) {
    log.error("connot found News with title from database", error);
  }
};

const existRecord = async (newsEntity: NewsEntity, keyWord: String) => {
  let news;
  switch (keyWord) {
    case "TITILE_DESCRIPTION":
      news = await getNewsByTitleAndDescription(newsEntity);
      break;
    case "LINKS":
      news = await getByLink(newsEntity);
    default:
      break;
  }
  if (news) return true;
  return false;
};

export const getAllNews = async (per_page: number, searchKeyWord: string) => {
  try {
    log.info(searchKeyWord);
    return await getRepository(NewsEntity)
      .createQueryBuilder("news")
      // .where('news."topic" like :topic', { topic: `%${searchKeyWord}%` })
      .orderBy("news.id")
      .paginate(per_page);
  } catch (error) {
    log.error("connot found News from database ", error);
  }
};
