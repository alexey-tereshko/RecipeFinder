import { getRealm } from './realmService';
import { FavoriteSchema } from '@/schemas/FavoriteSchema';
import type { RecipeListItem } from '@/types/recipe';

export const favoritesService = {
  getAll: async (): Promise<RecipeListItem[]> => {
    const realm = await getRealm();
    const favorites = realm.objects<FavoriteSchema>('Favorite').sorted('addedAt', true);
    
    return Array.from(favorites).map(fav => ({
      id: fav.id,
      name: fav.name,
      image: fav.image,
    }));
  },

  add: async (recipe: RecipeListItem): Promise<void> => {
    const realm = await getRealm();
    const existing = realm.objectForPrimaryKey<FavoriteSchema>('Favorite', recipe.id);
    
    if (existing) {
      return;
    }
    
    realm.write(() => {
      realm.create('Favorite', {
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        addedAt: new Date(),
      });
    });
  },

  remove: async (recipeId: number): Promise<void> => {
    const realm = await getRealm();
    const favorite = realm.objectForPrimaryKey<FavoriteSchema>('Favorite', recipeId);
    
    if (favorite) {
      realm.write(() => {
        realm.delete(favorite);
      });
    }
  },

  isFavorite: async (recipeId: number): Promise<boolean> => {
    const realm = await getRealm();
    const favorite = realm.objectForPrimaryKey<FavoriteSchema>('Favorite', recipeId);
    return favorite !== null;
  },
};

