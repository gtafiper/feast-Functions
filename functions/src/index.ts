import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependencyFactory';
import {UserRecipe} from './models/userRecipe';

const serviceAccount = require('../secret.json');


// @ts-ignore
const Recipes = 'Recipes';
// @ts-ignore
const UserRecipe = 'UserRecipe';
// @ts-ignore
const Users = 'Users';

const factory = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://feast-782f3.firebaseio.com'
});

exports.deleteUserInAuth = functions.firestore
  .document(Users + '/{uId}').onDelete((snap) => {
    return factory.getUserController().delete(snap.id);
  });

exports.deleteUserRecipePreview = functions.firestore
  .document(UserRecipe + '/{id}').onDelete(snapshot => {
    const temp = snapshot.data() as UserRecipe;
    return factory.getUserRecipeController().delete(temp.userId, temp.name, snapshot.id);
  });

exports.createUserRecipePreview = functions.firestore
  .document(UserRecipe + '/{id}').onCreate(snapshot => {
    const temp = snapshot.data() as UserRecipe;
    return factory.getUserRecipeController().create(temp.userId, temp.name, snapshot.id);
  });

exports.updateUserRecipePreview = functions.firestore
  .document(UserRecipe + '/{id}').onUpdate(snapshot => {
    const temp = snapshot.after.data() as UserRecipe;
    return factory.getUserRecipeController().update(temp.userId, temp.name, snapshot.before.id);
  });


