import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {DependencyFactory} from './dependencyFactory';

const serviceAccount = require("../secret.json")

const factory = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://feast-782f3.firebaseio.com"
});

exports.delete = functions.firestore
  .document('Users/{uId}').onDelete((snap) =>{
return factory.getUserController().delete(snap.id)
});

/*
exports.addUserRecipe = functions.firestore
  .document('UserRecipe/{uId}').onCreate((snapshot, context) => {

  });


 */

exports.deleteUserRcipes = functions.firestore.
document('Users/{uId}').onDelete((snapshot) => {
  return factory.getUserController().deleteUserRecipes(snapshot)
});


