import {UserRepository} from './user.repository';
import {User} from "../models/user";

export class UserService {

  constructor(private userRepo: UserRepository) {
  }

  deleteUser(uId: string) {
    return this.userRepo.deleteUser(uId);
  }

  deleteUserRecipes(user: User) {
    if (user.userRecipes) {
      return this.userRepo.deleteAllUserRecipes(user);
    }
    return Promise.resolve();
  }

}
