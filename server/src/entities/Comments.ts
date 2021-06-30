import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
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
  creator: Users;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column()
  comment: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Boolean)
  isMe: boolean;
}
