import { Factory } from '../factory';
import type { CollectionSlug, Payload, TypedCollection } from 'payload';
import { PayloadAdapter, PayloadArgs } from '../adapters/payload.adapter';
import { Constructable } from '../types';

class EmptyClass {}

export abstract class PayloadFactory<Slug extends CollectionSlug> extends Factory<
  TypedCollection[Slug] & { _status?: 'draft' | 'published' },
  [PayloadArgs?]
> {
  public static adapterDefaultArgs: PayloadArgs = {
    draft: false,
    locale: 'en',
  };
  protected entity: Constructable<TypedCollection[Slug] & { _status?: 'draft' | 'published' }> =
    EmptyClass as Constructable<TypedCollection[Slug] & { _status?: 'draft' | 'published' }>;
  protected adapter: PayloadAdapter<Slug>;
  constructor(
    protected payload: Payload,
    protected slug: Slug,
    protected adapterDefaultArgs?: PayloadArgs,
  ) {
    super();
    this.adapter = new PayloadAdapter<Slug>(payload, slug, adapterDefaultArgs ?? PayloadFactory.adapterDefaultArgs);
  }
}
