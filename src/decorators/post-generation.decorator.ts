import { factoryStorage } from '../factory-storage';

export const PostGeneration = (): MethodDecorator => (target, propertyKey) => {
  factoryStorage.addPostGenerator(target.constructor.name, propertyKey);
};
