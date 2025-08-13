import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Checkout } from './Checkout';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        type: 'varchar',
        enum: ['active', 'inactive'],
        default: 'active'
    })
    membershipStatus: 'active' | 'inactive';

    @OneToMany(() => Checkout, checkout => checkout.member)
    checkouts: Checkout[];
}
