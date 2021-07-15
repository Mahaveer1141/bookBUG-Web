import { Comments } from "../entities/Comments";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/config/types";
import { getConnection } from "typeorm";

@Resolver()
export class CommentResolver {
  @Mutation(() => Comments)
  async createComment(
    @Ctx() { userID }: MyContext,
    @Arg("postId") postId: number,
    @Arg("comment") comment: string
  ) {
    const createdComment = await Comments.create({
      creatorId: Number(userID),
      postId: postId,
      comment: comment,
    }).save();
    return createdComment;
  }

  @Mutation(() => String)
  async deleteComment(@Arg("id") id: number) {
    await Comments.delete({ id });
    return "deleted";
  }

  @Query(() => [Comments])
  async getComments(
    @Ctx() { userID }: MyContext,
    @Arg("postId") postId: number
  ) {
    const data = await getConnection().query(`
      select c.*,
        json_build_object(
          'id', u.id,
          'username', u.username,
          'displayName', u."displayName",
          'photoUrl', u."photoUrl"
        ) creator,
        (select case
          when c."creatorId"=${userID} then TRUE
          else FALSE
          end "isMe")
        from comments c inner join users u
        on u.id = c."creatorId"
        where c."postId"=${postId}
        order by c."createdAt" desc;
    `);
    return data;
  }
}
