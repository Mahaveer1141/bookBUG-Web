import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class Library extends BaseEntity {
  @Field(() => ID)
  @Column()
  userId: number;

  @PrimaryColumn()
  bookId: string;
}
