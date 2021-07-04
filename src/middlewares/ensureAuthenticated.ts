import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization

  if (!authToken) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(" ")

  try {
    const { sub } = verify(token, "ae1537e677665a65f8b9aeca42317569") as IPayload

    request.user_id = sub
  }
  catch (err) {
    return response.status(401).end()
  }

  return next()
}