import {Role} from './role';

export class Persona {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  birthday: Date;
  role: Role;
  login: string;
  password: string;
}
