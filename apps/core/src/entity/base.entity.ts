import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { DeepPartial, ID } from '@myancommerce/shared';

/**
 * @description
 * This is the base class from which all entities inherit. The type of
 * the `id` property is defined by the {@link EntityIdStrategy}.
 *
 * @docsCategory entities
 */
export abstract class MyanCommerceEntity {
    protected constructor(input?: DeepPartial<MyanCommerceEntity>) {
        if (input) {
            for (const [key, value] of Object.entries(input)) {
                (this as any)[key] = value;
            }
        }
    }

    @PrimaryGeneratedColumn()
    id: ID;

    @CreateDateColumn() createdAt: Date;

    @UpdateDateColumn() updatedAt: Date;
}
