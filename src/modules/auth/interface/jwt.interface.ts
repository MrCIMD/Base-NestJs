export interface IJwt {
  id: string;
  email: string;
  roles: string[];
  exp?: Date;
}
