import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cook } from './Cook';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  open: boolean;

  @OneToMany(() => Cook, (cook) => cook.restaurant)
  cooks: Cook[];
}
