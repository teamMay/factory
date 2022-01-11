import { factoryStorage } from '../factory-storage';

export const PostGeneration =
  () =>
  (target: any, propertyKey: string): void => {
    factoryStorage.addPostGenerator(target.constructor.name, propertyKey);
  };
