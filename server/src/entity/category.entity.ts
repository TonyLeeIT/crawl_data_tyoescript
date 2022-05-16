import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { CategoryDetailEntity } from "./categoryDetail.entity";

@ObjectType()
@Entity({ name: "category" })
export class CategoryEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [CategoryDetailEntity])
  @OneToMany(
    (type) => CategoryDetailEntity,
    (categoryDetailEntity) => categoryDetailEntity.categoryEntity,
    { onUpdate: "CASCADE", onDelete: "CASCADE" }
  )
  categoryDetailEntities: CategoryDetailEntity[];

  @Field(() => String)
  @Index({ unique: true })
  @Column("varchar", { length: 50, name: "name" })
  name: string;

  @Field(() => String)
  @Column("varchar", { length: 1000, nullable: true })
  link: string;

  @Field(() => String)
  @Column({ type: "timestamptz", default: "now()" })
  createdAt: Date = new Date();

  @Field(() => String)
  @Column({ type: "timestamptz" })
  updatedAt: Date = new Date();
}
