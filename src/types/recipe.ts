export interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine?: string;
  tags?: string[];
  description?: string;
  servings?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
  rating?: number;
  reviewCount?: number;
  difficulty?: string;
  caloriesPerServing?: number;
  mealType?: string[];
  ingredients?: string[];
  instructions?: string[];
}

export interface RecipeListItem {
  id: number;
  name: string;
  image: string;
  cuisine?: string;
  tags?: string[];
  mealType?: string[];
}

export interface RecipesResponse {
  recipes: RecipeListItem[];
  total: number;
  skip: number;
  limit: number;
}

