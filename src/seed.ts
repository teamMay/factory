import type { DataSource } from 'typeorm';

/**
 * SeedRunner allows you to easily seed your database using your factories.
 *
 * Example usage:
 *   await runSeed({
 *     dataSource,
 *     seeds: async (factories) => {
 *       await factories.UserFactory.createMany(10);
 *       await factories.PostFactory.createMany(20);
 *     },
 *     factories: { UserFactory, PostFactory }
 *   });
 */
export async function runSeed<TFactories extends Record<string, any>>({
  dataSource,
  seeds,
  factories,
}: {
  dataSource: DataSource;
  seeds: (factories: Record<keyof TFactories, InstanceType<TFactories[keyof TFactories]>>) => Promise<void>;
  factories: TFactories;
}) {
  // Instantiate all factories with the provided dataSource
  const instantiatedFactories: Record<keyof TFactories, InstanceType<TFactories[keyof TFactories]>> = {} as Record<keyof TFactories, InstanceType<TFactories[keyof TFactories]>>;
  for (const [name, FactoryClass] of Object.entries(factories) as [keyof TFactories, TFactories[keyof TFactories]][]) {
    instantiatedFactories[name] = new FactoryClass(dataSource);
  }
  return seeds(instantiatedFactories);
}

// Optionally, users can create their own seed.ts file and call runSeed()
