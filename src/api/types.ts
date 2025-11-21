import type { Recipe, RecipeListItem, RecipesResponse } from '../types/recipe';

export interface FetchRecipesParams {
  limit?: number;
  skip?: number;
  select?: string;
}

export interface SearchRecipesParams extends FetchRecipesParams {
  q: string;
}

export interface ApiClient {
  fetchRecipes: (params?: FetchRecipesParams) => Promise<RecipesResponse>;
  searchRecipes: (params: SearchRecipesParams) => Promise<RecipesResponse>;
  fetchRecipeById: (id: number) => Promise<Recipe>;
}

