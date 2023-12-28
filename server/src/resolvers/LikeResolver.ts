import { MyContext } from "../utils/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Likes } from "../entities/Likes";

@Resolver()
export class LikeResolver {
  @Mutation(() => String)
  async changeLike(@Arg("postId") postId: number, @Ctx() { req }: MyContext) {
    const like = {
      user_id: Number(req.user?.userID),
      postId: postId,
    };
    const data = await Likes.delete(like as any);
    if (data.affected === 0) {
      await Likes.create(like).save();
      return "Liked";
    }
    return "Unliked";
  }
}
