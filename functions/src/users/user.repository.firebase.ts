import {UserRepository} from './user.repository';
import * as admin from 'firebase-admin';
import {UserRecipe} from "../models/userRecipe";
import {User} from "../models/user";

export class UserRepositoryFirebase implements UserRepository {
  userPath = 'Users';
  userRecipes = 'UserRecipe'

  deleteUser(uid: string): Promise<any> {
    return admin.auth().deleteUser(uid);
    //return this.db().doc(`${this.userPath}/${uid}`).delete()
  }

  async deleteAllUserRecipes(user: User): Promise<any>{

    const listOfUserRecipes = this.db().collection(this.userRecipes).where('userId', '==', user.uid).get().then( value => {

      for(const i in listOfUserRecipes) {

       const userRecipe = value.docs[Number(i)].data() as UserRecipe;

       this.deleteUserRecipes(userRecipe)
     }
   })


  }
async deleteUserRecipes(userRecipe: UserRecipe): Promise<any>{
    await this.db().doc(`${this.userRecipes}/${userRecipe}`).delete()
}


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

}
