import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Checkout } from './Checkout';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  isbn: string;

  @Column({ default: true })
  available: boolean;

  @OneToMany(() => Checkout, checkout => checkout.book)
  checkouts: Checkout[];
}
