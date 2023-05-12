import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { randomUUID } from 'crypto'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to create pet', async () => {
    const organization = {
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      adress: 'Avenida Paulista',
      cep: '25555-320	',
      city: 'São Paulo',
      uf: 'SP',
      whatsapp: '22999887766',
      created_at: new Date(),
    } as const

    organizationsRepository.items.push(organization)

    const { pet } = await sut.execute({
      name: 'José',
      description: 'José',
      energy: 1,
      birth: null,
      size: 1,
      organization_id: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
