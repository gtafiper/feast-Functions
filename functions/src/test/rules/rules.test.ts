const {setup, teardown} = require('./helpers');


describe('Rules testing', () => {
  afterEach(async () => {
    await teardown();
  });

  afterAll(() => {
    teardown();
  });

  // test if recipe denied
  test('test if recipe denied read if not user, write if not admin', async () => {
    const db = await setup(null, mockData);
    const recipesRef = db.collection('Recipes');
    // @ts-ignore
    await expect(recipesRef.get()).toDeny();

    const recipesRef2 = db.collection('Recipes');
    // @ts-ignore
    await expect(recipesRef2.add({data: 'test'})).toDeny();
    const db2 = await setup(mockStandardUser, mockData);

    const recipesRef4 = db2.collection('Recipes');
    // @ts-ignore
    await expect(recipesRef4.add({data: 'test'})).toDeny();
  });

  // test if recipe read if user
  test('test if allow recipe read if user', async () => {
    const db = await setup(mockStandardUser, mockData);
    const recipesRef = db.collection('Recipes');
    // @ts-ignore
    await expect(recipesRef.get()).toAllow();
  });

  // test if recipe write if admin
  test('test if recipe write if admin', async () => {
    const db = await setup(mockAdminUser, mockData);
    const recipesRef = db.collection('Recipes');
    // @ts-ignore
    await expect(recipesRef.add({data: 'test'})).toAllow();
  });

  // test if Users read, write denied
  test('test if Users read, write denied', async () => {
    const db = await setup(null, mockData);
    const recipesRef = db.collection('Users');
    // @ts-ignore
    await expect(recipesRef.get()).toDeny();

    const db2 = await setup(null, mockData);
    const recipesRef2 = db2.collection('Users');
    // @ts-ignore
    await expect(recipesRef2.add({data: 'test'})).toDeny();

    const db3 = await setup(mockStandardUser, mockData);
    const recipesRef3 = db3.doc('Users/1');
    // @ts-ignore
    await expect(recipesRef3.set({data: 'test'})).toDeny();
  });
  // test if Users read, write if author
  test('test if Users read, write if author', async () => {
    const db = await setup(mockStandardUser, mockData);
    const userRef = db.doc('Users/' + mockStandardUser.uid);
    // @ts-ignore
    await expect(userRef.set(mockStandardUser)).toAllow();
  });

  // test if Users read, write if Admin
  test('should allow write from the users collection if the user is admin', async () => {
    const db = await setup(mockAdminUser, mockData);
    const userRef = db.collection('Users');
    // @ts-ignore
    await expect(userRef.add({data: 'test'})).toAllow();
  });

  // test if UserRecipe read, write denied
  test('test if UserRecipe read, write denied', async () => {
    const db = await setup(null, mockData);
    const userRecipeRef = db.collection('UserRecipe');
    // @ts-ignore
    await expect(userRecipeRef.get()).toDeny();

    const db2 = await setup(null, mockData);
    const userRecipeRef2 = db2.collection('UserRecipe');
    // @ts-ignore
    await expect(userRecipeRef2.add({userId: '1'})).toDeny();

    const db3 = await setup(mockStandardUser);
    const userRecipeRef3 = db3.collection('UserRecipe');
    // @ts-ignore
    await expect(userRecipeRef3.add({userId: '1'})).toDeny();
  });

  // test if UserRecipe read, write if author
  test('test if UserRecipe read, write if author', async () => {
    const db = await setup(mockStandardUser, mockData);
    const userRecipeRef = db.doc('UserRecipe/2');
    // @ts-ignore
    await expect(userRecipeRef.get()).toAllow();

    const db1 = await setup(mockStandardUser, mockData);
    const userRecipeRef1 = db1.collection('UserRecipe');
    // @ts-ignore
    await expect(userRecipeRef1.add({userId: '2'})).toAllow();

    const db2 = await setup(mockStandardUser, mockData);
    const userRecipeRef2 = db2.doc('UserRecipe/2');
    await expect(userRecipeRef2.update({
      name: 'test 2',
      userId: '2'
      // @ts-ignore
    })).toAllow();
  });

  // test if UserRecipe read, write if admin
  test('test if UserRecipe read, write if admin', async () => {
    const db = await setup(mockAdminUser, mockData);
    const userRecipeRef = db.doc('UserRecipe/2');
    // @ts-ignore
    await expect(userRecipeRef.get()).toAllow();

    const db1 = await setup(mockAdminUser, mockData);
    const userRecipeRef1 = db1.collection('UserRecipe');
    // @ts-ignore
    await expect(userRecipeRef1.add({userId: '2'})).toAllow();

    const db2 = await setup(mockAdminUser, mockData);
    const userRecipeRef2 = db2.doc('UserRecipe/2');
    await expect(userRecipeRef2.update({
      name: 'test 2',
      userId: '2'
      // @ts-ignore
    })).toAllow();
  });
});

const mockStandardUser = {
  uid: '2'
};

const mockAdminUser = {
  uid: '1'
};

const mockRecipes1 = {
  name: 'test 1',
  userId: '1'
};

const mockRecipes2 = {
  name: 'test 2',
  userId: '2'
};

const mockData = {
  'Users/1': {
    uid: '1',
    email: 'test',
    userRecipe: [],
    role: 'Admin'
  },
  'Users/2': {
    uid: '2',
    email: 'test',
    userRecipe: [],
    role: 'Standard'
  },
  'UserRecipe/1': mockRecipes1,
  'UserRecipe/2': mockRecipes2
};




