import { CollectionConfig } from 'payload';

export const RestaurantCollection: CollectionConfig<'restaurant'> = {
  slug: 'restaurant',
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'open',
      type: 'checkbox',
    },
  ],
};
