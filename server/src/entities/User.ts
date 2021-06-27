import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Field()
  @Column({ default: "" })
  bio: string;
}
