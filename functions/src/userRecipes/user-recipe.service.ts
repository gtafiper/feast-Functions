import {UserRecipeRepository} from './user-Recipe.repository';

export class UserRecipeService {

  constructor(private urRepo: UserRecipeRepository) {
  }


  deleteUserRecipePreview(userId: string, recipeName: string, id: string) {
    return this.urRepo.deleteUserRecipePreview(userId, recipeName, id);
  }

  createUserRecipePreview(userId: string, recipeName: string, id: string) {
    return this.urRepo.createUserRecipePreview(userId, recipeName, id);
  }

  updateUserRecipePreview(userId: string, recipeName: string, id: string) {
    return this.urRepo.updateUserRecipePreview(userId, recipeName, id);
  }
}
