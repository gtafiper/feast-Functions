import {User} from "../models/user";

export interface UserRepository {
  deleteUser(uid: string): Promise<any>;
  deleteAllUserRecipes(user: User): Promise<any>
}
