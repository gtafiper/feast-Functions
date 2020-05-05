import {Ingredient} from './ingredient';

export interface UserRecipe {
  id?: string;
  name: string;
  ingredients?: Array<Ingredient>;
  estimatedTime?: number;
  userId?: string;
}
