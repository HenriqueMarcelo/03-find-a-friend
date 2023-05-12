import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsRequest {
  query: string
  page: number
}

interface SearchPetsResponse {
  pets: Pet[]
  page: number
}

export class SearchPetsOrganizationCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.searchMany(query, page)

    return {
      pets,
      page,
    }
  }
}
