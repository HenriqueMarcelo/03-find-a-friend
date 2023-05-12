import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CheckInUseCase(checkInsRepository, petsRepository)

  return useCase
}
