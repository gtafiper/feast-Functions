import {UserRepository} from './user.repository';
import * as admin from 'firebase-admin';

export class UserRepositoryFirebase implements UserRepository{
  userPath = 'Users';

  deleteUser(uid: string): Promise<any> {
    return this.db().doc(`${this.userPath}/${uid}`).delete()
  }

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

}
