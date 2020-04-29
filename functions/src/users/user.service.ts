import {UserRepository} from './user.repository';
export class UserService {

 constructor(private userRepo: UserRepository){}


 async deleteUser(uId: string){

   await this.userRepo.deleteUser(uId)

 }

}
