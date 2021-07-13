import { MyContext } from "../config/types";
import { Users } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Library } from "../entities/Library";

@ObjectType()
class UserResponse {
  @Field(() => [String], { nullable: true })
  errors?: String[];

  @Field(() => Users, { nullable: true })
  user?: Users;
}

@Resolver()
export class UserResolver {
  @Query(() => Users, { nullable: true })
  async Me(@Ctx() { req }: MyContext): Promise<Users | undefined> {
    const id = req.session.userID;
    if (id === undefined) return id;
    const data = await getConnection().query(`
      select *,
        (select count("followerId") as num_follower from follows where "followingId"=${id}),
        (select count("followingId") as num_following from follows where "followerId"=${id}),
        (select count(id) as num_post from post where "creatorId"=${id})
        from users where(id=${id});
    `);
    return data[0];
  }

  @Mutation(() => UserResponse, { nullable: true })
  async UpdateUser(
    @Ctx() { req }: MyContext,
    @Arg("username") username: string,
    @Arg("displayName") displayName: string,
    @Arg("bio") bio: string
  ): Promise<UserResponse | undefined> {
    const id = req.session.userID;
    const data = await Users.findOne({ username });
    const user = await Users.findOne({ id });
    if (!user) return undefined;
    if (data) {
      if (data.id === id) {
        user.displayName = displayName;
        user.bio = bio;
        user.save();
        return { user };
      } else {
        return {
          errors: ["Username already exists"],
        };
      }
    }
    user.username = username;
    user.displayName = displayName;
    user.bio = bio;
    user.save();
    return { user };
  }

  @Mutation(() => Boolean)
  Logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  @Query(() => [Users], { nullable: true })
  async getSearchUsers(
    @Arg("detail") deatil: String,
    @Ctx() { req }: MyContext
  ) {
    const { userID } = req.session;
    const data = await getConnection().query(`
      select *,
        (select case 
          when ${userID} in (select "followerId" from follows where("followingId"=id)) then TRUE
          else FALSE
          end "isFollowed") 
        from users 
        where((username like '%${deatil}%' or "displayName" like '%${deatil}%') 
        and id != ${userID});
    `);
    return data;
  }

  @Query(() => Users)
  async getOneUser(@Arg("id") id: number, @Ctx() { req }: MyContext) {
    const { userID } = req.session;
    const data = await getConnection().query(`
      select *,
        (select count("followerId") as num_follower from follows where "followingId"=${id}),
        (select count("followingId") as num_following from follows where "followerId"=${id}),
        (select count(id) as num_post from post where "creatorId"=${id}),
        (select case 
          when ${userID} in (select "followerId" from follows where("followingId"=${id})) then TRUE
          else FALSE
          end "isFollowed") 
        from users where(id=${id});
    `);
    return data[0];
  }

  @Mutation(() => String)
  async addBook(@Arg("bookId") bookId: string, @Ctx() { req }: MyContext) {
    const { userID } = req.session;
    const book = {
      bookId: bookId,
      userId: userID,
    };
    const data = await Library.delete(book);
    if (data.affected === 0) {
      await Library.create(book).save();
      return "Added";
    }
    return "Deleted";
  }

  @Query(() => [String], { nullable: true })
  async getBooksId(@Arg("id") id: number) {
    const data = await getConnection().query(
      `select "bookId" from library where ("userId" = ${id})`
    );
    let response: any = [];
    data.forEach((element: any) => {
      response.push(element.bookId);
    });
    return response;
  }
}
