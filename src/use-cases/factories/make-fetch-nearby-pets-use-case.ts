import { FetchNearbyPetnOrganizationCase } from '../fetch-nearby-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchNearbyPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchNearbyPetnOrganizationCase(petsRepository)

  return useCase
}
