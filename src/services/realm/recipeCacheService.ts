import Realm from 'realm';
import { getRealm } from './realmService';
import { RecipeSchema } from '@/schemas/RecipeSchema';
import type { Recipe, RecipeListItem } from '@/types/recipe';

export const recipeCacheService = {
  saveRecipe: async (recipe: Recipe): Promise<void> => {
    const realm = await getRealm();
    realm.write(() => {
      const recipeData: any = {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        category: recipe.cuisine || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        cachedAt: new Date(),
      };
      if (recipe.tags) {
        recipeData.tags = recipe.tags;
      }
      realm.create('Recipe', recipeData, Realm.UpdateMode.Modified);
    });
  },

  getRecipe: async (id: number): Promise<Recipe | null> => {
    const realm = await getRealm();
    const recipe = realm.objectForPrimaryKey<RecipeSchema>('Recipe', id);
    
    if (!recipe) {
      return null;
    }

    return {
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      cuisine: recipe.category || undefined,
      tags: recipe.tags?.length ? Array.from(recipe.tags) : undefined,
      ingredients: recipe.ingredients?.length ? Array.from(recipe.ingredients) : undefined,
      instructions: recipe.instructions?.length ? Array.from(recipe.instructions) : undefined,
    };
  },

  saveRecipesList: async (recipes: RecipeListItem[]): Promise<void> => {
    const realm = await getRealm();
    realm.write(() => {
      recipes.forEach(recipe => {
        const existing = realm.objectForPrimaryKey<RecipeSchema>('Recipe', recipe.id);
        if (existing) {
          existing.name = recipe.name;
          existing.image = recipe.image;
          existing.category = recipe.cuisine || '';
          if (recipe.tags) {
            existing.tags.splice(0, existing.tags.length, ...recipe.tags);
          } else {
            existing.tags.splice(0, existing.tags.length);
          }
          existing.cachedAt = new Date();
        } else {
          const recipeData: any = {
            id: recipe.id,
            name: recipe.name,
            image: recipe.image,
            category: recipe.cuisine || '',
            tags: recipe.tags || [],
            ingredients: [],
            instructions: [],
            cachedAt: new Date(),
          };
          realm.create('Recipe', recipeData);
        }
      });
    });
  },

  getRecipesList: async (): Promise<RecipeListItem[]> => {
    const realm = await getRealm();
    const recipes = realm.objects<RecipeSchema>('Recipe');
    
    return Array.from(recipes).map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      cuisine: recipe.category || undefined,
      tags: recipe.tags?.length ? Array.from(recipe.tags) : undefined,
    }));
  },

  clearCache: async (): Promise<void> => {
    const realm = await getRealm();
    realm.write(() => {
      const recipes = realm.objects<RecipeSchema>('Recipe');
      realm.delete(recipes);
    });
  },
};

