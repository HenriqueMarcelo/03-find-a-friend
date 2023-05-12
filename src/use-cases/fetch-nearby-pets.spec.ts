import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyPetnOrganizationCase } from './fetch-nearby-pets'

let petsRepository: InMemoryPetsRepository
let sut: FetchNearbyPetnOrganizationCase // SUT - system under test

describe.skip('Fetch Nearby Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchNearbyPetnOrganizationCase(petsRepository) // SUT - system under test
  })

  it('should be able to fetch nearby pets', async () => {
    await petsRepository.create({
      title: 'Near Pet',
      description: null,
      phone: null,
      latitude: -22.2498094,
      longitude: -42.4331477,
    })

    await petsRepository.create({
      title: 'Far Pet',
      description: null,
      phone: null,
      latitude: -22.1582797,
      longitude: -42.4221876,
    })

    const { pets } = await sut.execute({
      userLatitude: -22.2498094,
      userLongitude: -42.4331477,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ title: 'Near Pet' })])
  })
})
