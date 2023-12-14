export interface AuthProps {
  permissions: {
    [key: string]: boolean;
  };
  user: {
    id: number;
    email: string;
    name: string;
  };
}
