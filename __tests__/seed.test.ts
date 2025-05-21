import { runSeed } from '../src/seed';

class DummyFactory {
  static created: any[] = [];
  constructor() {}
  async createMany(n: number, attrs?: any) {
    for (let i = 0; i < n; i++) {
      DummyFactory.created.push(attrs || {});
    }
    return DummyFactory.created;
  }
}

describe('runSeed', () => {
  beforeEach(() => {
    DummyFactory.created = [];
  });

  it('should instantiate factories and run seeds', async () => {
    const fakeDataSource = {};
    await runSeed({
      dataSource: fakeDataSource as any,
      factories: { DummyFactory },
      seeds: async ({ DummyFactory }) => {
        await DummyFactory.createMany(3, { foo: 'bar' });
      },
    });
    expect(DummyFactory.created).toHaveLength(3);
    expect(DummyFactory.created[0]).toEqual({ foo: 'bar' });
  });
});
