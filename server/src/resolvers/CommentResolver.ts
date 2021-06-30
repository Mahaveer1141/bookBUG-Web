import { Comments } from "../entities/Comments";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class CommentResolver {
  // TODO add user id through session
  @Mutation(() => Comments)
  async createComment(
    @Arg("postId") postId: number,
    @Arg("comment") comment: string
  ) {
    const createdComment = await Comments.create({
      userId: 1,
      postId: postId,
      comment: comment,
    }).save();
    return createdComment;
  }

  /*
  select c.*,
    json_build_object(
        'id', u.id,
        'username',u.username,
        'displayName',u."displayName"
    ) creater,
    (select case 
      when c."userId"=2 then TRUE
      else FALSE
      end "isMe")
    from comments c inner join users u 
    on u.id = c."userId"
    where c."postId"=1
    order by c."createdAt" desc;
  */
}
