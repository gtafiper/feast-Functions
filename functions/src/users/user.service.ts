import {UserRepository} from './user.repository';
import {User} from '../models/user';
import {admin} from "firebase-admin/lib/auth";
import UserRecord = admin.auth.UserRecord;

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

  createUserByAuth(userRecord: UserRecord) {
    const userToBeMade = {
      uid: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName,
      role: 'Standard',
      userRecipes: []
    } as User
    return this.userRepo.createUserByAuth(userToBeMade);
  }
}
