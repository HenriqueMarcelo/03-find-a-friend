import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetOrganizationMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetOrganizationMetricsUseCase // SUT - system under test

describe('Get Organization Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetOrganizationMetricsUseCase(checkInsRepository) // SUT - system under test
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      pet_id: 'pet-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      pet_id: 'pet-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
