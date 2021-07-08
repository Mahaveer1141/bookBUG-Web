import { MyContext } from "../config/types";
import { Follows } from "../entities/Follows";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class FollowResovler {
  @Mutation(() => String)
  async makeFollow(
    @Ctx() { req }: MyContext,
    @Arg("followerId") followingId: number
  ) {
    const { userID } = req.session;
    const follows = {
      followerId: userID,
      followingId: followingId,
    };
    const data = await Follows.delete(follows);
    if (data.affected === 0) {
      await Follows.create(follows).save();
      return "Followed";
    }
    return "Unfollowed";
  }
}

// follower is who follow other user
