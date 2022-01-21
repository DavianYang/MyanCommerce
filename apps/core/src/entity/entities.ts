import { User } from '../user/entities/user.entity';
import { Administrator } from '../administrator/entities/administrator.entity';
import { Customer } from '../customer/entities/customer.entity';
import { Role } from '../role/entities/role.entity';

// A map of all the core database entities.
export const coreEntitiesMap = {
    User,
    Administrator,
    Customer,
    Role,
};
