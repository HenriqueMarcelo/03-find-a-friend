import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { getDistanceBetweenCoodinates } from '@/utils/get-distance-between-coodinates'
import { MaxDistanceError } from './erros/max-distance-error'
import { MaxNumberOfCheckInsError } from './erros/max-number-of-check-ins-error'

interface CheckInUseCaseRequest {
  userId: string
  petId: string
  userLatitude: number
  userLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    userId,
    petId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoodinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: pet.latitude.toNumber(),
        longitude: pet.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 metros

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDay =
      await this.checkInsRepository.findByOrganizationIdOnDate(
        userId,
        new Date(),
      )

    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      pet_id: petId,
    })

    return {
      checkIn,
    }
  }
}
