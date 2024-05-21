import { Strapi } from '@strapi/strapi';
import { StrapiAdapter } from '../adapters';
import { Factory } from '../factory';

let defaultStrapi: Strapi;
export const getDefaultStrapi = () => {
  return defaultStrapi;
};

export const setDefaultStrapi = (strapi: Strapi) => {
  defaultStrapi = strapi;
};

/**
 * This is a Factory with the StrapiAdapter already set
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export abstract class StrapiFactory<T extends Record<string, any>> extends Factory<T> {
  adapter: StrapiAdapter;
  strapi: Strapi;
  entityId: string;

  constructor(entityId: string, strapi?: Strapi) {
    super();
    this.strapi = defaultStrapi ?? strapi;
    this.entityId = entityId;
    if (!this.strapi) {
      throw new Error(
        'No Strapi instance provided. You should either provide a default one or pass one in the constructor',
      );
    }
    this.adapter = new StrapiAdapter(this.strapi, entityId);
  }
}

export default StrapiFactory;
