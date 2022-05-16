import { EntityRepository, Repository } from "typeorm";
import { CategoryEntity } from "../entity/category.entity";

@EntityRepository(CategoryEntity)
export class CategoryRepo extends Repository<CategoryEntity> {}
