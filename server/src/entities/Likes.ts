import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Likes extends BaseEntity {
  @Field()
  @PrimaryColumn()
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  post: Post;

  @Field()
  @PrimaryColumn()
  user_id: number;
}
