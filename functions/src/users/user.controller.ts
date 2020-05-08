import {UserService} from './user.service';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {User} from '../models/user';

export class UserController {

  constructor(private userService: UserService) {
  }

  delete(snap: string) {
    return this.userService.deleteUser(snap);
  }

  deleteUserRecipes(snap: DocumentSnapshot): Promise<void> {
    const user = snap.data() as User;
    return this.userService.deleteUserRecipes(user);
  }
}

