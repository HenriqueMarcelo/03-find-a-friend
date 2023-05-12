import { SearchPetsOrganizationCase } from '../search-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeSearchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchPetsOrganizationCase(petsRepository)

  return useCase
}
