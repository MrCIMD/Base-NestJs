export interface IJwt {
  id: string | number;
  email: string;
  roles: string[];
  exp?: Date;
}
