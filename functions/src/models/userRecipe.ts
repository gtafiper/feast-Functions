import {Ingredient} from './ingredient';
import {User} from './user';

export interface userRecipe {
  id?: string;
  name: string;
  ingredients: Array<Ingredient>;
  estimatedTime: number;
  user: User;
}
