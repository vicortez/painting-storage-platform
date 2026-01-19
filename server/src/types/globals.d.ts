import type { UserDTO } from '#src/models/user.model.ts'

declare global {
  var tempDB: unknown

  namespace Express {
    export interface Request {
      user?: UserDTO
    }
  }
}
export {}
