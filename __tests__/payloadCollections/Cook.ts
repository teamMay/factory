import { CollectionConfig } from 'payload';

export const CookCollection: CollectionConfig<'cook'> = {
  slug: 'cook',
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'restaurant',
      type: 'relationship',
      relationTo: 'restaurant',
    },
  ],
};
