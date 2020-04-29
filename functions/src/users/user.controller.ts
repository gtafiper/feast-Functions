import {User} from '../models/user';
import {UserService} from './user.service';

export class UserController {

  constructor(private userService: UserService) {}


  delete(snap: FirebaseFirestore.DocumentData | undefined){
    const user = snap as User;
    return this.userService.deleteUser(user);
  }
}
