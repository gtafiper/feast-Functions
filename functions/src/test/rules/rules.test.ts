const {setup, teardown} = require('./helpers')

describe('Rules testing', () => {
  afterEach(async () => {
    await teardown();
  })

  test('Should deny a read to the recipe collection if not logged id', async () => {
    const db = await setup();
    const recipeRef = db.collection('Recipe')
    await expect(recipeRef.get()).toDeny();
  })
})
