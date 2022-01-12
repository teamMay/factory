export class FactoryStorageMaker {
  postGenerators: { [factoryName: string]: Set<string | symbol> } = {};

  addPostGenerator(factoryName: string, fnName: string | symbol): void {
    if (!this.postGenerators[factoryName]) {
      this.postGenerators[factoryName] = new Set();
    }
    this.postGenerators[factoryName].add(fnName);
  }

  getPostGenerators(factoryName: string): Set<string | symbol> {
    return this.postGenerators[factoryName];
  }
}

export const factoryStorage = new FactoryStorageMaker();
