export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserSignup {
  name: string;
  email: string;
  password: string;
}

export interface UserSignin {
  email: string;
  password: string;
}

export interface RolesRequest extends Request {
    user?: {
        userId: string;
        role: "user" | "superadmin" | "admin" | "coordinator";
    };
}

export interface TokenPayload {
    id: string;
    email: string;
}