import { getDomElement } from "./crawlData.service";
import { CategoryDetail } from "../model/categoryDetail.model";
import { crawlNews } from "./news.service";
import { Category } from "../model/category.model";
import { CheerioAPI } from "cheerio";
import { log } from "../logger";
import { CategoryDetailEntity } from "../entity/categoryDetail.entity";

export const crawlCategoryDetail = async (category: Category) => {
  const categoryDetail: CategoryDetail = {
    category: category,
    topic: [],
    link: [],
  };
  if (category.link) {
    await getDomElement(category.link)
      .then((data: CheerioAPI | undefined) => {
        if (data) {
          data("ul.ul-nav-folder").each((i, e) => {
            data(e)
              .find("a")
              .each((i, e) => {
                categoryDetail.topic.push(data(e).text() || "");
                const path: string = data(e).attr("href") as string;
                categoryDetail.link.push(
                  process.env.URL +
                    path.substring(path.indexOf("/") + 1, path.length) || ""
                );
              });
          });
        }
        crawlNews(categoryDetail);
      })
      .catch((e) => log.error(e));
  }
};
