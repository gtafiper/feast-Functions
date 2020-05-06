
import {UserRecipeRepository} from './user-Recipe.repository';

export class UserRecipeService {

  constructor(private urRepo: UserRecipeRepository) {
  }


  async deleteUserRecipePreview(userId: string, recipeName: string, id: string) {
    await this.urRepo.deleteUserRecipePreview(userId, recipeName, id);
  }

  async createUserRecipePreview(userId: string, recipeName: string, id: string) {
    await this.urRepo.createUserRecipePreview(userId, recipeName, id);
  }

  async updateUserRecipePreview(userId: string, recipeName: string, id: string) {
    await this.urRepo.updateUserRecipePreview(userId, recipeName, id);
  }
}
