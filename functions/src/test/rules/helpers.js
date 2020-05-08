const firebase = require('@firebase/testing');
const fs = require('fs');

module.exports.setup = async (auth, data) => {
  const projectId = `rules-test-${Date.now()}`;

  const app = firebase.initializeTestApp({
      projectId,
      auth
  });

  const db = app.firestore();

  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore-test.rules', 'utf8')
  })

  if(data) {
    for (const key in data) {
      const ref = db.doc(key);
      await ref.set(data[key])
    }
  }

  await firebase.loadFirestoreRules({
    projectId,
    rules: fs.readFileSync('firestore.rules', 'utf8')
  })

  return db;
}

module.exports.teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()))
}

expect.extend({
  async toAllow(testPromise) {
    let pass = false;
    try {
      await firebase.assertSucceeds(testPromise);
      pass = true;
    } catch (e) {
      console.log(e);
    }

    return {
      pass,
      message: () => 'Expected firebase operation to be allowed, but was denied'
    }
  }
})

expect.extend({
  async toDeny(testPromise) {
    let pass = false;
    try {
      await firebase.assertFails(testPromise);
      pass = true;
    } catch (e) {
      console.log(e);
    }

    return {
      pass,
      message: () => 'Expected firebase operation to be denied, but was allowed'
    }
  }
})
