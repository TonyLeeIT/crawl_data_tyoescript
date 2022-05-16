import { Query, Resolver } from "type-graphql";
import { NewsDetailEntity } from "../entity/newsDetail.entity";
import { getAllNewsDtail } from "../service/newsDetail.service";

@Resolver(() => NewsDetailEntity)
export class NewsDetailResolver {
  @Query(() => [NewsDetailEntity])
  async getAll() {
    return await getAllNewsDtail();
  }
}
