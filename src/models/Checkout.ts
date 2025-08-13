import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Book } from './Book';
import { Member } from './Member';

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  bookId: string;

  @Column()
  memberId: string;

  @Column()
  checkoutDate: string;

  @Column()
  dueDate: string;

  @Column({ nullable: true })
  returnDate?: string;

  @ManyToOne(() => Book, book => book.checkouts)
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @ManyToOne(() => Member, member => member.checkouts)
  @JoinColumn({ name: 'memberId' })
  member: Member;
}
