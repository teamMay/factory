import { factoryStorage, FactoryStorageMaker } from '../src';

describe('FactoryStorageMaker', () => {
  it('add a single postGenerator', () => {
    // Given
    const storageInstance = new FactoryStorageMaker();
    const factoryName = 'factory1';
    const methodName = 'method1';
    // When
    storageInstance.addPostGenerator(factoryName, methodName);
    // Then
    expect(storageInstance.postGenerators[factoryName]).toEqual([methodName]);
  });

  it('add several postGenerators returns a list', () => {
    // Given
    const storageInstance = new FactoryStorageMaker();
    const factoryName = 'factory1';
    const firstMethodName = 'method1';
    const secondMethodName = 'method2';
    // When
    storageInstance.addPostGenerator(factoryName, firstMethodName);
    storageInstance.addPostGenerator(factoryName, secondMethodName);
    // Then
    expect(storageInstance.postGenerators).toEqual({ [factoryName]: [firstMethodName, secondMethodName] });
  });

  it('return factory post generator method when a factory name is given', () => {
    // Given
    const storageInstance = new FactoryStorageMaker();
    const factoryName = 'factory1';
    const methodName = 'method1';
    storageInstance.addPostGenerator(factoryName, methodName);
    // When
    const generators = storageInstance.getPostGenerators(factoryName);
    // Then
    expect(generators).toEqual([methodName]);
  });
});

describe('factoryStorage', () => {
  it('is an instance of FactoryStorageMaker', () => {
    expect(factoryStorage).toBeInstanceOf(FactoryStorageMaker);
  });
});
