import { DataSource } from 'typeorm';
import { entities } from '../typeormEntities';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: entities,
  synchronize: true,
  logging: false,
});

beforeAll(async () => await dataSource.initialize());

beforeEach(async () => {
  await dataSource.synchronize(true);
});

afterAll(async () => {
  await dataSource.destroy();
});
