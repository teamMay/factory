import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity()
export class Cook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn()
  restaurant: Relation<Restaurant>;
}
