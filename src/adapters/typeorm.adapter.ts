import { getRepository } from 'typeorm';
import type { Entity } from 'typeorm';
import { Adapter } from './adapter';

export class TypeormAdapter extends Adapter {
  save<T>(instance: T, entity: typeof Entity): Promise<T> {
    return getRepository(entity).save(instance);
  }
}
