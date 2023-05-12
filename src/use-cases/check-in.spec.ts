import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './erros/max-distance-error'
import { MaxNumberOfCheckInsError } from './erros/max-number-of-check-ins-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase // SUT - system under test

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository) // SUT - system under test

    await gymsRepository.create({
      id: 'gym-id',
      title: 'JavaScrpic Gym',
      description: '',
      latitude: -22.2498094,
      longitude: -42.4331477,
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.2498094,
      userLongitude: -42.4331477,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  /*
   * TDD
   * 1st - Red - Causa o erro
   * 2nd - Green - Faz funcionar
   * 3rd - Refactory
   */

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.2498094,
      userLongitude: -42.4331477,
    })

    vi.setSystemTime(new Date(2023, 0, 20, 9, 0, 0))

    await expect(() =>
      sut.execute({
        gymId: 'gym-id',
        userId: 'user-id',
        userLatitude: -22.2498094,
        userLongitude: -42.4331477,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in diferent days', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.2498094,
      userLongitude: -42.4331477,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 9, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-id',
      userId: 'user-id',
      userLatitude: -22.2498094,
      userLongitude: -42.4331477,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Far Away Gym',
      description: '',
      latitude: new Decimal(-22.3009593),
      longitude: new Decimal(-42.540436),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-id',
        userLatitude: -22.2498094,
        userLongitude: -42.4331477,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
