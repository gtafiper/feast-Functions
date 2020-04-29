import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import {DependencyFactory} from './dependencyFactory';

const serviceAccount = require("../loginapp.json")

const factory = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://feast-782f3.firebaseio.com"
});

exports.delete = functions.firestore
  .document('Users/{uId}').onDelete((snap) =>{
return factory.getUserController().delete(snap.id)

});



