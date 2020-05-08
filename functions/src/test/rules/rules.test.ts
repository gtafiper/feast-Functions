const {setup, teardown} = require('./helpers')

describe('Rules testing', () => {
  afterEach(async () => {
    await teardown();
  })

  afterAll(() => {
    teardown();
  })

  test('Should deny a read to the recipe collection if not logged id', async () => {
    const db = await setup();
    const recipesRef = db.collection('Recipes')
    await expect(recipesRef.get()).toDeny();
  })

  test('should deny writing to the recipe collection if the user has the role Standard', async () => {
    const db = await setup({
      uid: 'isAUser',
      role: 'Standard'
    });
    const recipeRef = db.collection('Recipes')
    await expect(recipeRef.add({data: 'something'})).toDeny();
  })

  test('Should deny reading from userRecipes by default', async () => {
    const db = await setup();
    const userRecipeRef = db.collection('UserRecipe')
    await expect(userRecipeRef.get()).toDeny();
  })

  test('Should deny writing to userRecipes by default', async () => {
    const db = await setup();
    const userRecipeRef = db.collection('UserRecipe');
    await expect(userRecipeRef.add({data: 'hullu bullu'})).toDeny();
  })

  test('should allow write from the users collection if the user is admin', async () => {
    const db = await setup( {uid: '5lzBYBYT1yQmagbOYzIpTRU0WQ62'}, {
      uid: '5lzBYBYT1yQmagbOYzIpTRU0WQ62',
      email: 'ksdhjfkshdf',
      userRecipe: [],
      role: 'Admin'
    });
    const userRef = db.collection('Users');
    console.log(userRef);
    await expect(userRef.add({data: 'hullu bullu'})).toAllow();
  })
})
