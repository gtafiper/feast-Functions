import {UserRecipe} from './userRecipe';

export interface User {
  uid: string;
  email: string;
  name?: string;
  userRecipes: UserRecipe[];
  role?: string;

}

