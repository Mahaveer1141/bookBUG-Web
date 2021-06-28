import { MyContext } from "../config/types";
// import { Users } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async getAllPost() {
    const data = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .innerJoinAndSelect("p.creator", "u", 'u.id = p."creatorId"')
      .orderBy('"createdAt"', "DESC")
      .getMany();
    return data;
  }

  @Query(() => Post)
  async getOnePost(@Arg("id") id: number) {
    const post = await Post.findOne(
      { id },
      { relations: ["creator", "likes"] }
    );
    return post;
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx() { req }: MyContext,
    @Arg("text") text: string,
    @Arg("imageUrl") imageUrl: string
  ) {
    const creatorId = req.session.userID;
    // const creatorId = 1;
    const curPost = {
      creatorId: creatorId,
      text: text,
      imageUrl: imageUrl,
    };
    const post = await Post.create(curPost).save();
    return post;
  }
}
