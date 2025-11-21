export interface Recipe {
  id: number;
  name: string;
  image: string;
  category?: string;
  ingredients?: string[];
  instructions?: string[];
}

export interface RecipeListItem {
  id: number;
  name: string;
  image: string;
}

export interface RecipesResponse {
  recipes: RecipeListItem[];
  total: number;
  skip: number;
  limit: number;
}

