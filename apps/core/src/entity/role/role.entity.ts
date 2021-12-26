import { Column, Entity } from 'typeorm';
import { DeepPartial } from '@myancommerce/shared';
import { MyanCommerceEntity } from '../base/base.entity';

/**
 * @description
 * A Role represents a collection of permissions which determine the authorization
 * level of a {@link User}.
 *
 * @docsCategory entities
 */
@Entity()
export class Role extends MyanCommerceEntity {
    constructor(input?: DeepPartial<Role>) {
        super(input);
    }

    @Column() code: string;

    @Column() description: string;
}
