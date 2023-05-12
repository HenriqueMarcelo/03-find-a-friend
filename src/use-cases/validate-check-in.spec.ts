import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { LateCheckInValidationError } from './erros/late-check-in-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase // SUT - system under test

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository) // SUT - system under test

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: '02',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate a inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'inexistence-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validade the check-in after 20 minutes of its creating', async () => {
    vi.setSystemTime(new Date(2023, 4, 1, 13, 40))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: '01',
      user_id: '02',
    })

    const TWENTY_ONE_MINUTES_IN_MILISENCONDS = 1000 * 60 * 21

    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MILISENCONDS)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
