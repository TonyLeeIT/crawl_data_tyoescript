import { getDomElement } from "./crawlData.service";
import { Category } from "../model/category.model";
import { CheerioAPI } from "cheerio";
import { removeAccents } from "../utils/string.utils";
import { crawlCategoryDetail } from "./categoryDetail.service";
import { log } from "../logger";
import { CategoryEntity } from "../entity/category.entity";
import { getRepository } from "typeorm";

export const crawlCategory = async (url: string) => {
  let listCategory: Category[] = [];
  let listCategoryName: string[] = [];
  return await getDomElement(url)
    .then((data: CheerioAPI | undefined) => {
      if (data) {
        data("ul.parent").each((i, e) => {
          listCategoryName = data(e).find("a").text().trim().split("\n");
          listCategoryName = listCategoryName.splice(
            1,
            listCategoryName.length - 2
          );
        });
        const keyClass: string[] = removeAccents(listCategoryName);
        for (let i = 0; i < keyClass.length; i++) {
          const categoryEntity = new CategoryEntity();
          const category = {} as Category;
          category.name = listCategoryName[i].trim();
          const path: string = data(`li.${keyClass[i]}`)
            .find("a")
            .attr("href") as string;
          category.link =
            url + path.substring(path.indexOf("/") + 1, path.length);
          listCategory.push(category);

          if (category.link) crawlCategoryDetail(category);
          categoryEntity.name = category.name;
          categoryEntity.link = category.link;

          getRepository(CategoryEntity)
            .findOne({ name: category.name })
            .then((data) => {
              if (!data) insertDatabase(categoryEntity);
            })
            .catch((err) => {
              log.error(err);
            });
        }
        return listCategory;
      }
    })
    .catch((e) => log.error(e));
};

export const insertDatabase = async (category: CategoryEntity) => {
  try {
    return await getRepository(CategoryEntity).save(category);
  } catch (error) {
    log.error("cannot insert Category to database ", error);
  }
};
