import {UserRepository} from './user.repository';
import * as admin from 'firebase-admin';
import {User} from '../models/user';

export class UserRepositoryFirebase implements UserRepository {
  userPath = 'Users';
  userRecipes = 'UserRecipe';

  deleteUser(uid: string): Promise<any> {
    return admin.auth().deleteUser(uid);
  }

  deleteAllUserRecipes(user: User): Promise<any> {

    const promise = new Promise(((resolve, reject) => {
      let requestSuccess = 0;
      let requestToBeSend = user.userRecipes.length;
      user.userRecipes.forEach(value => {
        this.db().doc(`${this.userRecipes}/${value.id}`).delete().then(() => {
          requestSuccess++;
          if (requestSuccess === requestToBeSend) {
            resolve(1);
          }
        }).catch(err => {
          reject(err);
        });
      });
    }));
    return promise;

  }


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

}
