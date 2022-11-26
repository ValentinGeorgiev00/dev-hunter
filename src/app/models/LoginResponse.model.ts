import { User } from './user.model';

export class LoginResponse {
  accessToken!: string;
  user!: User;
}
