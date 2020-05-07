import {UserRecipeService} from './user-recipe.service';

export class UserRecipeController {

  constructor(private urs: UserRecipeService) {
  }

  delete(userId: string, recipeName: string, id: string) {
    return this.urs.deleteUserRecipePreview(userId, recipeName, id);
  }

  update(userId: string, recipeName: string, id: string) {
    return this.urs.updateUserRecipePreview(userId, recipeName, id);
  }

  create(userId: string, recipeName: string, id: string) {
    return this.urs.createUserRecipePreview(userId, recipeName, id);
  }

}
