import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetOrganizationProfileUseCase } from '../get-user-profile'

export function makeGetOrganizationProfileUseCase() {
  const userRepository = new PrismaOrganizationsRepository()
  const useCase = new GetOrganizationProfileUseCase(userRepository)

  return useCase
}
