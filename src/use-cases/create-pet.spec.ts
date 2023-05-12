import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create pet', async () => {
    const { pet } = await sut.execute({
      title: 'JavaScript Pet',
      description: null,
      phone: null,
      latitude: -22.2498094,
      longitude: -42.4331477,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
