export class FactoryStorageMaker {
  postGenerators: { [factoryName: string]: string[] } = {};

  addPostGenerator(factoryName: string, fnName: string): void {
    if (!this.postGenerators[factoryName]) {
      this.postGenerators[factoryName] = [fnName];
    } else {
      this.postGenerators[factoryName].push(fnName);
    }
  }

  getPostGenerators(factoryName: string): string[] {
    return this.postGenerators[factoryName];
  }
}

export const factoryStorage = new FactoryStorageMaker();
