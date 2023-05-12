import { OrganizationsRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './erros/user-already-exists-error'
import { Organization } from '@prisma/client'

interface RegisterUseCaseRequest {
  password: string
  email: string
  name: string
}

interface RegisterUseCaseResponse {
  user: Organization
}

export class RegisterUseCase {
  constructor(private usersRepository: OrganizationsRepository) {}

  async execute({
    password,
    email,
    name,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
