// src/types/express.d.ts

import { JwtPayload } from "jsonwebtoken"; // Import any necessary types

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string }; // Extend the Request interface
    }
  }
}
