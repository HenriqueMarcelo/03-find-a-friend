import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface SearchGymsRequest {
  query: string
  page: number
}

interface SearchGymsResponse {
  gyms: Gym[]
  page: number
}

export class SearchGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
      page,
    }
  }
}
