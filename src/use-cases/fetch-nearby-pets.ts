import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface FetchNearbyPetnRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyPetnResponse {
  pets: Pet[]
}

export class FetchNearbyPetnOrganizationCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyPetnRequest): Promise<FetchNearbyPetnResponse> {
    const pets = await this.petsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      pets,
    }
  }
}
