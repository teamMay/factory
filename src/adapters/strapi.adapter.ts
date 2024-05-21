import type { Strapi } from '@strapi/strapi';
import { Adapter } from './adapter';

export class StrapiAdapter extends Adapter {
  private strapi: Strapi;
  private entityId: string;

  constructor(strapi: Strapi, entityId: string) {
    super();
    this.strapi = strapi;
    this.entityId = entityId;
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  save<T extends Record<string, any> | Record<string, any>[]>(instance: T): Promise<T> {
    return this.strapi.entityService!.create(
      `api::${this.entityId}.${this.entityId}`,
      instance,
    ) as unknown as Promise<T>;
  }
}
