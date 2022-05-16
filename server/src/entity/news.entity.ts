import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { NewsDetailEntity } from "./newsDetail.entity";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity({ name: "news" })
export class NewsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [NewsDetailEntity])
  @OneToMany(
    (type) => NewsDetailEntity,
    (newsDetailEntity) => newsDetailEntity.newsEntity,
    { onUpdate: "CASCADE", onDelete: "CASCADE" }
  )
  newsDetailEntities: NewsDetailEntity[];

  @Field(() => String)
  @Column("varchar", { length: 20, name: "categoryName" })
  categoryName: string;

  @Field(() => String)
  @Column("varchar", { length: 50, name: "topic" })
  topic: string;

  @Field(() => String)
  @Column("varchar", {
    length: 200,
    name: "title",
    nullable: false,
    unique: true,
  })
  title: string;

  @Field(() => String)
  @Column("varchar", {
    length: 1000,
    name: "description",
    nullable: false,
    unique: true,
  })
  description: string;

  @Field(() => String)
  @Column("varchar", { length: 200, name: "link", unique: true })
  link: string;

  @Field(() => String)
  @Column("varchar", { length: 100, name: "day" })
  day: string;
}
