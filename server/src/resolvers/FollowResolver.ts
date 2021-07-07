import { MyContext } from "../config/types";
import { Follows } from "../entities/Follows";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class FollowResovler {
  @Mutation(() => String)
  async makeFollow(
    @Ctx() { req }: MyContext,
    @Arg("followerId") followerId: number
  ) {
    const { userID } = req.session;
    const follows = {
      followerId: followerId,
      followingId: userID,
    };
    const data = await Follows.delete(follows);
    if (data.affected === 0) {
      await Follows.create(follows).save();
      return "Followed";
    }
    return "Unfollowed";
  }
}
