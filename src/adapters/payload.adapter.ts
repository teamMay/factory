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
    private defaultArgs: PayloadArgs = {
      draft: false,
      locale: 'en',
    },
  ) {
    super();
  }

  save(instance: Omit<TypedCollection[Slug], 'id'>, ...args: [PayloadArgs?]): Promise<TypedCollection[Slug]>;
  save(instance: Omit<TypedCollection[Slug], 'id'>[], ...args: [PayloadArgs?]): Promise<TypedCollection[Slug][]>;
  async save(
    instance: Omit<TypedCollection[Slug], 'id'> | Omit<TypedCollection[Slug], 'id'>[],
    ...args: [PayloadArgs?]
  ) {
    const { draft = this.defaultArgs.draft, locale = this.defaultArgs.locale } = args[0] || {};
    const instances = Array.isArray(instance) ? instance : [instance];
    const savedInstances = await Promise.all(
      instances.map((data) =>
        this.payload.create({
          collection: this.slug,
          data: {
            ...data,
            _status: draft ? 'draft' : 'published',
          },
          locale,
          // Funny: this draft is not to have document as draft... it just should be false
          draft: false,
        }),
      ),
    );
    return Array.isArray(instance) ? savedInstances : savedInstances[0];
  }
}
