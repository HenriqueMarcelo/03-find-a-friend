import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetOrganizationProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let usersRepository: InMemoryOrganizationRepository
let sut: GetOrganizationProfileUseCase // SUT - system under test

describe.skip('Get Organization Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryOrganizationRepository()
    sut = new GetOrganizationProfileUseCase(usersRepository) // SUT - system under test
  })

  it('should be able to get user profile', async () => {
    const createdOrganization = await usersRepository.create({
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
      userId: createdOrganization.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong ID', async () => {
    await expect(() =>
      sut.execute({
        userId: 'not-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
