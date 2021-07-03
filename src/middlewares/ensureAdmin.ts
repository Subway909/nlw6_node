import { Request, Response, NextFunction } from "express"


export function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const admin = true // fixme deixar dinamico

  if (admin) {
    return next()
  }

  return response.status(401).json({
    erro: "Unauthorized"
  })
}