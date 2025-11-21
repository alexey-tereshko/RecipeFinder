import Realm from 'realm';
import { getRealm } from './realmService';
import { RecipeSchema } from '@/schemas';
import type { Recipe, RecipeListItem } from '@/types/recipe';

export const recipeCacheService = {
  saveRecipe: async (recipe: Recipe): Promise<void> => {
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Recipe', {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        category: recipe.category || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        cachedAt: new Date(),
      }, Realm.UpdateMode.Modified);
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
      category: recipe.category || undefined,
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
          existing.cachedAt = new Date();
        } else {
          realm.create('Recipe', {
            id: recipe.id,
            name: recipe.name,
            image: recipe.image,
            category: '',
            ingredients: [],
            instructions: [],
            cachedAt: new Date(),
          });
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

