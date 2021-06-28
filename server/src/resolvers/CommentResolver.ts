import { Comments } from "../entities/Comments";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class CommentResolver {
  // TODO add user id through session
  @Mutation()
  async createComment(
    @Arg("postId") postId: number,
    @Arg("comment") comment: string
  ) {
    const createdComment = await Comments.create({
      postId: postId,
      comment: comment,
    }).save();
    return createdComment;
  }
}
