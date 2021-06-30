import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Follows extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: number;

  @Field()
  @PrimaryColumn()
  followerId: number;
}

/*
  userId  followerId
    1        2
  this means user with id 2 follow user with id 1.
 */
