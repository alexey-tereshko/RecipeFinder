import Realm from 'realm';

export class FavoriteSchema extends Realm.Object<FavoriteSchema> {
  id!: number;
  name!: string;
  image!: string;
  addedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'Favorite',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      image: 'string',
      addedAt: 'date',
    },
  };
}

