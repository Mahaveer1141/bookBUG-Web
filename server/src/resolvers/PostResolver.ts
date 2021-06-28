import { MyContext } from "../config/types";
// import { Users } from "../entities/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/Post";
import { getConnection } from "typeorm";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async getAllPost() {
    const data = await getConnection().query(`
      select p.*, 
      json_build_object(
          'id', u.id,
          'username',u.username,
          'photoUrl',u."photoUrl",
          'displayName',u."displayName"
      ) creator,
      (select count(user_id) from likes where("postId"=p.id)) as num_likes,
      (select case 
          when 1 in (select user_id from likes) then TRUE
          when 1 not in (select user_id from likes) then FALSE
          end "isLiked")
      from post p inner join users u 
      on u.id = p."creatorId"
      order by p."createdAt" desc;
    `);
    return data;
  }

  @Query(() => Post)
  async getOnePost(@Arg("id") id: number) {
    const data: Post[] = await getConnection().query(`
      select p.*, 
      json_build_object(
          'id', u.id,
          'username',u.username,
          'photoUrl',u."photoUrl",
          'displayName',u."displayName"
      ) creator,
      (select count(user_id) from likes where("postId"=p.id)) as num_likes,
      (select case 
          when 1 in (select user_id from likes) then TRUE
          when 1 not in (select user_id from likes) then FALSE
          end "isLiked")
      from post p inner join users u 
      on u.id = p."creatorId"
      where(p.id=1)
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
    // const creatorId = 1;
    const curPost = {
      creatorId: creatorId,
      text: text,
      imageUrl: imageUrl,
    };
    const post = await Post.create(curPost).save();
    return post;
  }
}
