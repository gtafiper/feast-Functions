import {UserRecipeRepository} from "./user-Recipe.repository";
import * as admin from "firebase-admin";
import {UserRecipe} from "../models/userRecipe";

export class UserRecipeRepositoryFirebase implements UserRecipeRepository{

  userPath: string = 'Users';

   addUserRecipe(userId: string, recipeName: string, id: string): Promise<any> {
    const userRecipe: UserRecipe = {name: recipeName, id: id}
    return  this.db().doc(`${this.userPath}/${userId}`).set(userRecipe)
  }


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

}
