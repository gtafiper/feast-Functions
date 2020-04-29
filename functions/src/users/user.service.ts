import {UserRepository} from './user.repository';

import {User} from '../models/user';



export class UserService {

 constructor(private userRepo: UserRepository){}


 async deleteUser(user: User){

   await this.userRepo.deleteUser(user.uid)

 }

}
