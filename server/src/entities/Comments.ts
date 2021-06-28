import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";
import { Users } from "./User";

@ObjectType()
@Entity()
export class Comments extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  postId: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.comments)
  user: Users;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Field()
  @Column()
  userId: number;

  @Field()
  @Column()
  comment: string;
}
