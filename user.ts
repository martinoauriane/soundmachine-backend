export interface User {
  id?: number;
  name?: string;
  pseudo?: string;
  authenticationToken?: string | null;
  email: string;
  password: string;
  tracks?: Track[];
}
