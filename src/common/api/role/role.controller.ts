import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Role } from 'src/common/entities/role.entity';

import { RoleService } from './role.service';

@Crud({
  model: {
    type: Role,
  },
  query: {
    sort: [
      {
        field: 'id',
        order: 'DESC',
      },
    ],
  },
})
@Controller('roles')
export class RoleController implements CrudController<Role> {
  constructor(public service: RoleService) {}
}
