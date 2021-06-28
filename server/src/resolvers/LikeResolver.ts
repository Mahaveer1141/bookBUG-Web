import { MyContext } from "../config/types";
// import { Users } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Likes } from "../entities/Likes";

@Resolver()
export class LikeResolver {
  @Mutation(() => Likes)
  // TODO save user id from session
  async createLike(@Arg("postId") postId: number) {
    const data = await Likes.create({ user_id: 1, postId: postId }).save();
    return data;
  }
}
