import { Cook } from './Cook';

export class Restaurant {
  id?: number;
  name: string;
  description: string;
  open: boolean;
  cooks?: Cook[];
}
