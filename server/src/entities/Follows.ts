import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Users } from "./User";

@ObjectType()
@Entity()
export class Follows extends BaseEntity {
  @Field()
  @PrimaryColumn()
  followingId: number;

  @Field()
  @PrimaryColumn()
  followerId: number;

  @Field(() => [Users])
  @ManyToOne(() => Users, (user) => user.follower)
  follower: Users[];

  @Field(() => [Users])
  @ManyToOne(() => Users, (user) => user.following)
  following: Users[];
}

/*

  followerId followingId
      1            2    

  user 1 follows user 2;

 */
