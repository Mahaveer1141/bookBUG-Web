import { MyContext } from "../config/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async getAllPost(@Ctx() { req }: MyContext) {
    const { userID } = req.session;
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
        end "isLiked")
      from post p inner join users u 
      on u.id = p."creatorId"
      where (u.id in (select distinct "userId" from follows where("followerId"=${userID} or "userId"=${userID})))
      order by p."createdAt" desc;
    `);
    console.log(data);
    return data;
  }

  @Query(() => Post)
  async getOnePost(@Arg("id") id: number, @Ctx() { req }: MyContext) {
    const { userID } = req.session;
    const data: Post[] = await getConnection().query(`
      select p.*, 
      json_build_object(
          'id', u.id,
          'username',u.username,
          'photoUrl',u."photoUrl",
          'displayName',u."displayName"
      ) creator,
      (select count(user_id) as num_likes
        from likes where("postId"=${id})),
      (select case 
        when ${userID} in (select user_id from likes where("postId"=${id})) then TRUE
        else FALSE
        end "isLiked")
      from post p inner join users u 
      on u.id = p."creatorId"
      where(p.id=${id})
      order by p."createdAt" desc;
    `);
    return data[0];
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
