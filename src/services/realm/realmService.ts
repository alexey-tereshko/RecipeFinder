import Realm from 'realm';
import { RecipeSchema, FavoriteSchema } from '@/schemas';

let realmInstance: Realm | null = null;

export const getRealm = async (): Promise<Realm> => {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open({
    schema: [RecipeSchema, FavoriteSchema],
    schemaVersion: 1,
  });

  return realmInstance;
};

export const closeRealm = (): void => {
  if (realmInstance && !realmInstance.isClosed) {
    realmInstance.close();
    realmInstance = null;
  }
};

