import { MyContext } from "../config/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Likes } from "../entities/Likes";

@Resolver()
export class LikeResolver {
  @Mutation(() => String)
  async changeLike(
    @Arg("postId") postId: number,
    @Ctx() { userID }: MyContext
  ) {
    const like = {
      user_id: Number(userID),
      postId: postId,
    };
    console.log(like);
    const data = await Likes.delete(like);
    if (data.affected === 0) {
      await Likes.create(like).save();
      return "Liked";
    }
    return "Unliked";
  }
}
