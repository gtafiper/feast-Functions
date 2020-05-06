export interface UserRecipeRepository {

  addUserRecipe(userId: string, recipeName: string, id: string): Promise<any>

  deleteUserRecipePreview(urId: string, recipeName: string, userId: string): any;

  createUserRecipePreview(userId: string, recipeName: string, id: string): any;

  updateUserRecipePreview(userId: string, recipeName: string, id: string): any;
}
