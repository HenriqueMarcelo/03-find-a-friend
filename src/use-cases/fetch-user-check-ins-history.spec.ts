import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchOrganizationCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchOrganizationCheckInsHistoryUseCase // SUT - system under test

describe('Fetch Organization Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchOrganizationCheckInsHistoryUseCase(checkInsRepository) // SUT - system under test
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      pet_id: 'pet-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      pet_id: 'pet-02',
      user_id: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ pet_id: 'pet-01' }),
      expect.objectContaining({ pet_id: 'pet-02' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        pet_id: `pet-${i}`,
        user_id: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ pet_id: 'pet-21' }),
      expect.objectContaining({ pet_id: 'pet-22' }),
    ])
  })
})
