import { Column, Entity } from 'typeorm';
import { MyanCommerceEntity } from '../base/base.entity';

import { DeepPartial } from '@myancommerce/common/dist/shared-types';

/**
 * @description
 * A User represents any authenticated user of the MyanCommerce API. This includes both
 * {@link Administrator}s as well as registered {@link Customer}s.
 *
 * @docsCategory entities
 */
@Entity()
export class User extends MyanCommerceEntity {
    constructor(input?: DeepPartial<User>) {
        super(input);
    }

    @Column({ type: Date, nullable: true })
    deletedAt: Date | null;

    @Column({ type: String, nullable: true })
    identifier: string;

    @Column({ default: false })
    verified: boolean;

    @Column({ type: Date, nullable: true })
    lastLogin: Date | null;
}
