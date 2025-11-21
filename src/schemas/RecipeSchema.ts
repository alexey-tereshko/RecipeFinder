import Realm from 'realm';

export class RecipeSchema extends Realm.Object<RecipeSchema> {
  id!: number;
  name!: string;
  image!: string;
  category?: string;
  ingredients!: Realm.List<string>;
  instructions!: Realm.List<string>;
  cachedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Recipe',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      image: 'string',
      category: 'string?',
      ingredients: 'string[]',
      instructions: 'string[]',
      cachedAt: 'date',
    },
  };
}

