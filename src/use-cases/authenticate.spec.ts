import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

let usersRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase // SUT - system under test

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(usersRepository) // SUT - system under test
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      adress: 'Avenida Paulista',
      cep: '25555-320	',
      city: 'São Paulo',
      uf: 'SP',
      whatsapp: '22999887766',
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      adress: 'Avenida Paulista',
      cep: '25555-320	',
      city: 'São Paulo',
      uf: 'SP',
      whatsapp: '22999887766',
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
