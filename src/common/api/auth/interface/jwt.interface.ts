import { Role } from "src/common/entities/role.entity";

export interface IJwt {
  id: string | number;
  email: string;
  role: Role;
  exp?: Date;
}
