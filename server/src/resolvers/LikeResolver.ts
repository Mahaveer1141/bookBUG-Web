import { MyContext } from "../config/types";
// import { Users } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Likes } from "../entities/Likes";

@Resolver()
export class LikeResolver {
  @Mutation(() => String)
  // TODO save user id from session
  async changeLike(@Arg("postId") postId: number) {
    const like = {
      user_id: 1,
      postId: postId,
    };
    const data = await Likes.delete(like);
    console.log(data);
    if (data.affected === 0) {
      await Likes.create(like).save();
      return "Liked";
    }
    return "Unliked";
  }
}
