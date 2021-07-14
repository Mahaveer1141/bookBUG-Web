import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comments } from "./Comments";
import { Likes } from "./Likes";
import { Users } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  text: string;

  @Field({ nullable: true })
  @Column({ default: "", nullable: true })
  imageUrl: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.posts)
  creator: Users;

  @OneToMany(() => Likes, (like) => like.post, { onDelete: "CASCADE" })
  likes: Likes[];

  @Field(() => [Comments])
  @OneToMany(() => Comments, (comment) => comment.post, { onDelete: "CASCADE" })
  comments: Comments[];

  @Field(() => Number)
  num_likes: number;

  @Field(() => Boolean)
  isLiked: boolean;

  @Field(() => Boolean)
  isMe: boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
