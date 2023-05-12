import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchPetsOrganizationCase } from './search-pets'

let petsRepository: InMemoryPetsRepository
let sut: SearchPetsOrganizationCase // SUT - system under test

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new SearchPetsOrganizationCase(petsRepository) // SUT - system under test
  })

  it('should be able to search for pets', async () => {
    await petsRepository.create({
      title: 'JavaScript Pet',
      description: null,
      phone: null,
      latitude: -22.2498094,
      longitude: -42.4331477,
    })

    await petsRepository.create({
      title: 'TypeScript Pet',
      description: null,
      phone: null,
      latitude: -22.2498094,
      longitude: -42.4331477,
    })

    const { pets } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ title: 'JavaScript Pet' })])
  })

  it('should be able to fetch paginated pets search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        title: `JavaScript Pet ${i}`,
        description: null,
        phone: null,
        latitude: -22.2498094,
        longitude: -42.4331477,
      })
    }

    const { pets } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ title: 'JavaScript Pet 21' }),
      expect.objectContaining({ title: 'JavaScript Pet 22' }),
    ])
  })
})
