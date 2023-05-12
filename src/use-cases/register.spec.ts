import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { OrganizationAlreadyExistsError } from './erros/user-already-exists-error'

let usersRepository: InMemoryOrganizationRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryOrganizationRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      adress: 'Avenida Paulista',
      cep: '25555-320	',
      city: 'São Paulo',
      uf: 'SP',
      whatsapp: '22999887766',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      adress: 'Avenida Paulista',
      cep: '25555-320	',
      city: 'São Paulo',
      uf: 'SP',
      whatsapp: '22999887766',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        adress: 'Avenida Paulista',
        cep: '25555-320	',
        city: 'São Paulo',
        uf: 'SP',
        whatsapp: '22999887766',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      adress: 'Avenida Paulista',
      cep: '25555-320	',
      city: 'São Paulo',
      uf: 'SP',
      whatsapp: '22999887766',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
