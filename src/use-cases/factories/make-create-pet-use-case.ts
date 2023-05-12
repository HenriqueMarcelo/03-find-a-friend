import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreatePetUseCase } from '../create-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreatePetUseCase(petsRepository, organizationsRepository)

  return useCase
}
