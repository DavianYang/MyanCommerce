import { DeepPartial } from '@myancommerce/shared';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { MyanCommerceEntity } from '../../entity/base.entity';
import { User } from '../../user/entities/user.entity';

/**
 * @description
 * A Admin has highest level of access on MyanCommerce.
 *
 * @docsCategory entities
 */
@Entity()
export class Administrator extends MyanCommerceEntity {
    constructor(input?: DeepPartial<Administrator>) {
        super(input);
    }

    @Column({ type: Date, nullable: true })
    deletedAt: Date | null;

    @Column() firstName: string;

    @Column() lastName: string;

    @Column({ unique: true }) emailAddress: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
