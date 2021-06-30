import { Comments } from "../entities/Comments";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "src/config/types";
import { getConnection } from "typeorm";

@Resolver()
export class CommentResolver {
  @Mutation(() => Comments)
  async createComment(
    @Ctx() { req }: MyContext,
    @Arg("postId") postId: number,
    @Arg("comment") comment: string
  ) {
    const createdComment = await Comments.create({
      creatorId: req.session.userID,
      postId: postId,
      comment: comment,
    }).save();
    return createdComment;
  }

  @Query(() => [Comments])
  async getComments(@Ctx() { req }: MyContext, @Arg("postId") postId: number) {
    const userId = req.session.userID;
    const data = await getConnection().query(`
      select c.*,
        json_build_object(
          'id', u.id,
          'username', u.username,
          'displayName', u."displayName",
          'photoUrl', u."photoUrl"
        ) creator,
        (select case
          when c."creatorId"=${userId} then TRUE
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
