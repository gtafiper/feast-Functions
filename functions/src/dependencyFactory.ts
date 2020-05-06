import {UserController} from './users/user.controller';
import {UserRepository} from './users/user.repository';
import {UserRepositoryFirebase} from './users/user.repository.firebase';
import {UserService} from './users/user.service';
import {UserRecipeController} from './userRecipes/user-recipe.controller';
import {UserRecipeRepositoryFirebase} from './userRecipes/user-Recipe.repository-Firebase';
import {UserRecipeService} from './userRecipes/user-recipe.service';
import {UserRecipeRepository} from './userRecipes/user-Recipe.repository';

export class DependencyFactory {

  getUserController(): UserController {
    const repo: UserRepository = new UserRepositoryFirebase();
    const service: UserService = new UserService(repo);
    return new UserController(service);
  }

  getUserRecipeController(): UserRecipeController {
    const repo: UserRecipeRepository = new UserRecipeRepositoryFirebase();
    const service: UserRecipeService = new UserRecipeService(repo);
    return new UserRecipeController(service);
  }

}
