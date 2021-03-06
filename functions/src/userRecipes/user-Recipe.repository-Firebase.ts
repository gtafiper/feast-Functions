import {UserRecipeRepository} from './user-Recipe.repository';
import * as admin from 'firebase-admin';
import FieldValue = admin.firestore.FieldValue;

export class UserRecipeRepositoryFirebase implements UserRecipeRepository {

  userPath: string = 'Users';

  public addUserRecipe(userId: string, recipeName: string, id: string): Promise<any> {
    const userRecipe = {name: recipeName, id: id};
    return this.db().doc(`${this.userPath}/${userId}`).set(userRecipe);
  }


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  public createUserRecipePreview(userId: string, recipeName: string, id: string): any {
    return this.db().doc(`${this.userPath}/${userId}`)
      .set(
        {
          userRecipes: FieldValue.arrayUnion(
            {
              name: recipeName, id: id
            }
          )
        },
        {
          merge: true
        }
      );
  }

  public deleteUserRecipePreview(urId: string, recipeName: string, userId: string): any {

    return this.db().doc(`${this.userPath}/${userId}`).get().then(data => {
      const promise = new Promise(((resolve, reject) => {
        if (data.exists) {

          this.db().doc(`${this.userPath}/${userId}`).update(
            {
              userRecipes: FieldValue.arrayRemove({
                name: recipeName, id: urId
              })
            })
            .then(() => {
              resolve();
            })
            .catch(reason => {
              reject(reason);
            });

        }
        resolve();
      }));

      return promise;
    });

  }

  public updateUserRecipePreview(userId: string, recipeName: string, id: string): any {
    return this.db().doc(`${this.userPath}/${userId}`)
      .set(
        {
          userRecipes: [
            {
              name: recipeName,
              id: id
            }
          ]
        },
        {
          merge: true
        }
      );
  }

}
