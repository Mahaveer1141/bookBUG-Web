import { MyContext } from "../utils/types";
import { Follows } from "../entities/Follows";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Users } from "../entities/User";
import { getConnection } from "typeorm";

@Resolver()
export class FollowResovler {
  @Mutation(() => String)
  async makeFollow(
    @Ctx() { req }: MyContext,
    @Arg("followerId") followingId: number,
  ) {
    const follows = {
      followerId: Number(req.user?.userID),
      followingId: followingId,
    };
    const data = await Follows.delete(follows as any);
    if (data.affected === 0) {
      await Follows.create(follows).save();
      return "Followed";
    }
    return "Unfollowed";
  }

  @Query(() => [Users])
  async getFollowers(@Arg("userId") userId: number, @Ctx() { req }: MyContext) {
    const data = await getConnection().query(`
     select 
      u.*,
      (select case 
        when ${req.user?.userID} in (select "followerId" from follows where("followingId"=${userId})) then TRUE
        else FALSE
        end "isFollowed") 
      from follows inner join users u
      on u.id = follows."followerId"
      where("followingId"=${userId} and "followerId" != ${userId});
    `);
    return data;
  }

  @Query(() => [Users])
  async getFollowings(
    @Arg("userId") userId: number,
    @Ctx() { req }: MyContext,
  ) {
    const data = await getConnection().query(`
     select 
      u.*,
      (select case 
        when ${req.user?.userID} in (select "followerId" from follows where("followingId"=${userId})) then TRUE
        else FALSE
        end "isFollowed") 
      from follows inner join users u
      on u.id = follows."followingId"
      where("followerId"=${userId} and "followingId" != ${userId});
    `);
    console.log(data);
    return data;
  }
}
// follower is who follow other user
