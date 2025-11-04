import { Factory } from '../factory';
import type { CollectionSlug, Payload, TypedCollection } from 'payload';
import { PayloadAdapter, PayloadArgs } from '../adapters/payload.adapter';
import { Constructable } from '../types';

class EmptyClass {}

export abstract class PayloadFactory<Slug extends CollectionSlug> extends Factory<
  TypedCollection[Slug],
  [PayloadArgs?]
> {
  protected entity: Constructable<TypedCollection[Slug]> = EmptyClass as Constructable<TypedCollection[Slug]>;
  protected adapter: PayloadAdapter<Slug>;
  constructor(
    protected payload: Payload,
    protected slug: Slug,
    protected defaultArgs: PayloadArgs = {
      draft: false,
      locale: 'en',
    },
  ) {
    super();
    this.adapter = new PayloadAdapter<Slug>(payload, slug, defaultArgs);
  }
}
