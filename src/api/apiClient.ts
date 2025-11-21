import { API_BASE_URL, API_ENDPOINTS } from './constants';
import type { Recipe, RecipesResponse } from '@/types/recipe';
import type { ApiClient, FetchRecipesParams, SearchRecipesParams } from './types';

const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
};

export const createApiClient = (): ApiClient => ({
  fetchRecipes: async (params?: FetchRecipesParams): Promise<RecipesResponse> => {
    const url = buildUrl(API_ENDPOINTS.RECIPES, {
      limit: params?.limit ?? 10,
      skip: params?.skip ?? 0,
      select: params?.select ?? 'name,image,cuisine,tags,mealType',
    });
    return fetchJson<RecipesResponse>(url);
  },

  searchRecipes: async (params: SearchRecipesParams): Promise<RecipesResponse> => {
    const url = buildUrl(API_ENDPOINTS.RECIPES_SEARCH, {
      q: params.q,
      limit: params.limit ?? 10,
      skip: params.skip ?? 0,
      select: params.select ?? 'name,image,cuisine,tags,mealType',
    });
    return fetchJson<RecipesResponse>(url);
  },

  fetchRecipeById: async (id: number): Promise<Recipe> => {
    const url = buildUrl(`${API_ENDPOINTS.RECIPES}/${id}`);
    return fetchJson<Recipe>(url);
  },
});

export const apiClient = createApiClient();

