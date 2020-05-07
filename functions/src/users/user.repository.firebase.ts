import {UserRepository} from './user.repository';
import * as admin from 'firebase-admin';
import {UserRecipe} from "../models/userRecipe";
import {User} from "../models/user";

export class UserRepositoryFirebase implements UserRepository {
  userPath = 'Users';
  userRecipes = 'UserRecipe'

  deleteUser(uid: string): Promise<any> {
    return admin.auth().deleteUser(uid).then(Promise.resolve)
  }

  deleteAllUserRecipes(user: User): any {
    return this.db().collection(this.userRecipes).
    where('userId', '==', user.uid).get().then(value => {
      value.docs.forEach(value1 => {
        this.deleteUserRecipes(value1.data() as UserRecipe)
      });
    })
  }

    deleteUserRecipes(userRecipe: UserRecipe): any{
     return this.db().doc(`${this.userRecipes}/${userRecipe.id}`).delete()
  }


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

}
