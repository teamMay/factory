export class FactoryStorageMaker {
  postGenerators: { [factoryName: string]: Array<string | symbol> } = {};

  addPostGenerator(factoryName: string, fnName: string | symbol): void {
    if (!this.postGenerators[factoryName]) {
      this.postGenerators[factoryName] = [fnName];
    } else {
      this.postGenerators[factoryName].push(fnName);
    }
  }

  getPostGenerators(factoryName: string): Array<string | symbol> {
    return this.postGenerators[factoryName];
  }
}

export const factoryStorage = new FactoryStorageMaker();
