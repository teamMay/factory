import { DataSource } from 'typeorm';

let defaultDataSource: DataSource;
export const getDefaultDataSource = () => {
  return defaultDataSource;
};

export const setDefaultDataSource = (dataSource: DataSource) => {
  defaultDataSource = dataSource;
};
