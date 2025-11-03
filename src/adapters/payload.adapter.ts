import { Adapter } from './adapter';
import type { CollectionSlug, Payload, TypedCollection } from 'payload';

export interface PayloadArgs {
  draft?: boolean;
  locale?: string;
}

export class PayloadAdapter<Slug extends CollectionSlug> extends Adapter<TypedCollection[Slug], [PayloadArgs?]> {
  constructor(
    private payload: Payload,
    private slug: Slug,
  ) {
    super();
  }

  save(instance: Omit<TypedCollection[Slug], 'id'>, ...args: [PayloadArgs?]): Promise<TypedCollection[Slug]>;
  save(instance: Omit<TypedCollection[Slug], 'id'>[], ...args: [PayloadArgs?]): Promise<TypedCollection[Slug][]>;
  async save(
    instance: Omit<TypedCollection[Slug], 'id'> | Omit<TypedCollection[Slug], 'id'>[],
    ...args: [PayloadArgs?]
  ) {
    const { draft = false, locale = 'en' } = args[0] || {};
    const instances = Array.isArray(instance) ? instance : [instance];
    const savedInstances = await Promise.all(
      instances.map((data) =>
        this.payload.create({
          collection: this.slug,
          data,
          draft,
          locale,
        }),
      ),
    );
    return Array.isArray(instance) ? savedInstances : savedInstances[0];
  }
}
