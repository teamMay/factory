import { EntityTarget, getRepository } from 'typeorm';
import { Adapter } from './adapter';

export class TypeormAdapter extends Adapter {
  save<T>(instance: T, entity: EntityTarget<T>): Promise<T> {
    return getRepository(entity).save(instance);
  }
}
