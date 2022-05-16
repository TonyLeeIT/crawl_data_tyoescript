import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NewsEntity } from "./news.entity";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity({ name: "newsDetail" })
export class NewsDetailEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Field((_type) => NewsEntity)
  @ManyToOne(
    (type) => NewsEntity,
    (newsEntity) => newsEntity.newsDetailEntities
  )
  @JoinColumn({ name: "news_id" })
  newsEntity: NewsEntity;

  @Field(() => String!)
  @Column("text", { name: "content", unique: true })
  content: string;
}
