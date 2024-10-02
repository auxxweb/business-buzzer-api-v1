declare global {
  namespace Express {
    export interface Request {
      user?: {
        _id?: string;
        name?: string;
        email?: string;
        password?: string;
        country?: string;
        industry?: string;
        position?: string;
        org?: string;
        status?: string;
        role?: string;
      };
    }
  }
}

export {};
