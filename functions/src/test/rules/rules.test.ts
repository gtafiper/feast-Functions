const {setup, teardown} = require('./helpers')

describe('Rules testing', () => {
  afterEach(async () => {
    await teardown();
  })

  test('Should deny a read to the recipe collection if not logged id', async () => {
    const db = await setup();
    const recipesRef = db.collection('Recipe')
    await expect(recipesRef.get()).toDeny();
  })

  test('should Allow writing to the recipe collection if the user has the role Standard', async () => {
    const db = await setup({
      uid: 'isAUser',
      role: 'Admin'
    });
    const recipeRef = db.collection('Recipe')
    await expect(recipeRef.add({data: 'something'})).toAllow();
  })
})
