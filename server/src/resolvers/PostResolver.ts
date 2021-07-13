import { MyContext } from "../config/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async getAllPost(@Ctx() { req }: MyContext) {
    const { userID } = req.session;
    if (userID !== undefined) {
      const data = await getConnection().query(`
        select p.*,
        json_build_object(
            'id', u.id,
            'username',u.username,
            'photoUrl',u."photoUrl",
            'displayName',u."displayName"
        ) creator,
        (select count(user_id) as num_likes
          from likes where("postId"=p.id)),
        (select case 
          when ${userID} in (select user_id from likes where("postId"=p.id)) then TRUE
          else FALSE
          end "isLiked"),
        (select case 
          when ${userID} = u.id then TRUE
          else FALSE
          end "isMe")
        from post p inner join users u 
        on u.id = p."creatorId"
        where (u.id in (select distinct "followingId" from follows where("followerId"=${userID})))
        order by p."createdAt" desc;
      `);
      return data;
    }
  }

  @Query(() => Post)
  async getOnePost(@Arg("postId") postId: number, @Ctx() { req }: MyContext) {
    const { userID } = req.session;
    const data: Post[] = await getConnection().query(`
      select p.*, 
      json_build_object(
          'id', u.id,
          'username',u.username,
          'photoUrl', u."photoUrl",
          'displayName',u."displayName"
      ) creator,
      (select count(user_id) as num_likes
        from likes where("postId"=${postId})),
      (select case 
        when ${userID} in (select user_id from likes where("postId"=${postId})) then TRUE
        else FALSE
        end "isLiked"),
      (select case 
        when ${userID} = u.id then TRUE
        else FALSE
        end "isMe")
      from post p inner join users u 
      on u.id = p."creatorId"
      where(p.id=${postId})
      order by p."createdAt" desc;
    `);
    return data[0];
  }

  @Query(() => [Post])
  async getUsersPost(@Arg("userId") userId: number, @Ctx() { req }: MyContext) {
    const { userID } = req.session;
    const data: Post[] = await getConnection().query(`
      select p.*, 
      json_build_object(
          'id', u.id,
          'username',u.username,
          'photoUrl', u."photoUrl",
          'displayName',u."displayName"
      ) creator,
      (select count(user_id) as num_likes
        from likes where("postId"=p.id)),
      (select case 
        when ${userID} in (select user_id from likes where("postId"=p.id)) then TRUE
        else FALSE
        end "isLiked"),
      (select case 
        when ${userID} = u.id then TRUE
        else FALSE
        end "isMe")
      from post p inner join users u 
      on u.id = p."creatorId"
      where(p."creatorId"=${userId})
      order by p."createdAt" desc;
    `);
    return data;
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx() { req }: MyContext,
    @Arg("text") text: string,
    @Arg("imageUrl") imageUrl: string
  ) {
    const creatorId = req.session.userID;
    const curPost = {
      creatorId: creatorId,
      text: text,
      imageUrl: imageUrl,
    };
    const post = await Post.create(curPost).save();
    return post;
  }
}
