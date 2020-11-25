import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { RoleService } from './role.service';
import { Role } from './../../entities/role.entity'

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
  constructor(public service: RoleService) { }
}
