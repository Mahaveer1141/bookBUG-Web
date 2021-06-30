import { MyContext } from "../config/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Likes } from "../entities/Likes";

@Resolver()
export class LikeResolver {
  @Mutation(() => String)
  async changeLike(@Arg("postId") postId: number, @Ctx() { req }: MyContext) {
    const { userID } = req.session;
    const like = {
      user_id: userID,
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
