import { OrganizationsRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './erros/user-already-exists-error'
import { Organization, UF } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  cep: string
  adress: string
  whatsapp: string
  city: string
  uf: UF
}

interface RegisterUseCaseResponse {
  user: Organization
}

export class RegisterUseCase {
  constructor(private usersRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    cep,
    adress,
    whatsapp,
    city,
    uf,
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
      cep,
      adress,
      whatsapp,
      city,
      uf,
    })

    return {
      user,
    }
  }
}
