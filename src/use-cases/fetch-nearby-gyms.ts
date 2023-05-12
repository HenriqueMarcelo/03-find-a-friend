import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymnRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymnResponse {
  gyms: Gym[]
}

export class FetchNearbyGymnUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymnRequest): Promise<FetchNearbyGymnResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {
      gyms,
    }
  }
}
