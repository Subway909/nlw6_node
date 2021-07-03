import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
  email: string
  password: string
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {

    const userRepositories = getCustomRepository(UsersRepositories)

    // verificar se email existe
    const user = await userRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error("Email/Password incorrect")
    }

    // verificar se a senha está correta
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect")
    }

    // gerar token
    const token = sign({
      email: user.email
    }, "ae1537e677665a65f8b9aeca42317569", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token
  }
}

export { AuthenticateUserService }