import { getRepository } from "typeorm";
import { NewsDetailEntity } from "../entity/newsDetail.entity";
import { log } from "../logger/index";

export const insertNewsDeatilEntity = async (newsDetail: NewsDetailEntity) => {
  try {
    return await getRepository(NewsDetailEntity).save(newsDetail);
  } catch (error) {
    log.error("cannot insert NewsDetail to database ", error);
  }
};

export const getAllNewsDtail = async () => {
  try {
    return await getRepository(NewsDetailEntity).findAndCount({
      relations: ["newsEntity"],
    });
  } catch (error) {
    log.error("cannot found NewsDetail from database ", error);
  }
};
