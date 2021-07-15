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
import { Follows } from "../entities/Follows";

@ObjectType()
class UserResponse {
  @Field(() => [String], { nullable: true })
  errors?: String[];

  @Field(() => Users, { nullable: true })
  user?: Users;
}

export let currentUserId: null | number = null;

@Resolver()
export class UserResolver {
  @Query(() => Users, { nullable: true })
  async Me(@Ctx() { userID }: MyContext): Promise<Users | null> {
    const id = userID;
    if (id === null) return id;
    const data = await getConnection().query(`
      select *,
        (select count("followerId") as num_follower from follows where "followingId"=${id}),
        (select count("followingId") as num_following from follows where "followerId"=${id}),
        (select count(id) as num_post from post where "creatorId"=${id})
        from users where(id=${id});
    `);
    return data[0];
  }

  @Mutation(() => Users, { nullable: true })
  async addUser(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("imageUrl") imageUrl: string
  ) {
    const curUser = {
      displayName: name,
      username: Math.random().toString(36).substring(8),
      email: email,
      photoUrl: imageUrl,
      bio: "",
    };
    let user = await Users.findOne({ email: email });
    if (user !== undefined) {
      currentUserId = user.id;
      return user;
    }
    user = await Users.create(curUser).save();
    currentUserId = user.id;
    Follows.create({ followerId: user.id, followingId: user.id }).save();
    return user;
  }

  @Mutation(() => UserResponse, { nullable: true })
  async UpdateUser(
    @Ctx() { userID }: MyContext,
    @Arg("username") username: string,
    @Arg("displayName") displayName: string,
    @Arg("bio") bio: string
  ): Promise<UserResponse | undefined> {
    const id = Number(userID);
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
  Logout() {
    currentUserId = null;
    return true;
  }

  @Query(() => [Users], { nullable: true })
  async getSearchUsers(
    @Arg("detail") deatil: String,
    @Ctx() { userID }: MyContext
  ) {
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
  async getOneUser(@Arg("id") id: number, @Ctx() { userID }: MyContext) {
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
  async addBook(@Arg("bookId") bookId: string, @Ctx() { userID }: MyContext) {
    const book = {
      bookId: bookId,
      userId: Number(userID),
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
