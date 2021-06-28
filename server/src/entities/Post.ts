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

  @Field()
  @Column()
  imageUrl: string;

  @Field()
  @Column()
  creatorId: number;

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.posts)
  creator: Users;

  @Field(() => [Likes])
  @OneToMany(() => Likes, (like) => like.post)
  likes: Likes[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
