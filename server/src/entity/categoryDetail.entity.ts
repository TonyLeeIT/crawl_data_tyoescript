import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CategoryEntity } from "./category.entity";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity({ name: "categoryDetail" })
export class CategoryDetailEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field(() => CategoryEntity)
  @ManyToOne(
    (type) => CategoryEntity,
    (categoryEntity) => categoryEntity.categoryDetailEntities
  )
  @JoinColumn({ name: "category_id" })
  categoryEntity: CategoryEntity;

  @Field(() => String)
  @Column("text", { name: "topic" })
  topic: string;

  @Field(() => String)
  @Column("text", { name: "linkCategoryDetail" })
  linkCategyDetail: string;
}
