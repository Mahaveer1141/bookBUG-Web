import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./Comments";
import { Follows } from "./Follows";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: "" })
  displayName: string;

  @Field()
  @Column({ unique: true, default: "" })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  photoUrl: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];

  @Field()
  @Column({ default: "" })
  bio: string;
}
