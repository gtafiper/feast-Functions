import {UserRepository} from './user.repository';
import {User} from "../models/user";
export class UserService {

 constructor(private userRepo: UserRepository){}


 async deleteUser(uId: string){

   await this.userRepo.deleteUser(uId);

 }

 async deleteUserRecipes(user: User){
   await this.userRepo.deleteAllUserRecipes(user);
 }

}
