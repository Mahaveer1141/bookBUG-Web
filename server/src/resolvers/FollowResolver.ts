import { MyContext } from "../config/types";
import { Follows } from "../entities/Follows";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Users } from "../entities/User";
import { getConnection } from "typeorm";

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

  @Query(() => [Users])
  async getFollowers(@Arg("userId") userId: number, @Ctx() { req }: MyContext) {
    const { userID } = req.session;
    const data = await getConnection().query(`
     select 
      u.*,
      (select case 
        when ${userID} in (select "followerId" from follows where("followingId"=${userId})) then TRUE
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
    @Ctx() { req }: MyContext
  ) {
    const { userID } = req.session;
    const data = await getConnection().query(`
     select 
      u.*,
      (select case 
        when ${userID} in (select "followingId" from follows where("followerId"=${userId})) then TRUE
        else FALSE
        end "isFollowed") 
      from follows inner join users u
      on u.id = follows."followerId"
      where("followerId"=${userId} and "followingId" != ${userId});
    `);
    console.log(data);
    return data;
  }
}
// follower is who follow other user
