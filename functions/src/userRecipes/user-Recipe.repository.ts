

export interface UserRecipeRepository {

addUserRecipe(userId: string, recipeName: string, id: string): Promise<any>

}
